"use client";

import { useState } from "react";

const CATEGORIES = [
  "Exposes a private individual's personal data",
  "Credible threat of violence",
  "Child-safety violation",
  "Valid legal process (court order or subpoena)",
];

const FIELD_CLASS =
  "w-full border border-void-line bg-void-surface px-3.5 py-2.5 text-sm text-paper outline-none focus:border-paper-muted";

export function RemovalRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-void-line px-6 py-8 text-sm text-paper-muted">
        Request received. We review these individually and will follow up at the contact information provided.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5 border border-void-line px-6 py-8"
    >
      <Field label="Link to the content">
        <input type="text" required placeholder="https://blowup.example/company/.../blowup/..." className={FIELD_CLASS} />
      </Field>
      <Field label="Category">
        <select required defaultValue="" className={FIELD_CLASS}>
          <option value="" disabled>
            Select one
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Explanation">
        <textarea required rows={4} placeholder="What's the basis for removal?" className={FIELD_CLASS} />
      </Field>
      <Field label="Contact email">
        <input type="email" required placeholder="you@example.com" className={FIELD_CLASS} />
      </Field>
      <button type="submit" className="border border-void-line px-5 py-2.5 text-sm text-paper hover:border-paper">
        Submit Request
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-paper-faint">{label}</span>
      {children}
    </label>
  );
}
