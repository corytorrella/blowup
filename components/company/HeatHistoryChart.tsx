"use client";

import { useId, useMemo, useState } from "react";
import { formatCompact, formatDate, formatHeat } from "@/lib/format";
import type { HeatSample } from "@/lib/types";

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 28;

export function HeatHistoryChart({ history }: { history: HeatSample[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const gradientId = useId();

  const { points, yTicks, maxHeat } = useMemo(() => {
    const max = Math.max(...history.map((h) => h.heat), 1);
    const innerW = WIDTH - PAD_LEFT - PAD_RIGHT;
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
    const pts = history.map((h, i) => {
      const x = PAD_LEFT + (history.length === 1 ? innerW : (i / (history.length - 1)) * innerW);
      const y = PAD_TOP + innerH - (h.heat / max) * innerH;
      return { x, y, sample: h };
    });
    const ticks = [0, 0.5, 1].map((f) => ({
      value: Math.round(max * f),
      y: PAD_TOP + innerH - f * innerH,
    }));
    return { points: pts, yTicks: ticks, maxHeat: max };
  }, [history]);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${HEIGHT - PAD_BOTTOM} L${points[0].x.toFixed(1)},${HEIGHT - PAD_BOTTOM} Z`;
  const last = points[points.length - 1];
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  return (
    <div>
      <div className="relative">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Heat over time">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={t.y} y2={t.y} stroke="#2A2A2E" strokeWidth={1} />
              <text x={PAD_LEFT - 8} y={t.y + 3} textAnchor="end" className="fill-paper-faint" fontSize={10} fontFamily="var(--font-space-mono)">
                {formatCompact(t.value)}
              </text>
            </g>
          ))}

          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
          <path d={linePath} fill="none" stroke="#FF5A1F" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          <circle cx={last.x} cy={last.y} r={5} fill="#FF5A1F" stroke="#131315" strokeWidth={2} />
          <text x={last.x} y={last.y - 12} textAnchor="end" className="fill-paper" fontSize={12} fontFamily="var(--font-space-mono)" fontWeight={700}>
            {formatHeat(maxHeat)}
          </text>

          {hovered && (
            <g>
              <line x1={hovered.x} x2={hovered.x} y1={PAD_TOP} y2={HEIGHT - PAD_BOTTOM} stroke="#A6A6A2" strokeWidth={1} strokeDasharray="2 3" />
              <circle cx={hovered.x} cy={hovered.y} r={4} fill="#F5C400" stroke="#131315" strokeWidth={2} />
            </g>
          )}

          <rect
            x={PAD_LEFT}
            y={0}
            width={WIDTH - PAD_LEFT - PAD_RIGHT}
            height={HEIGHT}
            fill="transparent"
            onPointerMove={handleMove}
            onPointerLeave={() => setHoverIndex(null)}
          />
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute top-1 border border-void-line bg-void-raised px-3 py-2 text-xs shadow-lg"
            style={{ left: `${(hovered.x / WIDTH) * 100}%`, transform: "translateX(-50%)" }}
          >
            <p className="data-num font-bold text-paper">{formatHeat(hovered.sample.heat)}</p>
            <p className="label text-[9px] text-paper-faint">{formatDate(hovered.sample.date)}</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="label text-[10px] text-paper-faint">
          {formatDate(history[0].date)} &ndash; {formatDate(history[history.length - 1].date)}
        </p>
        <button
          type="button"
          onClick={() => setShowTable((s) => !s)}
          className="label text-[10px] text-paper-faint underline decoration-void-line hover:text-hazard"
        >
          {showTable ? "Hide" : "View"} as table
        </button>
      </div>

      {showTable && (
        <table className="mt-4 w-full border-collapse text-left text-sm">
          <caption className="sr-only">Heat over time, by week</caption>
          <thead>
            <tr className="border-b border-void-line text-paper-faint">
              <th scope="col" className="label py-2 text-[10px] font-normal">Date</th>
              <th scope="col" className="label py-2 text-[10px] font-normal">Heat</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-b border-void-line/60">
                <td className="py-1.5 text-paper-muted">{formatDate(h.date)}</td>
                <td className="data-num py-1.5 text-paper">{formatHeat(h.heat)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
