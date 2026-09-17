import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "hazard" | "outline" | "ghost" | "blowtorch";
type Size = "sm" | "md" | "lg";

const BASE =
  "laser-hover inline-flex items-center justify-center gap-2 label text-xs tracking-label transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

const VARIANT: Record<Variant, string> = {
  hazard: "bg-hazard text-void border border-void hover:bg-[#ffd633]",
  blowtorch: "bg-blowtorch text-void border border-void hover:bg-[#ff7440]",
  outline: "bg-transparent text-paper border border-void-line hover:border-hazard",
  ghost: "bg-transparent text-paper border border-transparent hover:text-hazard",
};

const SIZE: Record<Size, string> = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-7 py-4 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "hazard",
  size = "md",
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "hazard",
  size = "md",
  children,
  className = "",
  href,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
