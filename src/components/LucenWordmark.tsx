/**
 * Lucen wordmark — custom geometric monoline rendering of "LUCEN" inspired by
 * the Aureon mark. The "E" is intentionally missing its vertical anchor
 * (left stem) — only three horizontals remain.
 *
 * Renders inline SVG so it stays crisp at every scale and inherits text color
 * via `currentColor`.
 */

interface Props {
  className?: string;
  /** Stroke width relative to the 32-unit letter height. */
  strokeWidth?: number;
  title?: string;
}

export default function LucenWordmark({
  className = '',
  strokeWidth = 2.4,
  title = 'Lucen',
}: Props) {
  // Letter spacing baseline. Each letter cell is 22 wide with 10 gap.
  const G = 32; // gap between letters
  // Letter origins
  const xL = 0;
  const xU = xL + 22 + G;
  const xC = xU + 22 + G;
  const xE = xC + 22 + G;
  const xN = xE + 22 + G;
  const W = xN + 22;

  return (
    <svg
      viewBox={`-2 -2 ${W + 4} 36`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
    >
      <title>{title}</title>

      {/* L */}
      <g transform={`translate(${xL},0)`}>
        <line x1="0" y1="0" x2="0" y2="32" />
        <line x1="0" y1="32" x2="22" y2="32" />
      </g>

      {/* U */}
      <g transform={`translate(${xU},0)`}>
        <path d="M0 0 L0 22 Q0 32 11 32 Q22 32 22 22 L22 0" />
      </g>

      {/* C */}
      <g transform={`translate(${xC},0)`}>
        <path d="M22 4 Q0 0 0 16 Q0 32 22 28" />
      </g>

      {/* E — vertical anchor (left stem) intentionally removed */}
      <g transform={`translate(${xE},0)`}>
        <line x1="0" y1="0" x2="22" y2="0" />
        <line x1="0" y1="16" x2="18" y2="16" />
        <line x1="0" y1="32" x2="22" y2="32" />
      </g>

      {/* N */}
      <g transform={`translate(${xN},0)`}>
        <line x1="0" y1="0" x2="0" y2="32" />
        <line x1="0" y1="0" x2="22" y2="32" />
        <line x1="22" y1="0" x2="22" y2="32" />
      </g>
    </svg>
  );
}
