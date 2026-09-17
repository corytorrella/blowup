import type { Metadata } from "next";
import { QuietPage, LegalHeading } from "@/components/legal/QuietPage";

export const metadata: Metadata = { title: "Posting Policy" };

export default function PostingPolicyPage() {
  return (
    <QuietPage title="Posting Policy" updated="September 1, 2026">
      <p>
        This policy explains what can be posted on BLOWUP, what stays up, and the narrow set of circumstances under
        which something comes down.
      </p>

      <LegalHeading>Who a Blowup can name</LegalHeading>
      <p>
        A Blowup may only name a registered business, brand, or brand-operated service. It may not name a private
        individual, a sole proprietor acting in a personal capacity, or an employee named in place of their
        employer. This is enforced at the point of posting and is the single hardest boundary on the platform.
      </p>

      <LegalHeading>What we don&rsquo;t review</LegalHeading>
      <p>
        We don&rsquo;t check a claim for fairness, completeness, or resolution before it posts, and we don&rsquo;t review it
        for those things afterward. A Blowup can&rsquo;t be edited after posting beyond adding Receipts, and it doesn&rsquo;t
        get taken down because a company disputes it, offers a refund, or asks nicely.
      </p>

      <LegalHeading>What comes down</LegalHeading>
      <p>A narrow, non-public removal process exists solely for:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Content that exposes a private individual&rsquo;s personal data.</li>
        <li>Credible threats of violence.</li>
        <li>Child-safety violations.</li>
        <li>Content removed under valid legal process, such as a court order or subpoena.</li>
      </ul>
      <p>
        This process never evaluates whether a claim is true, fair, or resolved, and it is never triggered by a
        company&rsquo;s objection to how it&rsquo;s portrayed. See Legal Removal Requests for how to submit one of the above.
      </p>

      <LegalHeading>Manipulation &amp; integrity</LegalHeading>
      <p>
        Automated detection for bot networks, coordinated inauthentic pile-ons, and paid brigading runs continuously
        in the background. A Burn Ratio that can be bought or faked stops meaning anything, which defeats the
        purpose of the platform. Detected manipulation is discounted from Heat calculations; affected Handles may be
        suspended.
      </p>

      <LegalHeading>Companies on BLOWUP</LegalHeading>
      <p>
        A named company may respond in the open comment thread on any Blowup, under a visible account, exactly like
        any other Handle. Nothing about a reply changes a Blowup&rsquo;s Heat, tier, or position on any leaderboard.
        Companies cannot pay to remove a Blowup, boost or suppress a Burn Ratio, or receive advance notice of
        postings.
      </p>
    </QuietPage>
  );
}
