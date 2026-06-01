import { motion } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

interface MediaItem {
  src: string;
  type?: 'video' | 'image';
  caption?: string;
}

interface StaggeredMediaGridProps {
  items: MediaItem[];
  /** Optional eyebrow / heading shown above the grid */
  eyebrow?: string;
  heading?: string;
  /** Full-bleed (no max-width wrap) or constrained inside the content column */
  fullBleed?: boolean;
}

// Tile heights cycle for the staggered visual rhythm — taller, shorter, mid, very tall
const HEIGHT_CYCLE = [
  'h-[260px] sm:h-[320px] md:h-[440px]',
  'h-[220px] sm:h-[260px] md:h-[340px]',
  'h-[300px] sm:h-[380px] md:h-[520px]',
  'h-[200px] sm:h-[240px] md:h-[300px]',
  'h-[280px] sm:h-[340px] md:h-[460px]',
  'h-[240px] sm:h-[300px] md:h-[400px]',
];

const OFFSET_CYCLE = ['md:translate-y-0', 'md:translate-y-10', 'md:translate-y-4', 'md:translate-y-16', 'md:translate-y-6', 'md:translate-y-12'];

function resolveType(item: MediaItem): 'video' | 'image' {
  if (item.type) return item.type;
  return item.src.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image';
}

export default function StaggeredMediaGrid({
  items,
  eyebrow,
  heading,
  fullBleed = true,
}: StaggeredMediaGridProps) {
  if (!items.length) return null;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    fullBleed ? (
      <div className="w-full px-4 sm:px-6 lg:px-10">{children}</div>
    ) : (
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    );

  return (
    <section className="relative py-16 sm:py-24">
      <Wrapper>
        {(eyebrow || heading) && (
          <div className="max-w-4xl mb-10 sm:mb-14">
            {eyebrow && (
              <p className="text-xs sm:text-sm font-display tracking-[0.3em] uppercase text-primary mb-3">{eyebrow}</p>
            )}
            {heading && (
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{heading}</h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {items.map((item, i) => {
            const type = resolveType(item);
            const isLastOdd = i === items.length - 1 && items.length % 2 === 1;
            return (
              <motion.div
                key={`${item.src}-${i}`}
                initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-xl glass-panel-elevated glow-edge group ${HEIGHT_CYCLE[i % HEIGHT_CYCLE.length]} ${OFFSET_CYCLE[i % OFFSET_CYCLE.length]} ${
                  isLastOdd ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                {type === 'video' ? (
                  <OptimizedVideo
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  />
                ) : (
                  <OptimizedImage
                    src={item.src}
                    alt={item.caption ?? ''}
                    className="absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs font-display tracking-[0.2em] uppercase text-foreground/90">{item.caption}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Wrapper>
    </section>
  );
}
