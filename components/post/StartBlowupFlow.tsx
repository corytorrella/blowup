"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Video, Camera, Mic, Type, Check, Upload, CircleDot, Square } from "lucide-react";
import { Stepper } from "./Stepper";
import { Button } from "@/components/ui/Button";
import { TierBadge } from "@/components/blowup/TierBadge";
import { companies, flashpoints } from "@/lib/data";
import { checkEligibility } from "@/lib/eligibility";
import type { ContentFormat } from "@/lib/types";

const FORMAT_OPTIONS: { id: ContentFormat; label: string; description: string; icon: typeof Video }[] = [
  { id: "video", label: "Video Rant", description: "Up to 90 seconds, vertical, auto-captioned.", icon: Video },
  { id: "receipts", label: "Receipts", description: "Screenshots, confirmations, chat logs.", icon: Camera },
  { id: "voice", label: "Voice Memo", description: "For when typing feels too slow.", icon: Mic },
  { id: "quick-take", label: "Quick Take", description: "Plain text, under 280 characters.", icon: Type },
];

export function StartBlowupFlow() {
  const searchParams = useSearchParams();
  const presetFlashpoint = searchParams.get("flashpoint");

  const [step, setStep] = useState(1);
  const [companyQuery, setCompanyQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [formats, setFormats] = useState<ContentFormat[]>([]);
  const [quickTakeText, setQuickTakeText] = useState("");
  const [receiptNames, setReceiptNames] = useState<string[]>([]);
  const [videoCaptured, setVideoCaptured] = useState(false);
  const [voiceCaptured, setVoiceCaptured] = useState(false);
  const [recording, setRecording] = useState<null | "video" | "voice">(null);
  const [flashpointSlugs, setFlashpointSlugs] = useState<string[]>(presetFlashpoint ? [presetFlashpoint] : []);
  const [posted, setPosted] = useState(false);

  const eligibility = useMemo(() => checkEligibility(companyQuery), [companyQuery]);

  const suggestions = useMemo(() => {
    if (companyQuery.trim().length === 0) return [];
    return companies.filter((c) => c.name.toLowerCase().includes(companyQuery.trim().toLowerCase())).slice(0, 6);
  }, [companyQuery]);

  const selectedCompanyObj = companies.find((c) => c.slug === selectedCompany);
  const companyLabel = selectedCompanyObj?.name ?? (companyQuery.trim() || null);

  const canAdvance: Record<number, boolean> = {
    1: Boolean(companyLabel) && eligibility.eligible,
    2: formats.length > 0,
    3:
      (!formats.includes("video") || videoCaptured) &&
      (!formats.includes("voice") || voiceCaptured) &&
      (!formats.includes("receipts") || receiptNames.length > 0) &&
      (!formats.includes("quick-take") || quickTakeText.trim().length > 0),
    4: true,
    5: true,
  };

  function toggleFormat(id: ContentFormat) {
    setFormats((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function toggleFlashpoint(slug: string) {
    setFlashpointSlugs((prev) => (prev.includes(slug) ? prev.filter((f) => f !== slug) : [...prev, slug]));
  }

  function simulateCapture(kind: "video" | "voice") {
    setRecording(kind);
    setTimeout(() => {
      setRecording(null);
      if (kind === "video") setVideoCaptured(true);
      else setVoiceCaptured(true);
    }, 1400);
  }

  if (posted) {
    return <PostedConfirmation companyName={companyLabel ?? "the company"} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <p className="label mb-2 text-[10px] text-paper-faint">Start a Blowup</p>
      <h1 className="font-display mb-10 text-4xl tracking-wide text-paper md:text-5xl">Fifteen Seconds.</h1>

      <Stepper current={step} />

      {step === 1 && (
        <div>
          <h2 className="font-display mb-2 text-2xl tracking-wide text-paper">Who wronged you?</h2>
          <p className="mb-6 text-sm text-paper-muted">
            Businesses, brands, or brand-operated services only — never a private individual.
          </p>
          <input
            type="text"
            value={companyQuery}
            onChange={(e) => {
              setCompanyQuery(e.target.value);
              setSelectedCompany(null);
            }}
            placeholder="Search or type a company name"
            className="w-full border border-void-line bg-void-surface px-4 py-3.5 text-base text-paper outline-none focus:border-hazard"
          />
          {!eligibility.eligible && (
            <p className="mt-3 border border-blowtorch/50 bg-blowtorch/10 px-4 py-3 text-sm text-blowtorch">
              {eligibility.reason}
            </p>
          )}
          {eligibility.eligible && suggestions.length > 0 && !selectedCompany && (
            <ul className="mt-3 divide-y divide-void-line border border-void-line">
              {suggestions.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCompany(c.slug);
                      setCompanyQuery(c.name);
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-paper hover:bg-void-raised"
                  >
                    {c.name}
                    <span className="label text-[10px] text-paper-faint">Fear Page exists</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {eligibility.eligible && companyQuery.trim().length > 0 && suggestions.length === 0 && (
            <p className="mt-3 text-sm text-paper-muted">
              No existing Fear Page for &ldquo;{companyQuery.trim()}&rdquo; &mdash; posting will create one.
            </p>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display mb-2 text-2xl tracking-wide text-paper">Pick your format.</h2>
          <p className="mb-6 text-sm text-paper-muted">Combine as many as you want.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {FORMAT_OPTIONS.map((opt) => {
              const active = formats.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleFormat(opt.id)}
                  className={`laser-hover flex flex-col gap-3 border p-5 text-left transition-colors ${
                    active ? "border-hazard bg-void-surface" : "border-void-line hover:border-paper-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} strokeWidth={1.5} className={active ? "text-hazard" : "text-paper-muted"} />
                    {active && <Check size={16} strokeWidth={2} className="text-hazard" />}
                  </div>
                  <div>
                    <p className="font-semibold text-paper">{opt.label}</p>
                    <p className="mt-1 text-xs text-paper-muted">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <h2 className="font-display text-2xl tracking-wide text-paper">Record or upload.</h2>

          {formats.includes("quick-take") && (
            <div>
              <p className="label mb-2 text-[10px] text-paper-faint">Quick Take</p>
              <textarea
                value={quickTakeText}
                onChange={(e) => setQuickTakeText(e.target.value.slice(0, 280))}
                rows={4}
                placeholder="What happened?"
                className="w-full border border-void-line bg-void-surface px-4 py-3 text-sm text-paper outline-none focus:border-hazard"
              />
              <p className="data-num mt-1 text-right text-xs text-paper-faint">{quickTakeText.length}/280</p>
            </div>
          )}

          {formats.includes("video") && (
            <div>
              <p className="label mb-2 text-[10px] text-paper-faint">Video Rant</p>
              <button
                type="button"
                onClick={() => simulateCapture("video")}
                disabled={recording === "video"}
                className="flex w-full items-center justify-center gap-3 border border-void-line bg-void-surface px-5 py-6 text-sm text-paper hover:border-hazard disabled:opacity-60"
              >
                {videoCaptured ? (
                  <>
                    <Check size={18} className="text-hazard" /> Captured &mdash; 0:14
                  </>
                ) : recording === "video" ? (
                  <>
                    <Square size={16} className="animate-pulse text-blowtorch" /> Recording&hellip;
                  </>
                ) : (
                  <>
                    <CircleDot size={18} /> Tap to Record
                  </>
                )}
              </button>
            </div>
          )}

          {formats.includes("voice") && (
            <div>
              <p className="label mb-2 text-[10px] text-paper-faint">Voice Memo</p>
              <button
                type="button"
                onClick={() => simulateCapture("voice")}
                disabled={recording === "voice"}
                className="flex w-full items-center justify-center gap-3 border border-void-line bg-void-surface px-5 py-6 text-sm text-paper hover:border-hazard disabled:opacity-60"
              >
                {voiceCaptured ? (
                  <>
                    <Check size={18} className="text-hazard" /> Captured &mdash; 0:38
                  </>
                ) : recording === "voice" ? (
                  <>
                    <Square size={16} className="animate-pulse text-blowtorch" /> Recording&hellip;
                  </>
                ) : (
                  <>
                    <Mic size={18} /> Tap to Record
                  </>
                )}
              </button>
            </div>
          )}

          {formats.includes("receipts") && (
            <div>
              <p className="label mb-2 text-[10px] text-paper-faint">Receipts</p>
              <label className="flex cursor-pointer items-center justify-center gap-3 border border-dashed border-void-line px-5 py-6 text-sm text-paper-muted hover:border-hazard">
                <Upload size={18} />
                {receiptNames.length > 0 ? `${receiptNames.length} file(s) attached` : "Upload screenshots"}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []).map((f) => f.name);
                    setReceiptNames((prev) => [...prev, ...files]);
                  }}
                />
              </label>
              {receiptNames.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {receiptNames.map((n, i) => (
                    <li key={i} className="data-num text-xs text-paper-muted">
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-display mb-2 text-2xl tracking-wide text-paper">Tag a Flashpoint.</h2>
          <p className="mb-6 text-sm text-paper-muted">Optional. If the pattern already exists, join it.</p>
          <div className="flex flex-wrap gap-2">
            {flashpoints.map((f) => {
              const active = flashpointSlugs.includes(f.slug);
              return (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => toggleFlashpoint(f.slug)}
                  className={`label border px-3 py-2 text-[10px] tracking-label transition-colors ${
                    active ? "border-blowtorch bg-blowtorch text-void" : "border-void-line text-paper-muted hover:border-blowtorch hover:text-blowtorch"
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Review and post.</h2>
          <div className="space-y-4 border border-void-line bg-void-surface p-6">
            <Row label="Company" value={companyLabel ?? "—"} />
            <Row label="Formats" value={formats.map((f) => FORMAT_OPTIONS.find((o) => o.id === f)?.label).join(", ") || "—"} />
            {quickTakeText && <Row label="Quick Take" value={quickTakeText} />}
            <Row
              label="Flashpoints"
              value={flashpointSlugs.map((s) => flashpoints.find((f) => f.slug === s)?.name).join(", ") || "None tagged"}
            />
            <div className="flex items-center justify-between pt-2">
              <span className="label text-[10px] text-paper-faint">Starting Tier</span>
              <TierBadge tier="spark" size="sm" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-void-line pt-6">
        <Button variant="ghost" size="sm" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
          Back
        </Button>
        {step < 5 ? (
          <Button size="md" onClick={() => setStep((s) => Math.min(5, s + 1))} disabled={!canAdvance[step]}>
            Continue
          </Button>
        ) : (
          <Button size="lg" onClick={() => setPosted(true)}>
            Post It
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-void-line pb-3 last:border-0 last:pb-0">
      <span className="label shrink-0 text-[10px] text-paper-faint">{label}</span>
      <span className="text-right text-sm text-paper">{value}</span>
    </div>
  );
}

function PostedConfirmation({ companyName }: { companyName: string }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <span className="label mb-6 border border-hazard px-3 py-1 text-[10px] text-hazard">Live</span>
      <h1 className="font-display text-4xl tracking-wide text-paper md:text-5xl">It&rsquo;s Live.</h1>
      <p className="mt-4 text-base text-paper-muted">
        Your Blowup against <strong className="text-paper">{companyName}</strong> is posted. Anyone who&rsquo;s dealt
        with them can pile on now &mdash; and every one of them adds to the number.
      </p>
      <div className="mt-10 flex gap-3">
        <Button variant="outline" size="md" onClick={() => window.location.reload()}>
          Start Another
        </Button>
        <Button size="md" onClick={() => (window.location.href = "/most-feared")}>
          See Most Feared
        </Button>
      </div>
    </div>
  );
}
