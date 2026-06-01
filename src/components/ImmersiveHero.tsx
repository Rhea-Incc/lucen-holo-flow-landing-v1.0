import { motion } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

interface ImmersiveHeroProps {
  /** Primary media path (video preferred) */
  src: string;
  type?: 'video' | 'image';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional secondary fragment shown on the right edge for depth */
  accent?: string;
  accentType?: 'video' | 'image';
}

/**
 * Full-viewport-width, full-height hero that bleeds the media edge-to-edge and
 * fades seamlessly into the next text section. Uses the primary src as a true
 * background plate (object-cover) and overlays the headline at the bottom.
 */
export default function ImmersiveHero({
  src,
  type,
  eyebrow,
  title,
  subtitle,
  accent,
  accentType,
}: ImmersiveHeroProps) {
  const resolvedType = type ?? (src.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image');
  const resolvedAccentType = accent
    ? accentType ?? (accent.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image')
    : undefined;

  return (
    <section className="relative w-full h-[88vh] min-h-[540px] max-h-[900px] overflow-hidden -mt-[1px]">
      {/* Background media — full bleed */}
      <div className="absolute inset-0">
        {resolvedType === 'video' ? (
          <OptimizedVideo src={src} priority className="w-full h-full object-cover" />
        ) : (
          <OptimizedImage src={src} alt={title} priority className="absolute inset-0 w-full h-full" />
        )}
      </div>

      {/* Optional accent — right-side companion fragment */}
      {accent && (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[34%] mix-blend-screen opacity-70 pointer-events-none">
          {resolvedAccentType === 'video' ? (
            <OptimizedVideo src={accent} className="w-full h-full object-cover" />
          ) : (
            <OptimizedImage src={accent} alt="" className="absolute inset-0 w-full h-full" />
          )}
        </div>
      )}

      {/* Seamless gradient blend into the content below */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />

      {/* Headline */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="max-w-7xl mx-auto px-6 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow && (
              <p className="text-xs sm:text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground font-body text-base sm:text-lg lg:text-xl mt-5 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
