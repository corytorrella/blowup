import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import { Avatar } from "@/components/ui/Avatar";
import { getHandle, CURRENT_USER_HANDLE } from "@/lib/data";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  const handle = getHandle(CURRENT_USER_HANDLE)!;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <PageHeader eyebrow="Account" title="Settings" />

      <section className="flex items-center gap-4 border-b border-void-line pb-10">
        <Avatar handle={handle.handle} size={56} />
        <div>
          <p className="text-lg text-paper">@{handle.handle}</p>
          <p className="text-sm text-paper-muted">Instigator since {new Date(handle.joinedAt).getFullYear()}</p>
        </div>
      </section>

      <SettingsSection title="Notifications">
        <Row label="Tier-up alerts" sub="When a Blowup you posted or piled on changes tiers." defaultOn />
        <Row label="Pile-on alerts" sub="When someone piles on a Blowup you started." defaultOn />
        <Row label="Weekly Drop email" sub="A recap of Most Ratio'd, delivered every Monday." />
        <Row label="Squad activity" sub="When your Squad earns a Torch or moves in rank." defaultOn />
      </SettingsSection>

      <SettingsSection title="Privacy">
        <Row label="Show Squad on profile" sub="Display your Squad affiliation publicly." defaultOn />
        <Row label="Suggest me for Flashpoints" sub="Let the platform suggest your Blowups for emerging patterns." defaultOn />
      </SettingsSection>

      <SettingsSection title="Account">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm text-paper">Delete Account</p>
            <p className="mt-0.5 max-w-sm text-xs text-paper-faint">
              Removes your account and profile. Blowups you&rsquo;ve already posted stay on the record — the
              platform doesn&rsquo;t erase history because an account closes.
            </p>
          </div>
          <button type="button" className="label shrink-0 border border-blowtorch/50 px-3 py-2 text-[10px] text-blowtorch tracking-label hover:bg-blowtorch hover:text-void">
            Delete
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-void-line py-10 last:border-0">
      <h2 className="font-display mb-2 text-xl tracking-wide text-paper">{title}</h2>
      <div className="divide-y divide-void-line">{children}</div>
    </section>
  );
}

function Row({ label, sub, defaultOn = false }: { label: string; sub: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-sm text-paper">{label}</p>
        <p className="mt-0.5 text-xs text-paper-faint">{sub}</p>
      </div>
      <Toggle defaultOn={defaultOn} label={label} />
    </div>
  );
}
