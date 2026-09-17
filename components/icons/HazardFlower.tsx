import type { IconProps } from "./types";

/**
 * The Hazard Flower — a single stencilled flower drawn in the precise
 * three-blade geometry of the nuclear trefoil. The Hall of Flame Induction graphic.
 */
export function HazardFlower({ size = 48, className, strokeWidth = 1.6, title, accent = false }: IconProps & { accent?: boolean }) {
  const petal =
    "M50 52 C 42 52, 37 41, 39 28 C 40.5 19, 45 9, 50 6 C 55 9, 59.5 19, 61 28 C 63 41, 58 52, 50 52 Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* stem */}
      <path d="M50 58 V90" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* leaves */}
      <path
        d="M50 72 C 42 70, 33 73, 30 80 C 39 82, 48 78, 50 72 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M50 79 C 58 77, 67 80, 70 87 C 61 89, 52 85, 50 79 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
      />
      {/* three trefoil-geometry blades */}
      <path d={petal} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d={petal} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" transform="rotate(120 50 52)" />
      <path d={petal} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" transform="rotate(240 50 52)" />
      {/* hub */}
      <circle cx="50" cy="52" r="7" stroke="currentColor" strokeWidth={strokeWidth} fill={accent ? "currentColor" : "none"} />
    </svg>
  );
}
