import { ButtonLink } from "@/components/ui/Button";
import { BlastMark } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <BlastMark size={90} intensity={0.05} seed="404" showGuide={false} className="mb-8 text-paper-faint opacity-60" />
      <p className="label mb-3 text-[10px] text-paper-faint">404</p>
      <h1 className="font-display text-4xl tracking-wide text-paper md:text-5xl">Nothing Here Yet.</h1>
      <p className="mt-4 text-base text-paper-muted">
        No Burn Site, Blowup, or record matches this address. Maybe it hasn&rsquo;t happened yet.
      </p>
      <div className="mt-10 flex gap-3">
        <ButtonLink href="/" variant="outline" size="md">
          Back Home
        </ButtonLink>
        <ButtonLink href="/most-ratiod" size="md">
          Most Ratio&rsquo;d
        </ButtonLink>
      </div>
    </div>
  );
}
