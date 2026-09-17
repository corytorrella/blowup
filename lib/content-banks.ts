export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
  companies: string[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "airlines",
    name: "Airlines",
    description: "Delays, fees, and the seat you already paid for.",
    companies: ["Vantage Air", "Coastal Jet", "Northwing Airlines"],
  },
  {
    slug: "banks",
    name: "Banks & Credit Cards",
    description: "Fees on fees, holds on holds.",
    companies: ["Meridian Trust", "Ironclad Bank", "Cobalt Financial"],
  },
  {
    slug: "telecom",
    name: "Telecom & Internet",
    description: "The bill never matches the quote.",
    companies: ["Nimbus Mobile", "Circuit Telecom", "Waveline Communications"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    description: "Covered, until it's time to pay.",
    companies: ["Bastion Insurance", "Shieldpoint Mutual", "Harborlight Assurance"],
  },
  {
    slug: "streaming",
    name: "Streaming & Subscriptions",
    description: "Easy to join. Engineered to be hard to leave.",
    companies: ["Reelstream", "Pulse+", "Loopcast"],
  },
  {
    slug: "retail",
    name: "Retail & E-Commerce",
    description: "The box arrives. The problem starts there.",
    companies: ["Bargain Barrel", "CartCo", "Dailyhaul"],
  },
  {
    slug: "rideshare",
    name: "Rideshare & Delivery",
    description: "A fee for the ride, a fee for the fee.",
    companies: ["Zoomcar Rides", "Fetchly", "Hoplin"],
  },
  {
    slug: "utilities",
    name: "Utilities",
    description: "No competitor. No incentive to care.",
    companies: ["Gridline Energy", "Purewater Utilities", "Ashcroft Power"],
  },
];

export interface ComplaintTemplate {
  text: string;
  flashpoints: string[];
  format: "video" | "receipts" | "voice" | "quick-take";
}

export const FLASHPOINT_DEFS: { slug: string; name: string; description: string }[] = [
  {
    slug: "junk-fees",
    name: "Junk Fees",
    description: "The price you're quoted and the price you pay are never the same number.",
  },
  {
    slug: "hidden-cancellation-fees",
    name: "Hidden Cancellation Fees",
    description: "Signing up takes ten seconds. Leaving is a maze with a toll at every turn.",
  },
  {
    slug: "wait-times",
    name: "Wait Times From Hell",
    description: "Hold music as a business strategy.",
  },
  {
    slug: "chatbot-loop",
    name: "Chatbot Loop Purgatory",
    description: "Ask for a human. Get a menu. Repeat.",
  },
  {
    slug: "rate-hikes",
    name: "Surprise Rate Hikes",
    description: "The price goes up. The reason never arrives.",
  },
  {
    slug: "refund-runaround",
    name: "Refund Runaround",
    description: "They took the money instantly. Getting it back is a project.",
  },
];

export const COMPLAINT_TEMPLATES: Record<string, ComplaintTemplate[]> = {
  airlines: [
    { text: "charged me $89 to sit next to my own kid", flashpoints: ["junk-fees"], format: "quick-take" },
    { text: "canceled my flight and rebooked me for THURSDAY", flashpoints: [], format: "video" },
    { text: "lost my bag for 11 days and offered a $25 voucher", flashpoints: ["refund-runaround"], format: "receipts" },
    { text: "delayed 6 hours, zero food vouchers, zero explanation", flashpoints: ["wait-times"], format: "video" },
    { text: "made me gate-check a bag that fit the sizer perfectly", flashpoints: ["junk-fees"], format: "quick-take" },
  ],
  banks: [
    { text: "hit me with a $35 fee for being $2 short", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "froze my account for a week over a $40 purchase", flashpoints: ["wait-times"], format: "quick-take" },
    { text: "raised my APR without telling me why", flashpoints: ["rate-hikes"], format: "video" },
    { text: "charged an 'inactivity fee' on money I never touched", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "took 9 days to reverse a fraud charge they confirmed was fraud", flashpoints: ["refund-runaround", "wait-times"], format: "video" },
  ],
  telecom: [
    { text: "quoted $49/mo, billed me $91", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "put me on hold for 2 hours to cancel one line", flashpoints: ["wait-times", "hidden-cancellation-fees"], format: "voice" },
    { text: "throttled my 'unlimited' data at 12GB", flashpoints: [], format: "quick-take" },
    { text: "charged an equipment fee for a router I bought myself", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "the chatbot looped me for 40 minutes before a human answered", flashpoints: ["chatbot-loop"], format: "video" },
  ],
  insurance: [
    { text: "denied my claim for 'pre-existing' and won't say which one", flashpoints: [], format: "video" },
    { text: "raised my premium 40% with a clean record", flashpoints: ["rate-hikes"], format: "receipts" },
    { text: "took 97 days to approve a claim their own adjuster called 'clear-cut'", flashpoints: ["wait-times"], format: "quick-take" },
    { text: "canceled my policy by email 2 days before a storm", flashpoints: [], format: "video" },
    { text: "billed me for a visit they told me was covered", flashpoints: ["refund-runaround"], format: "receipts" },
  ],
  streaming: [
    { text: "made canceling a 6-step maze with a guilt-trip on step 4", flashpoints: ["hidden-cancellation-fees"], format: "video" },
    { text: "raised the price the same week they added ads to the 'ad-free' tier", flashpoints: ["rate-hikes"], format: "quick-take" },
    { text: "billed me for 3 months after I canceled", flashpoints: ["hidden-cancellation-fees", "refund-runaround"], format: "receipts" },
    { text: "merged two logins and lost my whole watch history", flashpoints: [], format: "quick-take" },
    { text: "charged a 'convenience fee' to use their own app", flashpoints: ["junk-fees"], format: "receipts" },
  ],
  retail: [
    { text: "shipped an empty box and called it 'delivered'", flashpoints: ["refund-runaround"], format: "video" },
    { text: "refunded store credit for a card purchase, no explanation", flashpoints: ["refund-runaround"], format: "receipts" },
    { text: "restocking fee on an item that arrived broken", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "canceled my order after charging me, then resold it higher", flashpoints: [], format: "quick-take" },
    { text: "customer service closed the chat mid-sentence, twice", flashpoints: ["chatbot-loop"], format: "video" },
  ],
  rideshare: [
    { text: "charged a 'safety fee' for a driver who never showed", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "delivery fee, service fee, then a fee for the fees", flashpoints: ["junk-fees"], format: "quick-take" },
    { text: "canceled after I waited 22 minutes, kept the cancellation fee", flashpoints: ["hidden-cancellation-fees"], format: "video" },
    { text: "food arrived cold, 'refund' was account credit only", flashpoints: ["refund-runaround"], format: "receipts" },
    { text: "surge priced a 6-minute ride to $41", flashpoints: ["rate-hikes"], format: "quick-take" },
  ],
  utilities: [
    { text: "estimated bill was double the actual usage, for 4 months straight", flashpoints: [], format: "receipts" },
    { text: "shut off service over a $12 discrepancy they later admitted was theirs", flashpoints: [], format: "video" },
    { text: "reconnection fee for an outage they caused", flashpoints: ["junk-fees"], format: "receipts" },
    { text: "billed for a smart meter I never received", flashpoints: [], format: "quick-take" },
    { text: "raised rates mid-contract and called it an 'adjustment'", flashpoints: ["rate-hikes"], format: "video" },
  ],
};

