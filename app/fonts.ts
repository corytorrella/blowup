import { Anton, Inter, Space_Mono, Stardos_Stencil } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const stardos = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-stardos",
  display: "swap",
});
