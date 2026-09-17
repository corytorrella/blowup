import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/help/Faq";

export const metadata: Metadata = { title: "Help / FAQ" };

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <PageHeader eyebrow="Help" title="Frequently Asked" description="Everything about how BLOWUP works, in plain terms." />
      <Faq />
    </div>
  );
}
