import { motion } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

interface ImmersiveHeroProps {
  src: string;
  type?: 'video' | 'image';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
  accentType?: 'video' | 'image';
}

/**
 * Full-viewport hero. Media renders CONTAINED (no crop) over a soft blurred
 * backdrop made from the same media, so portrait and landscape both fit fully
 * without being zoomed or stretched.
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
      {/* Blurred backdrop — fills frame without distorting the visible image */}
      <div className="absolute inset-0 scale-110 blur-2xl opacity-60">
        {resolvedType === 'video' ? (
          <OptimizedVideo src={src} priority className="w-full h-full object-cover" />
        ) : (
          <OptimizedImage src={src} alt="" priority className="absolute inset-0 w-full h-full" />
        )}
      </div>

      {/* Foreground — fully contained, never cropped or upscaled */}
      <div className="absolute inset-0 flex items-center justify-center">
        {resolvedType === 'video' ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={src.startsWith('/media/') ? `https://qiuagqujrqlzkuxqfink.supabase.co/storage/v1/object/public/media${src.replace('/media', '')}` : src}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        ) : (
          <OptimizedImage src={src} alt={title} priority fit="contain" className="w-full h-full" />
        )}
      </div>

      {accent && (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[28%] mix-blend-screen opacity-50 pointer-events-none">
          {resolvedAccentType === 'video' ? (
            <OptimizedVideo src={accent} className="w-full h-full object-contain" />
          ) : (
            <OptimizedImage src={accent} alt="" fit="contain" className="absolute inset-0 w-full h-full" />
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />

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
