import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industries } from '@/data/industries';

/**
 * Industries grid — masonry-feel layout with varied tile heights, relative
 * positional offsets and minimal-luxe hover (lift + glow + sheen).
 */
export default function LucenIndustries() {
  // 4 height tiers tile through the list to break the strict grid.
  const heights = ['min-h-[180px]', 'min-h-[230px]', 'min-h-[200px]', 'min-h-[260px]'];
  // Relative vertical offsets that read on sm+ — preserves stacking on mobile.
  const offsets = ['sm:top-0', 'sm:top-8', 'sm:top-4', 'sm:top-12', 'sm:top-2', 'sm:top-10'];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Coverage</p>
          <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
            Industries We Transform
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 items-start pb-16">
          {industries.map((ind, i) => {
            const h = heights[i % heights.length];
            const offset = offsets[i % offsets.length];
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.015 }}
                className={`relative ${offset}`}
              >
                <Link
                  to={`/industries/${ind.slug}`}
                  className={`relative glass-panel-elevated glow-edge p-6 group cursor-pointer block h-full ${h} flex flex-col justify-between overflow-hidden`}
                >
                  {/* sheen on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        'radial-gradient(120% 60% at 50% 0%, hsl(192 95% 60% / 0.18) 0%, transparent 60%)',
                    }}
                  />
                  <div className="relative">
                    <div className="text-3xl text-primary text-glow mb-4 group-hover:text-accent group-hover:text-glow-accent transition-all duration-500">
                      {ind.icon}
                    </div>
                    <h4 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {ind.name}
                    </h4>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {ind.value}
                    </p>
                  </div>
                  {ind.metrics?.[0] && (
                    <div className="relative pt-4 mt-4 border-t border-border/30">
                      <p className="font-display text-2xl font-semibold text-primary text-glow">
                        {ind.metrics[0].value}
                      </p>
                      <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
                        {ind.metrics[0].label}
                      </p>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
