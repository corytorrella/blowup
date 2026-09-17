"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function JoinButton({ isPublic }: { isPublic: boolean }) {
  const [state, setState] = useState<"idle" | "done">("idle");
  const { show } = useToast();

  function handleClick() {
    setState("done");
    show(isPublic ? "You're in." : "Request sent.");
  }

  return (
    <Button variant={state === "done" ? "outline" : "hazard"} size="md" onClick={handleClick} disabled={state === "done"}>
      {state === "done" ? (isPublic ? "Joined" : "Requested") : isPublic ? "Join Squad" : "Request to Join"}
    </Button>
  );
}
