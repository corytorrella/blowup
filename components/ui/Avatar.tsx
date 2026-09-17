import { hashSeed } from "@/lib/rng";

const RING_OPACITY = [0.9, 0.6, 0.4];

export function Avatar({
  handle,
  size = 36,
  className = "",
}: {
  handle: string;
  size?: number;
  className?: string;
}) {
  const seed = hashSeed(handle);
  const initials = handle.replace(/[0-9]+$/, "").slice(0, 2).toUpperCase();
  const ringOpacity = RING_OPACITY[seed % RING_OPACITY.length];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-void-raised font-data text-paper ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        border: `1px solid rgba(245, 48, 145, ${ringOpacity})`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
