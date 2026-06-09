import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import LucenHeader from '@/components/LucenHeader';
import LucenFooter from '@/components/LucenFooter';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import Seo from '@/components/Seo';
import { industries } from '@/data/industries';
import { OptimizedImage } from '@/components/OptimizedMedia';

/**
 * Industries index — editorial, varied-size tiles with eyebrow, description,
 * metrics, deployment chips and an Explore CTA. Layout breaks the rigid grid
 * with sm:col-span variations and vertical offsets for a curated feel.
 */
export default function IndustriesIndex() {
  // Size pattern: hero, half, half, third, third, third — cycle through.
  const spanPattern = [
    'lg:col-span-8 lg:row-span-2', // wide hero
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4 lg:row-span-2', // tall
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-6',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-12', // panoramic
  ];

  const aspectPattern = [
    'aspect-[16/10]', 'aspect-[4/3]', 'aspect-[4/3]',
    'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/3]',
    'aspect-[16/9]', 'aspect-[16/9]', 'aspect-[4/3]',
    'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[21/9]',
  ];

  return (
    <div className="relative min-h-screen">
      <Seo
        title="Industries — Lucen Holographic Deployments"
        description="Retail, real estate, automotive, banking, healthcare, airports, events — see how Lucen transforms every industry with holographic media."
        path="/industries"
      />
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Editorial hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20"
          >
            <div className="md:col-span-7">
              <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Coverage</p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.02]">
                Industries we<br />
                <span className="lucen-gradient-text">transform with light.</span>
              </h1>
            </div>
            <div className="md:col-span-5 space-y-4">
              <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
                Lucen deploys holographic infrastructure across {industries.length} sectors — from luxury retail and real estate to airports, healthcare and live events. Every install ships with the Lucen Engine: attention, dwell and conversion telemetry by default.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Plug-and-play hardware', 'Content production', 'Live analytics', '24/7 ops'].map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full glass-panel text-[11px] uppercase tracking-wider text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Varied bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
            {industries.map((ind, i) => {
              const span = spanPattern[i % spanPattern.length];
              const aspect = aspectPattern[i % aspectPattern.length];
              const offset = i % 3 === 1 ? 'lg:mt-8' : i % 3 === 2 ? 'lg:mt-4' : '';
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className={`${span} ${offset}`}
                >
                  <article className="group relative glass-panel-elevated glow-edge overflow-hidden h-full flex flex-col">
                    {/* Media */}
                    <div className={`relative ${aspect} overflow-hidden`}>
                      <OptimizedImage
                        src={ind.heroImage}
                        alt={ind.name}
                        className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      {ind.metrics?.[0] && (
                        <div className="absolute top-4 right-4 glass-panel px-3 py-2 text-right">
                          <p className="font-display text-lg font-semibold text-primary leading-none">{ind.metrics[0].value}</p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{ind.metrics[0].label}</p>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="relative p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl text-primary text-glow">{ind.icon}</span>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{ind.value}</p>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                        {ind.name}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5 line-clamp-4">
                        {ind.description}
                      </p>

                      {ind.deployments && ind.deployments.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {ind.deployments.slice(0, 4).map((d) => (
                            <span key={d} className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/15 text-[10px] uppercase tracking-wider text-muted-foreground">{d}</span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/industries/${ind.slug}`}
                        className="mt-auto inline-flex items-center justify-between gap-2 glass-panel-elevated px-4 py-3 rounded-md font-display text-xs tracking-[0.2em] uppercase text-primary hover:text-foreground hover:glow-edge transition-all duration-300"
                      >
                        <span>Explore {ind.name}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom info band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { k: '12+', l: 'Sectors deployed' },
              { k: '4–6 wks', l: 'Pilot to live install' },
              { k: 'Global', l: 'Hardware + ops coverage' },
            ].map((m) => (
              <div key={m.l} className="glass-panel-elevated p-8 text-center">
                <p className="font-display text-4xl font-semibold text-primary text-glow mb-2">{m.k}</p>
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">{m.l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground font-body text-sm max-w-2xl mx-auto mb-6">
              Don't see your sector? Lucen tailors holographic deployments for any high-attention environment.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 glass-panel-elevated glow-edge px-8 py-4 font-display text-sm tracking-wide text-primary hover:text-foreground transition-colors"
            >
              Talk to a specialist <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      <LucenFooter />
    </div>
  );
}
