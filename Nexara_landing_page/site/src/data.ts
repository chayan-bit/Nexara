// Content model for the Nexara design doc — sourced from design/DESIGN_DOC.md.

export const NAV = [
  { id: "vision", label: "Vision" },
  { id: "personas", label: "Personas" },
  { id: "brand", label: "Brand" },
  { id: "components", label: "Components" },
  { id: "screens", label: "Screens" },
  { id: "foundations", label: "Foundations" },
];

export const LAYERS = [
  {
    n: "01",
    name: "Routing layer",
    feature: "AI Triage",
    body: "Gets the patient to the right door — natural-language intake mapped to a care pathway, never a diagnosis.",
  },
  {
    n: "02",
    name: "Matching layer",
    feature: "Smart Provider Matching",
    body: "Books the right professional for the pathway, factoring specialty, urgency tier, and availability.",
  },
  {
    n: "03",
    name: "Coordination layer",
    feature: "Care Team Hub",
    body: "Keeps GP, specialist and pharmacist in sync in-workflow — the patient is never the messenger.",
  },
  {
    n: "04",
    name: "Retention layer",
    feature: "Root Cause Engine",
    body: "Diagnoses why care breaks down and fixes it — adherence barriers surfaced and acted on.",
  },
];

export const PERSONAS = [
  {
    role: "Patient",
    job: "Get me to the right care without becoming my own navigator.",
    surface: "Mobile app",
    good: "Calm, guided, never repeats history.",
    accent: "var(--nx-accent-mint)",
  },
  {
    role: "Provider",
    job: "Tell me why this patient is here, with full context, before they sit down.",
    surface: "Care Team Hub · EHR-embedded",
    good: "Context-first, low-click, in-workflow.",
    accent: "var(--nx-teal-700)",
  },
  {
    role: "Pharmacist",
    job: "Surface the interaction + adherence barrier so I act in one call.",
    surface: "Console + structured alerts",
    good: "Actionable, structured, one-click.",
    accent: "var(--nx-status-info)",
  },
  {
    role: "Payer / Admin",
    job: "Show adherence, referral completion, Star-rating impact.",
    surface: "Population Dashboard",
    good: "Dense but readable BI; outcomes in dollars.",
    accent: "var(--nx-teal-900)",
  },
];

export const SWATCHES = [
  { token: "--nx-teal-700", name: "Teal 700", hex: "#0E7C7B", role: "Primary brand & actions", onDark: true },
  { token: "--nx-teal-900", name: "Teal 900", hex: "#0B5C5A", role: "Hover / depth / headings", onDark: true },
  { token: "--nx-mint-500", name: "Mint 500", hex: "#3FBFB6", role: "Accent, positive trend", onDark: true },
  { token: "--nx-mint-50", name: "Mint 50", hex: "#E6F4F3", role: "Surfaces, selected rows", onDark: false },
  { token: "--nx-charcoal-900", name: "Charcoal 900", hex: "#1F2933", role: "Primary text", onDark: true },
  { token: "--nx-slate-500", name: "Slate 500", hex: "#5B6B79", role: "Secondary text, labels", onDark: true },
  { token: "--nx-gray-200", name: "Gray 200", hex: "#E2E8ED", role: "Borders, dividers", onDark: false },
  { token: "--nx-white", name: "White", hex: "#FFFFFF", role: "Base surface", onDark: false },
];

export const STATUS = [
  { token: "--nx-status-success", name: "Success", hex: "#1E9E6A" },
  { token: "--nx-status-warning", name: "Warning", hex: "#E0A100" },
  { token: "--nx-status-danger", name: "Danger", hex: "#D64545" },
  { token: "--nx-status-info", name: "Info", hex: "#2D7FF0" },
];

export const TYPE_RAMP = [
  { name: "Display / XL", spec: "700 · 48/56 · -2%", className: "t-display", sample: "Aa" },
  { name: "Heading L", spec: "600 · 32/40 · -1%", className: "t-h1", sample: "Aa" },
  { name: "Heading M", spec: "600 · 24/32 · -0.5%", className: "t-h2", sample: "Aa" },
  { name: "Heading S", spec: "600 · 18/26", className: "t-h3", sample: "Aa" },
  { name: "Body L", spec: "400 · 16/24", className: "t-body-l", sample: "The Golden Thread" },
  { name: "Body M", spec: "400 · 14/22", className: "t-body", sample: "The Golden Thread" },
  { name: "Overline", spec: "600 · 11 · +6%", className: "t-overline", sample: "Care pathway" },
];

export const SCREENS = [
  {
    id: "triage",
    label: "Patient App",
    title: "AI Triage / Intake",
    img: "/assets/04-app-triage.png",
    frame: "390 × 844 · mobile",
    portrait: true,
    points: [
      "NL symptom chat → AI Assessment card with likely pathway + urgency-tier badge.",
      "Two actions max: Primary “Book”, Secondary “Connect now”.",
      "Persistent “guidance, not diagnosis” caption. One decision per screen.",
    ],
  },
  {
    id: "hub",
    label: "Care Team",
    title: "Communication Hub",
    img: "/assets/05-care-hub.png",
    frame: "1440 × 1024 · EHR-embedded",
    portrait: false,
    points: [
      "Three columns: Golden-Thread timeline · clinician thread · record summary.",
      "Structured drug-interaction alert with one-click response buttons.",
      "Quiet audit affordance — auditability is a feature.",
    ],
  },
  {
    id: "dashboard",
    label: "Payer / Practice",
    title: "Population Dashboard",
    img: "/assets/06-payer-dashboard.png",
    frame: "1440 × 1024 · BI",
    portrait: false,
    points: [
      "KPI row: adherence rate, PDC, referral completion.",
      "PDC trend line, adherence-by-cohort bars, care-gap table.",
      "RPM billing export (CPT 99453–99458). Dense but governed by whitespace.",
    ],
  },
];

export const PRINCIPLES = [
  { t: "Context before action", d: "Every screen answers “why am I seeing this?” first." },
  { t: "The patient is never the messenger", d: "Coordination happens between professionals in-product." },
  { t: "Color carries meaning, never decoration", d: "Brand teal = chrome/actions; status colors = clinical signal." },
  { t: "Auditable by design", d: "Sensitive views expose who-saw-what." },
  { t: "Free-at-point-of-use feel", d: "The patient surface must never feel like enterprise software." },
];

export const FOUNDATION_SPECS = [
  { k: "Grid", v: "8px base · 4px half-step for dense data · 4/8/12/16/24/32/48/64" },
  { k: "Radius", v: "8 cards · 12 modals/sheets · 999 pills" },
  { k: "Elevation", v: "Restrained — prefer brand-subtle surfaces + hairline borders over heavy shadow" },
  { k: "Layout", v: "Mobile single-column · web 12-col grid with a left context rail" },
];
