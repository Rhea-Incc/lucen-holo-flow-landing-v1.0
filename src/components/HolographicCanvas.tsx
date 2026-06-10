import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  density?: number;
  hue?: number;
  intensity?: number;
}

/**
 * Ultra-smooth holographic interface — moving light points that form
 * shifting holographic ring/grid illusions. Pure 2D canvas (no WebGL),
 * DPR-aware, prefers-reduced-motion friendly.
 */
export default function HolographicCanvas({
  className = '',
  density = 220,
  hue = 195,
  intensity = 1,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mx = 0, my = 0, tmx = 0, tmy = 0;

    type P = { a: number; r: number; o: number; s: number; z: number; phase: number };
    const points: P[] = Array.from({ length: density }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.25 + Math.random() * 0.75,
      o: Math.random() * Math.PI * 2,
      s: 0.4 + Math.random() * 1.6,
      z: 0.4 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    canvas.addEventListener('pointermove', onMove);

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      // Trailing fade for motion smear
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(4, 8, 16, 0.18)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      const cx = w / 2 + mx * 24;
      const cy = h / 2 + my * 24;
      const base = Math.min(w, h);

      // Concentric holographic rings
      for (let i = 0; i < 4; i++) {
        const radius = base * (0.15 + i * 0.11) + Math.sin(t * 0.6 + i) * 6;
        const alpha = (0.06 + 0.05 * (4 - i)) * intensity;
        ctx.strokeStyle = `hsla(${hue + i * 6}, 95%, 65%, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbiting / pulsing points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!reduced) p.a += 0.0015 * p.z + Math.sin(t * 0.4 + p.phase) * 0.0008;
        const wobble = Math.sin(t * 1.2 + p.o) * 0.08;
        const r = base * (0.18 + p.r * 0.35 + wobble);
        const x = cx + Math.cos(p.a) * r;
        const y = cy + Math.sin(p.a) * r * 0.62; // perspective squash → 3D feel
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        const size = p.s * (0.6 + pulse * 0.9) * p.z;
        const alpha = (0.35 + pulse * 0.55) * intensity * p.z;
        const g = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
        g.addColorStop(0, `hsla(${hue + p.r * 30}, 100%, 75%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${hue + 20}, 100%, 65%, ${alpha * 0.4})`);
        g.addColorStop(1, 'hsla(200, 100%, 50%, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scanline sweep
      const sweepY = ((t * 60) % (h + 200)) - 100;
      const sg = ctx.createLinearGradient(0, sweepY - 80, 0, sweepY + 80);
      sg.addColorStop(0, 'hsla(195, 100%, 60%, 0)');
      sg.addColorStop(0.5, `hsla(195, 100%, 70%, ${0.05 * intensity})`);
      sg.addColorStop(1, 'hsla(195, 100%, 60%, 0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, sweepY - 80, w, 160);

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
    };
  }, [density, hue, intensity]);

  return (
    <canvas
      ref={ref}
      className={`w-full h-full block ${className}`}
      style={{ display: 'block' }}
      aria-hidden
    />
  );
}
