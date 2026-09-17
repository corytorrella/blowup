"use client";

import { useEffect, useState } from "react";
import { SignatureMomentOverlay } from "@/components/ui/SignatureMomentOverlay";
import { markSeenOnce } from "@/lib/session-once";

export function InductionMoment({ companySlug, companyName }: { companySlug: string; companyName: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (markSeenOnce(`induction-${companySlug}`)) {
      const t = setTimeout(() => setOpen(true), 300);
      return () => clearTimeout(t);
    }
  }, [companySlug]);

  return (
    <SignatureMomentOverlay
      open={open}
      onClose={() => setOpen(false)}
      motif="flower"
      headline="Inducted"
      sub={`${companyName} just crossed into Nuclear. Permanent Hall of Shame induction.`}
    />
  );
}
