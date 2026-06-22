/**
 * Single source of truth for all marketing copy. Voice shifts by audience
 * (patient = warm, clinician = terse, payer = ₹-anchored) per the design doc.
 * Stats are real, sourced problem data only — no invented product metrics.
 */

export const SITE = {
  name: 'Nexara',
  tagline: 'Connecting every link in the care chain — from first symptom to long-term adherence.',
  description:
    'Nexara is the connective tissue of healthcare for India — one FHIR-native record with four intelligent layers that route, match, coordinate and retain care.',
} as const;

export const NAV_LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#layers', label: 'Platform' },
  { href: '#personas', label: 'Who it serves' },
  { href: '#trust', label: 'Trust & safety' },
  { href: '#roadmap', label: 'Roadmap' },
] as const;

export const HERO = {
  eyebrow: 'The connective tissue of healthcare for India',
  title: ['Connecting every link', 'in the care chain.'],
  sub: 'Not a symptom checker. Not a booking tool. Nexara is one FHIR-native record with four intelligent layers — so every encounter is smarter than the last, from first symptom to long-term adherence.',
  primaryCta: 'Request access',
  secondaryCta: 'See how it works',
  // The Golden Thread: discrete care points the continuous line connects.
  thread: ['Symptom', 'Triage', 'Booking', 'Care team', 'Adherence'],
  trustStrip: ['FHIR-native', 'ABDM-connected', 'India-hosted', 'Free for patients'],
} as const;

export const PROBLEM = {
  eyebrow: 'Why Nexara',
  title: 'Care in India works in fragments. The patient is left to connect them.',
  body: 'A symptom, a search, the wrong specialist, a queue, a prescription, a follow-up that never happens — each link works alone, and the patient becomes their own navigator. The cost of that disconnection is measurable.',
  stats: [
    {
      value: '~2',
      unit: 'min',
      label: 'the average primary-care consultation in India — too little time to start from scratch.',
      source: 'BMJ Open, 2017',
    },
    {
      value: '~80',
      unit: '%',
      label: 'shortfall of specialists at rural community health centres — the right door is rarely near.',
      source: 'Rural Health Statistics, MoHFW',
    },
    {
      value: '101',
      unit: 'M',
      label: 'Indians live with diabetes, with 136M more on the edge — chronic care can’t be a one-time event.',
      source: 'ICMR-INDIAB, Lancet 2023',
    },
    {
      value: '1',
      unit: 'record',
      label: 'is what’s missing. Your history is scattered across clinics that never talk to each other.',
      source: 'The case for ABDM',
    },
  ],
} as const;

export const LAYERS = {
  eyebrow: 'The platform',
  title: 'One record. Four intelligent layers.',
  sub: 'Each layer acts on the same longitudinal record — and writes back to it. That compounding is the defensibility.',
  items: [
    {
      n: '01',
      icon: 'Route',
      name: 'Routing',
      tag: null as string | null,
      body: 'Get the patient to the right door. Conversational AI triage maps symptoms to a specialty and urgency — decision support, never a diagnosis.',
    },
    {
      n: '02',
      icon: 'MapPin',
      name: 'Matching',
      tag: null,
      body: 'Book the right professional. Geofenced discovery, verified profiles, live queue and ETA, fee transparency — booking that respects the patient’s time.',
    },
    {
      n: '03',
      icon: 'Users',
      name: 'Coordination',
      tag: null,
      body: 'Keep the care team in sync. An EHR-embedded Care Team Hub, a pharmacist console with interaction alerts, and referral loops that actually close.',
    },
    {
      n: '04',
      icon: 'Activity',
      name: 'Retention',
      tag: 'The moat',
      body: 'Diagnose why care breaks down and fix it. The Root Cause Engine surfaces adherence barriers and PDC — turning one-time visits into lasting outcomes.',
    },
  ],
} as const;

export const PERSONAS = {
  eyebrow: 'One record, four surfaces',
  title: 'Everyone sees the same picture — in their own language.',
  sub: 'A shared component library and tokens render four surfaces from one record. The voice changes with the reader.',
  items: [
    {
      icon: 'Smartphone',
      persona: 'Patient',
      surface: 'Mobile app',
      jtbd: 'Get me to the right care without making me my own navigator.',
      image: '/images/patient-app.jpg',
      alt: 'A person using a phone to find and book care',
    },
    {
      icon: 'Stethoscope',
      persona: 'Provider',
      surface: 'Care Team Hub · EHR-embedded',
      jtbd: 'Why this patient, why now — full context before they sit down.',
      image: '/images/consult-pair.jpg',
      alt: 'A clinician reviewing a patient’s history during a consultation',
    },
    {
      icon: 'Pill',
      persona: 'Pharmacist',
      surface: 'Console + structured alerts',
      jtbd: 'Surface the interaction and the adherence barrier so I act in one call.',
      image: '/images/pharmacist-a.jpg',
      alt: 'Medication on a pharmacy counter',
    },
    {
      icon: 'BarChart3',
      persona: 'Payer / Admin',
      surface: 'Population dashboard',
      jtbd: 'Adherence, referral completion and Star-rating impact — in ₹.',
      image: '/images/data-care.jpg',
      alt: 'An analytics dashboard showing population health metrics',
    },
  ],
} as const;

