import type { Metadata } from "next";
import { QuietPage, LegalHeading } from "@/components/legal/QuietPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <QuietPage title="Terms of Service" updated="September 1, 2026">
      <p>
        These Terms govern your use of BLOWUP. By creating a Handle or posting a Blowup, you agree to them. If you
        don&rsquo;t agree, don&rsquo;t use the platform.
      </p>

      <LegalHeading>1. What BLOWUP Is</LegalHeading>
      <p>
        BLOWUP is a public platform for posting and aggregating consumer complaints against businesses, brands, and
        brand-operated services. Content you post is public, attached to your Handle, and, with narrow exceptions
        described in our Posting Policy, permanent.
      </p>

      <LegalHeading>2. Your Account</LegalHeading>
      <p>
        A Handle is a persistent, pseudonymous identity. You&rsquo;re responsible for activity under your Handle. Don&rsquo;t
        impersonate another person or entity, and don&rsquo;t operate multiple Handles to manipulate Heat, Clout, or any
        leaderboard.
      </p>

      <LegalHeading>3. What You Post</LegalHeading>
      <p>
        You retain ownership of what you post. By posting, you grant BLOWUP a non-exclusive, worldwide, royalty-free
        license to host, display, distribute, and promote that content on and off the platform, including in
        share exports, The Drop, and press materials.
      </p>
      <p>
        You&rsquo;re solely responsible for the accuracy of what you post. BLOWUP does not verify claims before or after
        publication and does not mediate disputes between a Handle and a named company.
      </p>

      <LegalHeading>4. Eligibility</LegalHeading>
      <p>
        A Blowup may only name a registered business, brand, or brand-operated service &mdash; never a private
        individual, a sole proprietor acting in a personal capacity, or an employee named in place of their
        employer. See our Posting Policy for the full rule.
      </p>

      <LegalHeading>5. No Editorial Review</LegalHeading>
      <p>
        BLOWUP does not pre-clear posts with the companies they name, does not fact-check claims, and does not take
        content down because a company disputes it, requests a correction, or offers a resolution to the poster.
        The record is built to be permanent.
      </p>

      <LegalHeading>6. Termination</LegalHeading>
      <p>
        We may suspend or terminate a Handle that violates these Terms, including through coordinated manipulation
        of Heat or Clout. Removal of an account does not remove that Handle&rsquo;s past posts from the record.
      </p>

      <LegalHeading>7. Disclaimers &amp; Liability</LegalHeading>
      <p>
        BLOWUP is provided &ldquo;as is.&rdquo; We aren&rsquo;t a party to any dispute between a Handle and a named company, and we
        don&rsquo;t guarantee the accuracy of user-submitted content. To the extent permitted by law, BLOWUP&rsquo;s liability
        for any claim arising from your use of the platform is limited.
      </p>

      <LegalHeading>8. Changes</LegalHeading>
      <p>We may update these Terms. Material changes will be reflected here with an updated date.</p>
    </QuietPage>
  );
}
