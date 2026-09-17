import type { Metadata } from "next";
import { QuietPage, LegalHeading } from "@/components/legal/QuietPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <QuietPage title="Privacy Policy" updated="September 1, 2026">
      <p>This policy describes what BLOWUP collects, why, and the choices you have about it.</p>

      <LegalHeading>What we collect</LegalHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>Account information tied to your Handle, such as a contact method used for login.</li>
        <li>Content you post &mdash; Blowups, comments, pledges, and any Receipts you attach.</li>
        <li>Usage data, such as which pages you visit and which Blowups you pile on.</li>
        <li>Device and log data collected automatically, such as IP address and browser type.</li>
      </ul>

      <LegalHeading>What a Handle is, and isn&rsquo;t</LegalHeading>
      <p>
        A Handle is pseudonymous by design. We don&rsquo;t display your legal name, email address, or account
        information alongside your public activity. Internal account records are kept separate from the public
        Handle identity.
      </p>

      <LegalHeading>How we use it</LegalHeading>
      <p>
        We use your information to operate the platform, compute Heat and Clout, detect manipulation and abuse,
        communicate with you about your account, and produce aggregate, non-claim-level trend data for press and
        research licensing.
      </p>

      <LegalHeading>What we don&rsquo;t do</LegalHeading>
      <p>
        We don&rsquo;t sell your personal information. We don&rsquo;t share your identity with a company named in a Blowup
        you&rsquo;ve posted or piled onto, and companies have no account relationship with BLOWUP that would let them
        request it.
      </p>

      <LegalHeading>Your choices</LegalHeading>
      <p>
        You can update account details and notification preferences in Settings. You can request a copy of your
        data or deletion of your account information, subject to what we&rsquo;re required to retain by law and to the
        permanence of already-published Blowups, which are a public record independent of your account.
      </p>

      <LegalHeading>Retention</LegalHeading>
      <p>
        Account records are retained for as long as your account is active and as needed to comply with legal
        obligations. Public content on the platform is retained permanently as described in our Posting Policy.
      </p>
    </QuietPage>
  );
}
