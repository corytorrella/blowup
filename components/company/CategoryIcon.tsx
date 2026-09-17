import { Plane, Landmark, Wifi, ShieldCheck, Tv, ShoppingCart, Car, Zap, type LucideIcon } from "lucide-react";

export const CATEGORY_ICON: Record<string, LucideIcon> = {
  airlines: Plane,
  banks: Landmark,
  telecom: Wifi,
  insurance: ShieldCheck,
  streaming: Tv,
  retail: ShoppingCart,
  rideshare: Car,
  utilities: Zap,
};

export function CategoryIcon({ slug, size = 20, className = "" }: { slug: string; size?: number; className?: string }) {
  const Icon = CATEGORY_ICON[slug] ?? Zap;
  return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
}
