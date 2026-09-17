import { seededRandom } from "@/lib/rng";

function polar(cx: number, cy: number, angleDeg: number, r: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function buildShard(angle: number, intensity: number, seed: string): string {
  const rand = seededRandom(`${seed}-${angle}`);
  const cx = 50;
  const cy = 50;
  const r0 = 5;
  const rMid = 14 + intensity * 10;
  const rJag = 22 + intensity * 16;
  const rTip = 30 + intensity * 46;
  const w1 = 3 + intensity * 1;
  const jagAmp = 2 + intensity * 11;
  const w2 = Math.max(0.5, w1 + (rand() - 0.5) * jagAmp);
  const tipJitter = (rand() - 0.5) * intensity * 6;

  const base = polar(cx, cy, angle, r0);
  const midPointL = [cx + Math.cos((angle * Math.PI) / 180) * rMid, cy + Math.sin((angle * Math.PI) / 180) * rMid];
  const pLeft1: [number, number] = [midPointL[0] + Math.cos(((angle - 90) * Math.PI) / 180) * w1, midPointL[1] + Math.sin(((angle - 90) * Math.PI) / 180) * w1];
  const midPointJ = [cx + Math.cos((angle * Math.PI) / 180) * rJag, cy + Math.sin((angle * Math.PI) / 180) * rJag];
  const pLeftJag: [number, number] = [midPointJ[0] + Math.cos(((angle - 90) * Math.PI) / 180) * w2, midPointJ[1] + Math.sin(((angle - 90) * Math.PI) / 180) * w2];
  const pRightJag: [number, number] = [midPointJ[0] + Math.cos(((angle + 90) * Math.PI) / 180) * w2, midPointJ[1] + Math.sin(((angle + 90) * Math.PI) / 180) * w2];
  const pRight1: [number, number] = [midPointL[0] + Math.cos(((angle + 90) * Math.PI) / 180) * w1, midPointL[1] + Math.sin(((angle + 90) * Math.PI) / 180) * w1];
  const tip = polar(cx, cy, angle, rTip + tipJitter);

  return [
    `${base[0].toFixed(2)},${base[1].toFixed(2)}`,
    `${pLeft1[0].toFixed(2)},${pLeft1[1].toFixed(2)}`,
    `${pLeftJag[0].toFixed(2)},${pLeftJag[1].toFixed(2)}`,
    `${tip[0].toFixed(2)},${tip[1].toFixed(2)}`,
    `${pRightJag[0].toFixed(2)},${pRightJag[1].toFixed(2)}`,
    `${pRight1[0].toFixed(2)},${pRight1[1].toFixed(2)}`,
  ].join(" ");
}

export interface BlastMarkProps {
  size?: number;
  /** 0 (dormant) to 1 (Nuclear) — drives length, jaggedness, and reach. */
  intensity?: number;
  /** Stable per-company/per-context seed so the jagged geometry doesn't reshuffle on every render. */
  seed?: string;
  className?: string;
  title?: string;
  showGuide?: boolean;
}

/**
 * The re-engineered Blast Mark — three jagged shards from a shared point,
 * redrawn with drafting-table precision, like a blast-radius diagram.
 * Scales directly with a company's current Heat.
 */
export function BlastMark({ size = 64, intensity = 0.15, seed = "blast", className, title, showGuide = true }: BlastMarkProps) {
  const clamped = Math.max(0, Math.min(1, intensity));
  const angles = [-90, 30, 150];
  const [yellowPts, orangePts, outlinePts] = angles.map((a) => buildShard(a, clamped, seed));
  const guideR = 24 + clamped * 52;

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
      {showGuide && (
        <circle
          cx="50"
          cy="50"
          r={guideR}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="1.5 3"
          opacity={0.22}
        />
      )}
      {/* origin crosshair, drafting-table mark */}
      <path d="M50 44 V38 M50 56 V62 M44 50 H38 M56 50 H62" stroke="currentColor" strokeWidth={0.6} opacity={0.35} />

      <polygon points={outlinePts} stroke="#A6A6A2" strokeWidth={1} strokeLinejoin="round" fill="none" opacity={0.85} />
      <polygon points={orangePts} stroke="#FF5A1F" strokeWidth={1} strokeLinejoin="round" fill="#FF5A1F" fillOpacity={0.92} />
      <polygon points={yellowPts} stroke="#F5C400" strokeWidth={1} strokeLinejoin="round" fill="#F5C400" fillOpacity={0.95} />

      <circle cx="50" cy="50" r="2.2" fill="currentColor" opacity={0.8} />
    </svg>
  );
}
