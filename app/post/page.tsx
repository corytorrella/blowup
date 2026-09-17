import type { Metadata } from "next";
import { Suspense } from "react";
import { StartBlowupFlow } from "@/components/post/StartBlowupFlow";

export const metadata: Metadata = { title: "Start a Blowup" };

export default function StartBlowupPage() {
  return (
    <Suspense fallback={null}>
      <StartBlowupFlow />
    </Suspense>
  );
}
