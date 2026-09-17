const PERSONAL_PHRASES = [
  "my neighbor",
  "my ex",
  "my coworker",
  "my boss",
  "my landlord",
  "my roommate",
  "my brother",
  "my sister",
  "my mom",
  "my dad",
];

const COMMON_FIRST_NAMES = new Set([
  "john", "jane", "mike", "michael", "sarah", "james", "david", "emily",
  "robert", "linda", "mark", "susan", "chris", "jennifer", "steve", "karen",
]);

/** A rough, client-side approximation of the platform's eligibility check — businesses only. */
export function checkEligibility(rawName: string): { eligible: boolean; reason?: string } {
  const name = rawName.trim();
  if (name.length === 0) return { eligible: true };

  const lower = name.toLowerCase();
  if (PERSONAL_PHRASES.some((p) => lower.includes(p))) {
    return { eligible: false, reason: "We only go after companies, not people. Try again." };
  }

  const words = name.split(/\s+/);
  if (words.length === 2 && words.every((w) => /^[A-Z][a-z]+$/.test(w)) && COMMON_FIRST_NAMES.has(words[0].toLowerCase())) {
    return { eligible: false, reason: "We only go after companies, not people. Try again." };
  }

  return { eligible: true };
}
