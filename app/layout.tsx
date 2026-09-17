import type { Metadata } from "next";
import { anton, inter, spaceMono, stardos } from "./fonts";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export const metadata: Metadata = {
  title: {
    default: "BLOWUP — Turn Frustration Into Fear",
    template: "%s — BLOWUP",
  },
  description:
    "BLOWUP is a live leaderboard of consumer rage. Complaints against companies accumulate public Heat until a company can't pretend not to be watched.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${spaceMono.variable} ${stardos.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-[60vh] pb-24 lg:pb-0">{children}</main>
            <Footer />
            <MobileTabBar />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