export const THREAD = {
  eyebrow: 'The Golden Thread',
  title: 'A single living record that compounds with every encounter.',
  sub: 'Four data streams, written back to one longitudinal record. No single screen is the moat — their compounding is.',
  streams: [
    { name: 'Routing signal', body: 'Symptom → specialty patterns sharpen triage over time.' },
    { name: 'Matching signal', body: 'Discovery, queues and bookings reveal real access and supply.' },
    { name: 'Coordination signal', body: 'Care-team threads and referrals map how care actually flows.' },
    { name: 'Retention signal', body: 'Adherence and PDC expose where — and why — care drops off.' },
  ],
} as const;

export const TRUST = {
  eyebrow: 'Trust & safety',
  title: 'Built for the most regulated industry in India — by design.',
  sub: 'These aren’t features bolted on later. They’re invariants the product is built around.',
  invariants: [
    { icon: 'ShieldCheck', tone: 'success', label: 'AI never diagnoses', detail: 'Decision support only — routes to a specialty, never names a condition. CDSCO Class A.' },
    { icon: 'Siren', tone: 'danger', label: 'Deterministic emergency path', detail: 'A bilingual, negation-aware interceptor runs before the LLM. On match: 112 & 108, nearest ER.' },
    { icon: 'EyeOff', tone: 'info', label: 'No PII to the model', detail: 'Only symptom text reaches triage — never name, phone, ABHA or address. In-region LLM preferred.' },
    { icon: 'FileCheck2', tone: 'success', label: 'Consent is a hard wall', detail: 'Explicit, purpose-specific, withdrawable. Immutable consent receipt. Minors need verifiable parental consent (DPDP).' },
    { icon: 'MapPinned', tone: 'info', label: 'India-only residency', detail: 'All patient and clinical data stored and processed in-region (ap-south). RBI-localized payments.' },
    { icon: 'ScrollText', tone: 'warning', label: 'CERT-In logging', detail: 'Append-only audit, 6-hour incident reporting, 180-day logs in India — with no clinical content.' },
  ],
} as const;

export const MODEL = {
  eyebrow: 'Business model',
  title: 'Free at the point of use. Patients are never billed.',
  sub: 'Care should never be gated behind a patient’s wallet. Five B2B buyers fund the network — each paying for the data stream they value.',
  buyers: [
    { icon: 'Hospital', name: 'Providers', body: 'Queue and practice SaaS that gives clinicians their time back.' },
    { icon: 'ShieldPlus', name: 'Payers', body: 'Adherence and Star-rating lift, measured in ₹ and outcomes.' },
    { icon: 'FlaskConical', name: 'Pharma', body: 'Real-world adherence and access signal — privacy-preserving.' },
    { icon: 'Building2', name: 'Hospitals', body: 'Referral capture and care-continuity across the network.' },
    { icon: 'Microscope', name: 'Diagnostics', body: 'Right-test routing and closed-loop result delivery.' },
  ],
} as const;

export const ROADMAP = {
  eyebrow: 'Roadmap',
  title: 'A wedge that compounds into infrastructure.',
  phases: [
    { phase: 'Phase 0', name: 'Foundation', wedge: false, body: 'Design system, brand and the connective-tissue thesis. Live now.', status: 'Now' },
    { phase: 'Phase 1', name: 'The MVP wedge', wedge: true, body: 'Triage → specialty → geofenced discovery → booking → clinic queue. FHIR record + ABHA + consent from day one.', status: 'Building' },
    { phase: 'Phase 2', name: 'Coordination', wedge: false, body: 'Care Team Hub (EHR-embedded), pharmacist console, drug-interaction alerts, ABDM HIP (FHIR R4).', status: 'Next' },
    { phase: 'Phase 3', name: 'Retention — the moat', wedge: false, body: 'Root Cause Engine (adherence / PDC), payer & population dashboard, ABDM HIU consent-managed record pull.', status: 'Later' },
  ],
} as const;

export const CTA = {
  eyebrow: 'Early access',
  title: 'Help build the connective layer for Indian healthcare.',
  sub: 'Nexara is being built. We’re onboarding founding providers, payers and clinical partners.',
  primary: 'Request access',
  secondary: 'Read the vision',
} as const;

export const FOOTER = {
  blurb: 'The connective tissue of healthcare for India. Currently being built — early access opening soon.',
  groups: [
    { title: 'Platform', links: [
      { label: 'Routing', href: '#layers' },
      { label: 'Matching', href: '#layers' },
      { label: 'Coordination', href: '#layers' },
      { label: 'Retention', href: '#layers' },
    ]},
    { title: 'Company', links: [
      { label: 'The problem', href: '#problem' },
      { label: 'Who it serves', href: '#personas' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: 'Request access', href: '#cta' },
    ]},
    { title: 'Trust', links: [
      { label: 'Trust & safety', href: '#trust' },
      { label: 'Business model', href: '#model' },
      { label: 'The Golden Thread', href: '#thread' },
    ]},
  ],
  compliance: 'DPDP Act 2023 · ABDM-aligned · CDSCO SaMD Class A · CERT-In · India data residency',
} as const;
