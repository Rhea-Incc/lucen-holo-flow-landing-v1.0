import { useEffect, useState } from 'react';

export type MotionPreset = {
  /** True when motion should be skipped entirely (prefers-reduced-motion). */
  reduced: boolean;
  /** True when device looks small or low-power and effects should be simplified. */
  lite: boolean;
  /** Convenience: animation duration multiplier (0 disables animation). */
  durationScale: number;
};

function detect(): MotionPreset {
  if (typeof window === 'undefined') {
    return { reduced: false, lite: false, durationScale: 1 };
  }
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const small = window.innerWidth < 768;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const slowNet = !!conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ''));
  const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMem = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
  const lite = reduced || small || slowNet || (lowCpu && lowMem);
  return {
    reduced,
    lite,
    durationScale: reduced ? 0 : lite ? 0.6 : 1,
  };
}

export function useMotionPreset(): MotionPreset {
  const [preset, setPreset] = useState<MotionPreset>(() => detect());

  useEffect(() => {
    const update = () => setPreset(detect());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener?.('change', update);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      mq.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return preset;
}

/**
 * Build framer-motion props that automatically degrade to identity transforms
 * when reduced motion is requested or the device is low-power.
 */
export function motionFor(
  preset: MotionPreset,
  opts: {
    y?: number;
    x?: number;
    scale?: number;
    blur?: number;
    duration?: number;
    delay?: number;
    once?: boolean;
  } = {},
) {
  const { y = 0, x = 0, scale, blur, duration = 0.6, delay = 0, once = true } = opts;
  if (preset.reduced) {
    // Render at final state with no transition.
    return {
      initial: false as const,
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  const useBlur = !!blur && !preset.lite;
  const initial: Record<string, number | string> = { opacity: 0 };
  if (y) initial.y = preset.lite ? Math.min(y, 16) : y;
  if (x) initial.x = preset.lite ? Math.min(x, 16) : x;
  if (scale && scale !== 1) initial.scale = scale;
  if (useBlur) initial.filter = `blur(${blur}px)`;
  const animate: Record<string, number | string> = { opacity: 1, y: 0, x: 0 };
  if (scale && scale !== 1) animate.scale = 1;
  if (useBlur) animate.filter = 'blur(0px)';
  return {
    initial,
    whileInView: animate,
    viewport: { once, margin: '-60px' },
    transition: {
      duration: duration * preset.durationScale,
      delay: delay * preset.durationScale,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  };
}
