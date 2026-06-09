import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import LucenWordmark from '@/components/LucenWordmark';
import { industries } from '@/data/industries';
import { useCases } from '@/data/usecases';

const SUPPORT_EMAIL = 'holograms@lucene.co';

/**
 * Global site footer — included on every route.
 * Minimal-luxe: layered grid, sitemap columns, contact lines, legal row.
 */
export default function LucenFooter() {
  const year = new Date().getFullYear();
  const topIndustries = industries.slice(0, 6);
  const topUseCases = useCases.slice(0, 6);

  return (
    <footer className="relative mt-24 border-t border-border/30 bg-background/40 backdrop-blur-xl">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, hsl(192 95% 60% / 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/favicon.png" alt="" width={36} height={36} className="w-9 h-9" />
              <LucenWordmark className="text-2xl" />
            </Link>
            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm">
              Lucen is the infrastructure layer for holographic media — turning physical spaces into measurable attention networks.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> {SUPPORT_EMAIL}
              </a>
              <a href="tel:+254727750097" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +254 727 750 097
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> Nairobi · Dubai · Global
              </p>
            </div>
          </div>

          {/* Industries */}
          <div className="md:col-span-3">
            <p className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Industries</p>
            <ul className="space-y-2.5">
              {topIndustries.map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries/${i.slug}`} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {i.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/industries" className="text-primary hover:text-foreground transition-colors text-sm font-medium">
                  All industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="md:col-span-3">
            <p className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Use Cases</p>
            <ul className="space-y-2.5">
              {topUseCases.map((u) => (
                <li key={u.slug}>
                  <Link to={`/use-cases/${u.slug}`} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">About</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Services</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</Link></li>
              <li><Link to="/get-started" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Get Started</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">© {year} Lucen. Holographic infrastructure for the physical world.</p>
          <p className="text-muted-foreground text-xs font-display tracking-wide">
            Built with light · Nairobi → Global
          </p>
        </div>
      </div>
    </footer>
  );
}
