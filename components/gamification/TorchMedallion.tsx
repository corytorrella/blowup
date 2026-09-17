import { Flame, Users, Swords, Shield, Repeat, Moon, Target, Radar, type LucideIcon } from "lucide-react";
import type { Torch } from "@/lib/types";

const TORCH_ICON: Record<string, LucideIcon> = {
  flame: Flame,
  users: Users,
  swords: Swords,
  shield: Shield,
  repeat: Repeat,
  moon: Moon,
  target: Target,
  radar: Radar,
};

export function TorchMedallion({ torch, earned = true, size = 56 }: { torch: Torch; earned?: boolean; size?: number }) {
  const Icon = TORCH_ICON[torch.icon] ?? Flame;
  return (
    <div className="group relative flex flex-col items-center gap-2" title={`${torch.name} — ${torch.description}`}>
      <div
        className={`flex items-center justify-center rounded-full border ${
          earned ? "border-riot text-riot" : "border-void-line text-paper-faint/40"
        }`}
        style={{ width: size, height: size }}
      >
        <div className={`flex items-center justify-center rounded-full border ${earned ? "border-riot/40" : "border-void-line"}`} style={{ width: size - 10, height: size - 10 }}>
          <Icon size={size * 0.38} strokeWidth={1.4} aria-hidden="true" />
        </div>
      </div>
      <span className={`label max-w-[6rem] text-center text-[9px] leading-tight ${earned ? "text-paper-muted" : "text-paper-faint/40"}`}>
        {torch.name}
      </span>
    </div>
  );
}
