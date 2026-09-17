import type { Metadata } from "next";
import { BlastMark } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About / Manifesto" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-void-line px-4 py-24 text-center md:py-32">
        <BlastMark size={180} intensity={0.5} seed="about" className="pointer-events-none absolute -left-16 -top-10 text-paper-faint opacity-30" />
        <p className="label mb-6 text-xs text-paper-faint">Outrage Media</p>
        <h1 className="font-display mx-auto max-w-3xl text-4xl uppercase leading-[1.05] tracking-wide text-paper md:text-6xl">
          A public leaderboard of consumer rage.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-paper-muted md:text-lg">
          Every complaint is called a Blowup &mdash; posted once, live within a minute, visible to everyone
          immediately. Anyone who&rsquo;s dealt with the same company piles on, and every pile-on adds to a running,
          public number called Heat.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <h2 className="font-display mb-6 text-3xl tracking-wide text-paper">The Problem</h2>
        <p className="text-base leading-relaxed text-paper-muted md:text-lg">
          A single frustrated customer is easy to absorb, deflect, or simply wait out. A number that&rsquo;s climbing in
          public, in real time, with no ceiling and no expiration date, is not. Most people who&rsquo;ve been wronged by
          a company have nowhere to put that energy that actually does anything with it &mdash; a call center reading
          from a script, a review buried under ten thousand others, a tweet that gets one reply and dies by morning.
          BLOWUP exists to give that energy somewhere to go where it doesn&rsquo;t disappear, where it finds company
          fast, and where it keeps growing until it&rsquo;s a number a company can&rsquo;t pretend not to see.
        </p>
      </section>

      <section className="border-y border-void-line bg-void-surface px-4 py-24 text-center md:px-8">
        <p className="font-display mx-auto max-w-3xl text-3xl leading-snug tracking-wide text-paper md:text-5xl">
          &ldquo;Nobody organizes a movement to send one strongly worded email.&rdquo;
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-paper-muted">
          People organize because the story is better with company, the number means more in public, and a
          complaint a thousand people are standing behind stops being a complaint and starts being a fact everyone
          has to deal with. BLOWUP isn&rsquo;t built to referee two sides of a story. It&rsquo;s built so the side that
          usually loses the argument finally gets to be the loudest voice in the room.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <h2 className="font-display mb-6 text-3xl tracking-wide text-paper">How It Works</h2>
        <ol className="space-y-6">
          <Step n="01" title="Post what happened.">
            Pick the company, choose a format, post. Under a minute, no structured form, no field asking what
            outcome you&rsquo;d accept.
          </Step>
          <Step n="02" title="Everyone who's had it happen piles on.">
            One tap, under their own Handle. Every pile-on is public, attached to a real account, and permanent.
          </Step>
          <Step n="03" title="The number climbs a ladder in front of everyone.">
            Lit Fuse, Getting Cooked, Trending, Viral, Blowing Up, Nuclear &mdash; and the bigger it gets, the more
            places it shows up.
          </Step>
          <Step n="04" title="Eventually, it's a number a company can't pretend not to see.">
            On its own Burn Site, on category leaderboards, on Flashpoints, and on Most Ratio&rsquo;d.
          </Step>
        </ol>
      </section>

      <section className="border-t border-void-line px-4 py-24 text-center md:px-8">
        <h2 className="font-display mb-4 text-3xl tracking-wide text-paper md:text-4xl">
          Turn Frustration Into Fear.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-paper-muted">
          One complaint is a whisper. A million is a threat.
        </p>
        <ButtonLink href="/post" size="lg">
          Start a Blowup
        </ButtonLink>
      </section>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-5 border-b border-void-line pb-6">
      <span className="data-num shrink-0 text-2xl text-paper-faint">{n}</span>
      <div>
        <p className="font-semibold text-paper">{title}</p>
        <p className="mt-1 text-sm text-paper-muted">{children}</p>
      </div>
    </li>
  );
}
