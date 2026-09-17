"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is BLOWUP?",
    a: "A public leaderboard of consumer rage. You post a complaint against a company, other people who've dealt with the same thing pile on, and the running total — Heat — climbs a public ladder in real time.",
  },
  {
    q: "How does Heat work?",
    a: "Every pile-on adds to a Blowup's Heat. Heat climbs six tiers: Lit Fuse, Getting Cooked, Trending, Viral, Blowing Up, and Nuclear. A company's Burn Ratio is its total Heat across every Blowup ever filed against it.",
  },
  {
    q: "Who can I post about?",
    a: "Businesses, brands, or brand-operated services only. BLOWUP runs on corporate accountability, not on neighbors, coworkers, or exes — posts naming a private individual are rejected at the point of posting.",
  },
  {
    q: "What's a Flashpoint?",
    a: "A live page aggregating every Blowup tagged to the same pattern — junk fees, hidden cancellation fees, wait times — ranking every company caught up in it against each other, independent of any single company's own Burn Ratio.",
  },
  {
    q: "Can a company get a Blowup taken down?",
    a: "No. Nothing comes down because a company disputes it, offers a refund, or hires a lawyer to ask nicely. The only removals are for unlawful or high-risk material — see our Posting Policy.",
  },
  {
    q: "Can companies respond?",
    a: "Yes, in the open comment thread on any Blowup, under a visible account, exactly like any other Handle. A reply doesn't change Heat, tier, or leaderboard position.",
  },
  {
    q: "What's Clout, and how is it different from Heat?",
    a: "Heat belongs to a Blowup or a company. Clout belongs to you — it's earned by starting a Blowup that climbs, by piling on early, and by pulling in new followers. Early action is worth more than late action.",
  },
  {
    q: "What happens at The Drop?",
    a: "Every Monday at noon, the Most Ratio'd leaderboard locks and reveals its new order, alongside Biggest Mover of the Week and Flashpoint of the Week.",
  },
  {
    q: "Is my identity attached to what I post?",
    a: "Your Handle is pseudonymous — a persistent identity, not your legal name. See our Privacy Policy for what we collect and how it's used.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-void-line border-y border-void-line">
      {FAQS.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base text-paper md:text-lg">{item.q}</span>
              <ChevronDown
                size={18}
                strokeWidth={1.6}
                className={`shrink-0 text-paper-faint transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {expanded && <p className="max-w-2xl pb-6 text-sm leading-relaxed text-paper-muted">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
