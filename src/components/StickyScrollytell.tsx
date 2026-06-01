import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

export interface ScrollPanel {
  /** Background media for this panel (sticky behind the text) */
  media: string;
  mediaType?: 'video' | 'image';
  eyebrow?: string;
  heading: string;
  body: string;
}

interface StickyScrollytellProps {
  panels: ScrollPanel[];
  /** Optional intro label above the whole scrollytell sequence */
  label?: string;
}

function resolveType(panel: ScrollPanel) {
  return panel.mediaType ?? (panel.media.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image');
}

/**
 * Sticky-layered scrollytelling: each panel pins its media to the viewport
 * while text scrolls past, then cross-fades to the next panel's media.
 */
export default function StickyScrollytell({ panels, label }: StickyScrollytellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each panel's media is visible during its own slice of total scroll
  const segment = 1 / panels.length;

  return (
    <section ref={containerRef} className="relative w-full" style={{ minHeight: `${panels.length * 100}vh` }}>
      {/* Sticky media stack */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {panels.map((p, i) => {
          const start = i * segment;
          const mid = start + segment * 0.5;
          const end = start + segment;
          // Fade in across the first half of the panel, fade out across the next panel's intro
          const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, start - segment * 0.15), start + segment * 0.15, end - segment * 0.05, end + segment * 0.1],
            [0, 1, 1, 0],
          );
          const scale = useTransform(scrollYProgress, [start, mid, end], [1.08, 1.02, 1.12]);
          const type = resolveType(p);
          return (
            <motion.div
              key={`${p.media}-${i}`}
              style={{ opacity, scale }}
              className="absolute inset-0"
            >
              {type === 'video' ? (
                <OptimizedVideo src={p.media} priority={i === 0} className="w-full h-full object-cover" />
              ) : (
                <OptimizedImage src={p.media} alt={p.heading} priority={i === 0} className="absolute inset-0 w-full h-full" />
              )}
            </motion.div>
          );
        })}
        {/* Cinematic vignettes / depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40 pointer-events-none" />
      </div>

      {/* Scrolling text panels stacked over the sticky media */}
      <div className="absolute inset-0 w-full pointer-events-none">
        {label && (
          <div className="max-w-7xl mx-auto px-6 pt-10">
            <p className="text-xs font-display tracking-[0.35em] uppercase text-primary pointer-events-auto">{label}</p>
          </div>
        )}
        {panels.map((p, i) => (
          <div
            key={`text-${i}`}
            className="h-screen w-full flex items-center"
          >
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`md:col-span-6 ${i % 2 === 1 ? 'md:col-start-7' : ''} glass-panel-elevated glow-edge p-6 sm:p-10 pointer-events-auto`}
              >
                {p.eyebrow && (
                  <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-3">{p.eyebrow}</p>
                )}
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {p.heading}
                </h3>
                <p className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed">{p.body}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