export const HANDLE_PREFIXES = [
  "Rage", "Torch", "Feral", "Petty", "Salt", "Blaze", "Grudge", "Static",
  "Wrecked", "Molten", "FedUp", "Last", "Loud", "Sharp", "Bitter", "Vocal",
  "Iron", "Wild", "Cold", "Night", "Prime", "Quiet", "Scorched", "Public",
];

export const HANDLE_NOUNS = [
  "Customer", "Receipt", "Refund", "Complaint", "Instigator", "Witness",
  "Insider", "Regular", "Watchdog", "Menace", "Rider", "Juror", "Arsonist",
  "Auditor", "Voice", "Flame", "Signal", "Record", "Verdict", "Ledger",
];

export const SQUAD_NAMES = [
  "The Refund Militia",
  "Fee Free or Die",
  "The Chargeback Collective",
  "Hold Music Haters",
  "Squad Nuclear",
  "Petty But Organized",
  "The Fine Print Society",
  "Receipts or It Didn't Happen",
];

export const TORCH_DEFS: { id: string; name: string; description: string; icon: string }[] = [
  { id: "first-torch", name: "First Torch", description: "A Blowup you started reached Viral.", icon: "flame" },
  { id: "mob-starter", name: "Mob Starter", description: "Five people piled on within the first hour of your post.", icon: "users" },
  { id: "giant-slayer", name: "Giant Slayer", description: "A Blowup you started took a major company to Nuclear.", icon: "swords" },
  { id: "boycott-captain", name: "Boycott Captain", description: "The Pledge count on a Blowup you started crossed 1,000.", icon: "shield" },
  { id: "repeat-offender", name: "Repeat Offender", description: "Three of your Blowups have hit Trending or higher.", icon: "repeat" },
  { id: "night-shift", name: "Night Shift", description: "Your post started climbing between midnight and 6 a.m.", icon: "moon" },
  { id: "squad-goals", name: "Squad Goals", description: "Your Squad pushed a Blowup to Blown Up together.", icon: "target" },
  { id: "pattern-spotter", name: "Pattern Spotter", description: "You tagged a Blowup into a Flashpoint before it had five other companies in it.", icon: "radar" },
];

export const QUICK_TAKE_OPENERS = [
  "PSA:",
  "Not me sitting here mad because",
  "Update:",
  "Cool, love this, very normal that",
  "Genuinely asking why",
  "Three months later and",
  "For the people in the back —",
];

export const BODY_CLOSERS = [
  "Posting this so the next person doesn't get blindsided.",
  "Called twice. Same script both times.",
  "Receipts below.",
  "This is apparently \"policy.\"",
  "Third time this year.",
  "Not the first time either.",
  "Asked for a supervisor. Got the same answer, slower.",
  "Saving everyone else the phone call.",
];

export const RECEIPT_LABELS = [
  "ORDER_CONFIRMATION.PNG",
  "CHAT_TRANSCRIPT.PNG",
  "INVOICE.PDF",
  "EMAIL_THREAD.PNG",
  "STATEMENT.PNG",
  "CANCELLATION_NOTICE.PNG",
  "CALL_LOG.PNG",
  "DENIAL_LETTER.PNG",
  "BILLING_HISTORY.PNG",
];

export const COMMENT_LINES = [
  "same thing happened to me last month",
  "THIS. exact same script word for word",
  "the fact that this is normal to them is insane",
  "adding my receipts to this thread",
  "I called about this exact issue yesterday",
  "screenshotting this for when I cancel",
  "welcome to the club unfortunately",
  "this needs to be higher",
  "reported the same thing, got the same non-answer",
  "how is this still legal",
  "piled on. this is the third one of these I've seen this week",
  "same company, different city, same exact fee",
];

export const COMPANY_REPLY_LINES = [
  "We take every customer concern seriously and encourage you to reach out to our support team directly.",
  "We're sorry to hear about your experience. A member of our team will follow up.",
  "This does not reflect the experience we aim to provide. Please send us your account details.",
  "Thanks for the feedback — we're always working to improve.",
];
