/**
 * Cloud media CDN utilities.
 * All media served from Lovable Cloud storage with edge caching.
 */

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;
const FUNCTION_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/optimize-image`;

/** Detect WebP/AVIF support once */
let _supportsWebp: boolean | null = null;
let _supportsAvif: boolean | null = null;

function detectWebpSync(): boolean {
  if (_supportsWebp !== null) return _supportsWebp;
  // Assume modern browsers support WebP - check via canvas
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    _supportsWebp = canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    _supportsWebp = false;
  }
  return _supportsWebp;
}

function detectAvifSync(): boolean {
  if (_supportsAvif !== null) return _supportsAvif;
  // AVIF detection is async; default to false for sync usage
  _supportsAvif = false;
  // Async probe
  const img = new Image();
  img.onload = () => { _supportsAvif = img.width === 1; };
  img.onerror = () => { _supportsAvif = false; };
  img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAChoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEVAAEAAAAeAAAAKGlpbmYAAAAAAAEAAAAaaW5mZQIAAAAAAQAAYXYwMUNvbG9yAAAAAGppcHJwAAAAS2lwY28AAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwaXhpAAAAAAMICAgAAAAMYXYxQ4EAHAAAAAAUaXBtYQAAAAAAAAABAAEEAQKDBAAAAB1tZGF0EgAKBzgADlAgIGkyCR/wAABAAACkA';
  return _supportsAvif;
}

/** Best image format for this browser */
export function bestImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (detectAvifSync()) return 'avif';
  if (detectWebpSync()) return 'webp';
  return 'jpeg';
}

/**
 * Get a CDN URL for a media file in cloud storage.
 */
export function cdnUrl(path: string): string {
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  return `${STORAGE_BASE}/${clean}`;
}

/**
 * Get an optimized image URL via the edge function.
 * Supports on-the-fly resize and format conversion.
 * Auto-detects best format if not specified.
 */
export function optimizedImageUrl(
  path: string,
  options?: { width?: number; quality?: number; format?: 'webp' | 'avif' | 'jpeg' | 'png' }
): string {
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  const params = new URLSearchParams({ src: clean });
  if (options?.width) params.set('w', String(options.width));
  params.set('q', String(options?.quality ?? 80));
  params.set('f', options?.format ?? bestImageFormat());
  return `${FUNCTION_BASE}?${params.toString()}`;
}

/** Check if a path is an image (not video) */
export function isImagePath(path: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|bmp)$/i.test(path);
}

/**
 * Convert a local /media/ path to the best CDN URL.
 * Images → edge function with auto-format. Videos → direct CDN.
 */
export function mediaUrl(path: string, options?: { width?: number; quality?: number }): string {
  if (isImagePath(path)) {
    return optimizedImageUrl(path, options);
  }
  return cdnUrl(path);
}
