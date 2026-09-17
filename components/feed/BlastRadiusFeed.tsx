"use client";

import { useState } from "react";
import { BlowupListItem } from "@/components/blowup/BlowupListItem";
import { FlashpointCard } from "@/components/flashpoint/FlashpointCard";
import { Button } from "@/components/ui/Button";
import type { Blowup, Flashpoint } from "@/lib/types";

const PAGE_SIZE = 10;

export function BlastRadiusFeed({ blowups, flashpoints }: { blowups: Blowup[]; flashpoints: Flashpoint[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = blowups.slice(0, visible);

  return (
    <div>
      <div className="border-t border-void-line">
        {shown.map((b, i) => (
          <div key={b.id}>
            <BlowupListItem blowup={b} />
            {i > 0 && i % 6 === 5 && flashpoints[Math.floor(i / 6) % flashpoints.length] && (
              <div className="my-2 grid gap-4 border-b border-void-line py-6 sm:grid-cols-2">
                <FlashpointCard flashpoint={flashpoints[Math.floor(i / 6) % flashpoints.length]} />
              </div>
            )}
          </div>
        ))}
      </div>
      {visible < blowups.length && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
