import { useState, useRef, useEffect } from 'react';
import { cdnUrl, optimizedImageUrl, isImagePath } from '@/lib/media';

/** Resolve a media path: if it starts with /media/, use CDN; otherwise pass through */
function resolveUrl(src: string): string {
  if (src.startsWith('/media/')) return cdnUrl(src);
  return src;
}

/** Resolve an image path with WebP/AVIF auto-detection via edge function */
function resolveImageUrl(src: string, width?: number): string {
  if (src.startsWith('/media/') && isImagePath(src)) {
    return optimizedImageUrl(src, { width, quality: 80 });
  }
  if (src.startsWith('/media/')) return cdnUrl(src);
  return src;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  width?: number;
}

export function OptimizedImage({ src, alt, className = '', style, priority = false, width }: OptimizedImageProps) {
  const resolvedSrc = resolveImageUrl(src, width);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resolvedSrc;
      document.head.appendChild(link);
      return () => { document.head.removeChild(link); };
    }
  }, [resolvedSrc, priority]);

  return (
    <div ref={containerRef} className={`${className}`} style={style}>
      {inView && (
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}

interface OptimizedVideoProps {
  src: string;
  sources?: Array<{ src: string; media?: string; type?: string }>;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  poster?: string;
}

export function OptimizedVideo({ src, sources, className = '', style, priority = false, loop = true, onEnded, poster }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = resolveUrl(src);
  const resolvedSources = sources?.map(s => ({ ...s, src: resolveUrl(s.src) }));
  const resolvedPoster = poster ? resolveUrl(poster) : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.preload = 'auto';
      video.load();
      video.play().catch(() => {});
    };

    if (priority) {
      video.preload = 'auto';
      playVideo();
    } else {
      video.preload = 'none';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
            observer.disconnect();
          }
        },
        { rootMargin: '800px' }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [priority, resolvedSrc]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={loop}
      playsInline
      poster={resolvedPoster}
      preload={priority ? 'auto' : 'none'}
      onCanPlay={() => setLoaded(true)}
      onEnded={onEnded}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      {resolvedSources?.length
        ? resolvedSources.map((source) => (
            <source key={`${source.src}-${source.media ?? 'all'}`} src={source.src} media={source.media} type={source.type ?? 'video/mp4'} />
          ))
        : <source src={resolvedSrc} type="video/mp4" />}
    </video>
  );
}
