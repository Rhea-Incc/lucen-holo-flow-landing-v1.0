import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Zap, Users, Database, Gauge } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import HolographicCanvas from './HolographicCanvas';

interface Stats {
  pageViews24h: number;
  conversions24h: number;
  ctaClicks24h: number;
  uniqueSessions24h: number;
  newSubmissions24h: number;
  topPaths: { path: string; count: number }[];
}

export default function TelemetryPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [vitals, setVitals] = useState<{ lcp?: number; fcp?: number; cls?: number; inp?: number }>({});
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const load = async () => {
      const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const [evts, subs] = await Promise.all([
        supabase.from('engine_events').select('event_type, path, session_id').gte('created_at', since),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).gte('created_at', since),
      ]);
      const rows = evts.data ?? [];
      const pathCount = new Map<string, number>();
      const sessions = new Set<string>();
      let pv = 0, cv = 0, cc = 0;
      for (const r of rows) {
        const p = r.path ?? '/';
        pathCount.set(p, (pathCount.get(p) ?? 0) + 1);
        if (r.session_id) sessions.add(r.session_id);
        if (r.event_type === 'page_view') pv++;
        if (r.event_type === 'conversion') cv++;
        if (r.event_type === 'cta_click') cc++;
      }
      const topPaths = [...pathCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([path, count]) => ({ path, count }));
      setStats({
        pageViews24h: pv,
        conversions24h: cv,
        ctaClicks24h: cc,
        uniqueSessions24h: sessions.size,
        newSubmissions24h: subs.count ?? 0,
        topPaths,
      });
    };
    load();
    const id = setInterval(load, 15_000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => { clearInterval(id); clearInterval(tick); };
  }, []);

  useEffect(() => {
    // Best-effort Web Vitals via PerformanceObserver
    try {
      const po1 = new PerformanceObserver((list) => {
        for (const e of list.getEntries() as PerformanceEntry[]) {
          if (e.entryType === 'largest-contentful-paint') setVitals((v) => ({ ...v, lcp: (e as any).renderTime || e.startTime }));
          if (e.entryType === 'paint' && e.name === 'first-contentful-paint') setVitals((v) => ({ ...v, fcp: e.startTime }));
          if (e.entryType === 'layout-shift') setVitals((v) => ({ ...v, cls: (v.cls ?? 0) + (e as any).value }));
          if (e.entryType === 'event') setVitals((v) => ({ ...v, inp: Math.max(v.inp ?? 0, (e as any).duration) }));
        }
      });
      po1.observe({ entryTypes: ['largest-contentful-paint', 'paint', 'layout-shift', 'event'] as any });
      return () => po1.disconnect();
    } catch { /* noop */ }
  }, []);

  const tiles = [
    { icon: Users, label: 'Unique sessions · 24h', value: stats?.uniqueSessions24h ?? '—' },
    { icon: Activity, label: 'Page views · 24h', value: stats?.pageViews24h ?? '—' },
    { icon: Zap, label: 'CTA clicks · 24h', value: stats?.ctaClicks24h ?? '—' },
    { icon: Gauge, label: 'Conversions · 24h', value: stats?.conversions24h ?? '—' },
    { icon: Database, label: 'New submissions · 24h', value: stats?.newSubmissions24h ?? '—' },
  ];

  return (
    <div className="space-y-6">
      {/* Holo banner */}
      <div className="relative h-44 rounded-lg overflow-hidden border border-primary/20">
        <HolographicCanvas density={180} hue={195} intensity={0.9} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary">Lucen Engine</p>
            <p className="font-display text-2xl text-foreground">Live site telemetry</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Last sync</p>
            <p className="font-display text-foreground tabular-nums">{new Date(now).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tiles.map((t) => (
          <Card key={t.label} className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </div>
            <p className="font-display text-2xl font-semibold tabular-nums">{typeof t.value === 'number' ? t.value.toLocaleString() : t.value}</p>
          </Card>
        ))}
      </div>

      {/* Web vitals */}
      <Card className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Speed · this session</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { l: 'LCP', v: vitals.lcp ? `${(vitals.lcp / 1000).toFixed(2)}s` : '—' },
            { l: 'FCP', v: vitals.fcp ? `${(vitals.fcp / 1000).toFixed(2)}s` : '—' },
            { l: 'CLS', v: vitals.cls != null ? vitals.cls.toFixed(3) : '—' },
            { l: 'INP', v: vitals.inp ? `${Math.round(vitals.inp)}ms` : '—' },
          ].map((m) => (
            <div key={m.l}>
              <p className="text-muted-foreground text-xs">{m.l}</p>
              <p className="font-display text-xl tabular-nums">{m.v}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top paths */}
      <Card className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Top paths · 24h</p>
        <div className="space-y-2">
          {(stats?.topPaths ?? []).map((p) => {
            const max = stats!.topPaths[0]?.count || 1;
            return (
              <div key={p.path} className="flex items-center gap-3 text-sm">
                <span className="w-48 truncate font-mono text-xs text-muted-foreground">{p.path}</span>
                <div className="flex-1 h-1.5 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(p.count / max) * 100}%` }} />
                </div>
                <span className="w-12 text-right tabular-nums text-xs">{p.count}</span>
              </div>
            );
          })}
          {(!stats || stats.topPaths.length === 0) && (
            <p className="text-muted-foreground text-sm">No events captured yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
