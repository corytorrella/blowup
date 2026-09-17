import type { Metadata } from "next";
import { QuietPage, LegalHeading } from "@/components/legal/QuietPage";
import { RemovalRequestForm } from "@/components/legal/RemovalRequestForm";

export const metadata: Metadata = { title: "Legal Removal Requests" };

export default function LegalRequestsPage() {
  return (
    <QuietPage title="Legal Removal Requests" updated="September 1, 2026">
      <p>
        This form is for a narrow set of unlawful or high-risk material only. It is not a channel for disputing the
        accuracy or fairness of a claim, and it is not reviewed any differently because the request comes from a
        company named in a Blowup.
      </p>

      <LegalHeading>What this covers</LegalHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>Content that exposes a private individual&rsquo;s personal data.</li>
        <li>Credible threats of violence.</li>
        <li>Child-safety violations.</li>
        <li>Removal required under valid legal process, such as a court order or subpoena.</li>
      </ul>

      <LegalHeading>What this doesn&rsquo;t cover</LegalHeading>
      <p>
        We don&rsquo;t evaluate whether a claim is true, complete, or resolved through this process, and disagreement
        with a Blowup&rsquo;s content isn&rsquo;t a basis for removal. If you&rsquo;re the company named, the appropriate channel
        is the open comment thread on the Blowup itself.
      </p>

      <div className="pt-4">
        <RemovalRequestForm />
      </div>
    </QuietPage>
  );
}
