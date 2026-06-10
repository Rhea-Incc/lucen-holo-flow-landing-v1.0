import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

export interface ScrollPanel {
  /** Background media for this panel (sticky behind the text) */
  media: string;
  mediaType?: 'video' | 'image';
  /** Orientation hint. Portrait media uses a vertical half-frame with text beside. */
  orientation?: 'landscape' | 'portrait' | 'square';
  /** Intrinsic media width — used for crisp sizing + no-upscale guard */
  mediaWidth?: number;
  mediaHeight?: number;
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

function StickyLayer({
  panel,
  index,
  total,
  progress,
}: {
  panel: ScrollPanel;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  // Wider, softer cross-fade overlap for a deliberate, cinematic flow
  const overlap = segment * 0.55;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - overlap), start + segment * 0.25, end - segment * 0.05, Math.min(1, end + overlap)],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, start - overlap), start + segment * 0.5, Math.min(1, end + overlap)],
    [1.08, 1.0, 0.97],
  );
  const yPan = useTransform(
    progress,
    [Math.max(0, start - overlap), Math.min(1, end + overlap)],
    ['2%', '-2%'],
  );
  const type = resolveType(panel);
  const isPortrait = panel.orientation === 'portrait';
  // Alternate side: even index → media right, text left; odd → media left, text right
  const mediaSide = index % 2 === 0 ? 'right' : 'left';

  // Portrait: half-width vertical frame anchored to one side
  const frameClass = isPortrait
    ? `absolute top-0 bottom-0 ${mediaSide === 'right' ? 'right-0 left-auto' : 'left-0 right-auto'} w-full sm:w-[55%] lg:w-[42%] xl:w-[38%]`
    : 'absolute inset-0';

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* Blurred backdrop fills the entire viewport behind for depth */}
      <div className="absolute inset-0 scale-110 blur-2xl opacity-50">
        {type === 'video' ? (
          <OptimizedVideo src={panel.media} priority={index === 0} className="w-full h-full object-cover" />
        ) : (
          <OptimizedImage src={panel.media} alt="" priority={index === 0} className="absolute inset-0 w-full h-full" />
        )}
      </div>
      {/* Contained foreground — anchored frame, never cropped */}
      <div className={`${frameClass} flex items-center justify-center p-4 sm:p-6`}>
        {type === 'video' ? (
          <OptimizedVideo
            src={panel.media}
            priority={index === 0}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={panel.mediaWidth ? { maxWidth: `${panel.mediaWidth}px`, maxHeight: panel.mediaHeight ? `${panel.mediaHeight}px` : undefined } : undefined}
          />
        ) : (
          <OptimizedImage
            src={panel.media}
            alt={panel.heading}
            priority={index === 0}
            fit="contain"
            width={panel.mediaWidth}
            height={panel.mediaHeight}
            noUpscale
            className="w-full h-full"
          />
        )}
      </div>
    </motion.div>
  );
}

/**
 * Sticky-layered scrollytelling: each panel pins its media to the viewport
 * while text scrolls past, then cross-fades to the next panel's media.
 *
 * Portrait media use a half-frame anchored to one side, with text on the other —
 * alternating per panel — so vertical media never sits awkwardly inside a
 * landscape viewport.
 */
export default function StickyScrollytell({ panels, label }: StickyScrollytellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative w-full" style={{ minHeight: `${panels.length * 100}vh` }}>
      {/* Sticky media stack */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {panels.map((p, i) => (
          <StickyLayer
            key={`${p.media}-${i}`}
            panel={p}
            index={i}
            total={panels.length}
            progress={scrollYProgress}
          />
        ))}
        {/* Cinematic vignettes / depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40 pointer-events-none" />
      </div>

      {/* Scrolling text panels stacked over the sticky media.
          Text aligns OPPOSITE the media for portrait panels. */}
      <div className="absolute inset-0 w-full pointer-events-none">
        {label && (
          <div className="max-w-7xl mx-auto px-6 pt-10">
            <p className="text-xs font-display tracking-[0.35em] uppercase text-primary pointer-events-auto">{label}</p>
          </div>
        )}
        {panels.map((p, i) => {
          const isPortrait = p.orientation === 'portrait';
          // For portrait, place text opposite to the media side (media right on even → text left)
          const textSide = isPortrait
            ? (i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-7')
            : (i % 2 === 1 ? 'md:col-start-7' : '');
          return (
            <div key={`text-${i}`} className="h-screen w-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`md:col-span-6 ${textSide} glass-panel-elevated glow-edge p-6 sm:p-10 pointer-events-auto`}
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
          );
        })}
      </div>
    </section>
  );
}
