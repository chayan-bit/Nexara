# Nexara — Project Context (CLAUDE.md)

> Persistent context for the **Nexara Health** platform. Read this before any product work.
> This file is **project-specific**; the global rules in `~/.claude/CLAUDE.md` and `~/.claude/rules/common/`
> (immutability, KISS/DRY/YAGNI, many-small-files, TDD ≥80%, conventional commits, Nix-only, security,
> mgrep-first search) **all still apply** and are not repeated here.
>
> **Source of truth for the full vision:** `Nexara_landing_page/design/DESIGN_DOC.md`. Where any plan and the
> design doc disagree, the **design doc wins** — it describes the whole ecosystem; narrower plans are slices of it.

---

## 1. What Nexara is

Nexara is the **connective tissue of healthcare for the Indian market** — *not* a symptom checker, *not* a
booking tool, *not* an adherence app, but the layer that makes all of them work together over **one longitudinal
patient record (the "Golden Thread")**. Tagline: *Connecting every link in the care chain — from first symptom to
long-term adherence.*

Structurally: **one FHIR-native record with four intelligent layers acting on it, surfaced to four personas.**

### The four layers
1. **Routing** — get the patient to the right door (AI Triage → specialty).
2. **Matching** — book the right professional (geofenced discovery, live queue/ETA, booking).
3. **Coordination** — keep the care team in sync (Care Team Hub, EHR-embedded; pharmacist console; referral loops).
4. **Retention** — diagnose *why* care breaks down and fix it (**Root Cause Engine** — adherence/PDC). **This is the moat.**

Everything writes back to the **Golden Thread**, the single living record that makes each encounter smarter than
the last. Defensibility is the *compounding* of these four data streams against one record — not any single screen.

### Positioning guardrails (do not violate)
- **Not a diagnosis engine.** Decision support, human-in-the-loop. The AI routes to a *specialty*; it never names a
  condition or prescribes. (Keeps us CDSCO SaMD **Class A**, not B/C/D.)
- **Not a walled garden.** FHIR-native, ABDM-connected, EHR-embeddable.
- **Free at point of use.** Patients are **never billed**. Five **B2B buyers pay**: providers (queue/practice SaaS),
  payers (adherence/Star-ratings), pharma, hospitals, diagnostics.
  → A patient subscription ("Health One") contradicts this; treat it as **cut/deferred**, not a v1 feature.

### Four personas → four surfaces (one shared component library + tokens)
| Persona | Job-to-be-done | Surface |
|---|---|---|
| **Patient** | Get me to the right care without becoming my own navigator | Mobile app (native) |
| **Provider** | Tell me why this patient is here, with full context, before they sit down | Care Team Hub (web, EHR-embedded) |
| **Pharmacist** | Surface interaction + adherence barrier so I act in one call | Console + structured alerts |
| **Payer/Admin** | Show adherence, referral completion, Star-rating impact in ₹ | Population dashboard (BI) |

---

## 2. Current repo state

```
Nexara/                         ← project root (this CLAUDE.md governs everything below)
├── CLAUDE.md                   ← you are here
├── pitch_styled.pdf            ← Series A pitch
└── Nexara_landing_page/        ← git repo (branch: main)
    ├── site/                   ← marketing landing page: Vite + React 19 + TS (NOT the product app)
    ├── design/
    │   ├── DESIGN_DOC.md        ← CANONICAL product + design system spec
    │   └── tokens/              ← nexara-tokens.css + tailwind.theme.js (1:1 with Figma vars)
    └── ads/                     ← adherence awareness ad creatives (HTML→PNG pipeline)
```

The **product platform does not exist as code yet.** When it starts, it will be new app(s)/services under
`Nexara/` (e.g. `apps/patient`, `apps/care-hub`, `services/api`, `services/fhir`), inheriting this file.
The landing page (`Nexara_landing_page/site`) stays a separate, simple Vite app.

---

## 3. Build phasing (roadmap)

- **Phase 0 (done / in progress):** landing page + design system + pitch.
- **Phase 1 — MVP wedge (Layers 1–2):** Patient AI triage → specialty → geofenced doctor discovery → booking →
  **clinic queue portal**. Foundation laid on day one: FHIR record + ABHA (ABDM M1) linking + consent service.
  *This is where the original "Master Plan" P0/P1 features live.*
- **Phase 2 — Coordination (Layer 3):** Care Team Hub (EHR-embedded), pharmacist console, drug-interaction alerts,
  trust/verification, HIP (ABDM M2 — FHIR R4 care contexts).
- **Phase 3 — Retention (Layer 4, the moat):** Root Cause Engine (adherence/PDC), payer/population dashboard,
  HIU (ABDM M3 — consent-managed record pull).

---

## 4. MVP feature set (Phase 1) — with corrections baked in

P0 (must ship): **(1)** Conversational AI Symptom Analyzer · **(2)** Symptom→Specialty routing ·
**(3)** Geofenced doctor discovery · **(4)** Unified search + sticky filter pills · **(5)** Live wait-times/queue.
P1: **(6)** Granular trust/verification · **(7)** Booking + fee transparency.
P2: **(9)** ABHA linking · **(10)** Doctor dashboard. **(8)** Patient subscription = **cut/deferred** (see §1).

Interaction patterns are *modeled on* Swiggy/Zomato/Ada (delayed GPS, sticky pills, transaction-gated reviews,
fee-on-card, conversational triage). **Do not** write "copied from / identical to X" in code or docs — model the
*principle*, not the brand.

---

## 5. HARD INVARIANTS (compliance- & safety-driven — never violate)

These are non-negotiable. A change that breaks one of these is a **CRITICAL** review block.

1. **The AI never diagnoses, prescribes, or counsels.** It outputs `{ specialty, urgency, followUpQuestion?,
   triageComplete }` only. All UI/prompt copy uses *"may suggest consulting a [specialty]"* — never *"you may have
   [condition]"*. (CDSCO Class A boundary; TPG 2020.)
2. **Emergency path is life-safety, not best-effort.** A **deterministic, bilingual (English + Hindi/Hinglish),
   negation-aware** interceptor runs **before** the LLM; the LLM **also** independently flags emergencies. On match:
   halt chat, full-screen red card, show **112 and 108** + nearest-ER directions. Never gate this behind the LLM
   being up. Regex alone is insufficient.
3. **No PII to the model.** Only symptom text reaches the triage LLM — never name, phone, ABHA, address. If using a
   non-India-hosted model, PII-stripping + signed DPA + explicit consent are mandatory. Prefer **in-region LLM**.
4. **Consent gate is a hard wall.** No health data is processed until **explicit, purpose-specific, withdrawable**
   consent is captured as an **immutable consent receipt** (timestamp, policy version, IP). Granular & independently
   revocable: (a) triage, (b) share results with doctor, (c) store records. Withdrawal → deletion within 30 days
   (minus legal-retention records).
5. **Minors require verifiable parental consent** (DPDP, under-18). Pediatric/child bookings cannot proceed without
   it. (The "young parents" persona makes this load-bearing.)
6. **Data residency: India only.** All patient/clinical data stored and processed in India (e.g. `ap-south`).
   Payment data RBI-localized. CERT-In logs in Indian jurisdiction. Pin every vendor to an India region or self-host;
   no silent cross-border egress.
7. **Reviews are transaction-gated** (valid completed-appointment ID required) **and** carry doctor right-to-respond +
   moderation + takedown (defamation exposure in India).
8. **Separate clinical content from security telemetry.** Symptom/triage *content* retention = **90 days** then
   anonymize. CERT-In security *logs* = **180 days** but must contain **no health content**. Appointment records =
   **3 years**. Never let symptoms leak into the 180-day security logs.
9. **Marketplace stance.** Nexara facilitates; doctors are independent RMPs who set their own fees/schedules and own
   medical judgment. Avoid product choices that read as "virtual hospital" control (vicarious-liability risk).

---

## 6. Regulatory map (what touches the code)

Healthcare is criminally-regulated in India. Applies by phase:

- **v1 (discovery/booking marketplace):** **DPDP Act 2023** (consent, minimization, erasure, retention, minors,
  breach notice — verify against the latest notified **DPDP Rules**, which tighten breach timelines) · **IT Act 2000 +
  SPDI Rules 2011** (health = Sensitive Personal Data; ISO 27001-aligned "reasonable security"; published privacy
  policy + grievance officer) · **CERT-In Directions 2022** (6-hour incident reporting, 180-day logs in India,
  NTP to NIC/NPL, registered PoC) · **Consumer Protection Act 2019 + E-Commerce Rules 2020** (marketplace clarity,
  grievance redressal 48h ack / 1-month resolve, display NMC reg #/qualifications/fee/address, label sponsored
  listings, no unfair trade practices).
- **When teleconsult is added (later):** **TPG 2020** (RMP-only, AI may not diagnose/prescribe, identity verification,
  informed consent, 3-year consult records, fee transparency, limitation disclaimers). **TPG does not govern a pure
  discovery/booking v1** — do not over-build consult-record retention before consults exist.
- **CDSCO MDR 2017 (SaMD):** stay **Class A** (information/routing). Any "your symptoms suggest condition X" wording
  pushes to Class B (MD-5 licensing) — forbidden.
- **ABDM:** M1 ABHA (Phase 1) → M2 HIP / FHIR R4 care contexts (Phase 2) → M3 HIU / consent manager (Phase 3);
  register HPR (doctors) + HFR (facilities); CERT-In-empanelled audit before any ABDM-connected feature.

**NMC verification:** manual NMC online-register lookup for MVP (note: brittle, ToS-sensitive — don't scrape at
scale); the sanctioned path is **HPR via ABDM**. The verified badge must not imply Nexara endorses *competence*.

---

## 7. Security architecture (baseline)

- **Encryption:** TLS 1.3 + HSTS in transit; AES-256 at rest; **application-layer envelope encryption (cloud KMS)** on
  sensitive columns (symptoms, conditions); backups encrypted with a separate key, India-only.
- **Access:** RBAC (patient/doctor/admin/support, least-privilege) + **Row-Level Security** (patients see only their
  own records; doctors see only their booked patients) enforced **at the DB**. Admin = MFA + fully audited; no direct
  prod DB access (all via audited API).
- **Audit:** append-only (S3 Object-Lock / WORM, ap-south). Log authn events, data access, data modifications, API
  requests (IP/UA/ts), and triage routing — honoring the §5.8 content/telemetry split.
- **App-sec:** input sanitization (symptoms validated against a whitelist), rate limits (triage 10/min, search 30/min,
  OTP 5/10min), CSRF (SameSite + tokens), `npm audit` + Snyk in CI (zero-critical policy), secrets only in
  KMS/secrets-manager (never in code).
- **Infra:** India region only · WAF + DDoS at the edge · annual third-party pentest · documented incident runbook
  (detect → contain → CERT-In ≤6h → notify users → remediate → post-mortem).

---

## 8. Architecture — OPEN DECISIONS (choose; nothing here is locked)

The earlier toy stack (Next.js/Vercel/Supabase/Prisma/OpenAI) is acceptable for the **landing page only**. The
**platform** stack is being chosen deliberately. Each row lists options + the current recommended default; **mark a
row LOCKED here once decided.**

| # | Decision | Recommended default | Alternatives | Status |
|---|---|---|---|---|
| 1 | Clinical core / Golden Thread | **Hybrid:** Postgres (operational) + **Medplum** FHIR R4 system-of-record, self-hosted ap-south | HAPI FHIR (Java); Postgres-only w/ FHIR export facade | **OPEN** |
| 2 | Cloud / region | **Azure India** (Azure OpenAI in-region) | AWS Mumbai ap-south-1; GCP Mumbai; sovereign (Yotta/CtrlS) | **OPEN** |
| 3 | Backend / API | **NestJS** (TS, modular-by-layer) | Fastify+tRPC; Go for geo/queue services | **OPEN** |
| 4 | Patient app | **Expo / React Native** (enables geofencing, push, ABHA) | Flutter; PWA-only *(forfeits passive queue)* | **OPEN** |
| 5 | Web surfaces | **Next.js App Router** (public/SEO + patient-web) + Vite SPA for internal dashboards | Remix/RR7; all-Next.js | **OPEN** |
| 6 | Primary DB | **Postgres 16 + PostGIS + pgvector + Redis** | Neon/Azure Flexible; + Kafka/Redpanda later | **OPEN** |
| 7 | ORM | **Drizzle** | Prisma; Kysely | **OPEN** |
| 8 | Triage LLM | **Azure OpenAI India** or **Sarvam** (Hindi) | self-host Llama/Mistral ap-south; hosted OpenAI/Gemini w/ PII-strip+DPA | **OPEN** |
| 9 | Auth | **Phone-OTP via MSG91/Gupshup** (DLT-registered) + own session; **SMART-on-FHIR/OIDC** for clinician EHR launch | Supabase Auth (ap-south); Clerk/Firebase *(check residency)* | **OPEN** |
| 10 | Realtime | **SSE** (ETA) + **WebSocket** (Care Hub) over Redis pub/sub | Supabase Realtime; Ably; Pusher | **OPEN** |
| 11 | Maps / geocoding | **Mappls (MapmyIndia)** or **Ola Maps** (residency + cost; PostGIS does radius) | Google Maps; Mapbox + OSM/Nominatim | **OPEN** |
| 12 | Payments (B2B/SaaS; patients free) | **Razorpay** or **Cashfree** (RBI-localized) | PhonePe PG; Juspay; none if fully patient-free | **OPEN** |
| 13 | Interop | **FHIR R4** + ABDM Sandbox (ABHA→HIP→HIU); HPR + HFR | — | baseline |
| 14 | Cross-cutting | Terraform · GitHub Actions · OpenTelemetry+Grafana(LGTM) · Sentry(self/EU) · next-intl (Hindi) · feature flags | Datadog (region-pinned) | **OPEN** |

### Engine specifics (apply once the stack is chosen)
- **Triage flow:** input → deterministic emergency interceptor (bilingual, negation-aware, <1ms; LLM not called on
  match) → in-region LLM with triage system prompt → structured JSON → loop on `followUpQuestion` until
  `triageComplete` → route to discovery with specialty pre-filled. **Fallback:** static decision-tree (body-part →
  symptom → specialty) when LLM is down or >5s, or whenever SaMD-safety demands determinism. Session context is
  **ephemeral** (per-session only; discarded after triage) — *not* "stateless" (each turn needs prior answers).
- **Symptom→specialty:** **curated symptom lexicon (normalized phrases) + pgvector embedding retrieval + LLM
  arbitration** for ambiguous queries. **Not** "ICD-10 symptom codes" (ICD is a diagnosis taxonomy; ABDM uses FHIR
  R4 + ICD-11 for the *record*, not the input map). Bilingual (Hindi/Hinglish) coverage is in-scope work, not free.
- **Queue/ETA:** **primary signal = "+1 Walk-in" button + doctor-declared average consult length**; cold-start ETA =
  `patients_ahead × avg_consult`. Passive geofenced timing is a **native-app enhancement**, never the web baseline.
  Live updates via SSE.

---

## 9. Design system binding

All product UI binds to the existing system (`design/DESIGN_DOC.md` + `design/tokens/`). **No hardcoded
fills/spacing/radius** — use tokens.

- **Palette:** brand `--nx-teal-700 #0E7C7B` (actions) · hover `--nx-teal-900 #0B5C5A` · accent `--nx-mint-500
  #3FBFB6` · subtle `--nx-mint-50 #E6F4F3` · text `--nx-charcoal-900 #1F2933` / `--nx-slate-500 #5B6B79` · border
  `--nx-gray-200 #E2E8ED`. **Status (distinct from brand):** success `#1E9E6A` · warning `#E0A100` · danger `#D64545`
  · info `#2D7FF0` — **always icon+label, never color alone** (color-blind = clinical-error safety).
- **Type:** Inter. Display/XL 48 · Heading 32/24/18 · Body 16/14 · Label 14 · Caption 12 · Overline 11.
- **Foundations:** 8px grid (4px half-step for dense BI) · radius 8 cards / 12 modals / 999 pills · restrained
  elevation (prefer subtle surfaces + hairline borders over heavy shadows).
- **Cross-surface principles:** context before action · the patient is never the messenger (coordination happens
  between professionals) · color carries meaning not decoration · auditable by design · the patient surface must
  never feel like enterprise software.
- **Accessibility:** WCAG **AA** (4.5:1 body, 3:1 large/UI).
- **Logo:** connected-node "N" — no gradients/shadows on the mark. **No AI-slop aesthetic anywhere** (no gradients,
  glows, glassmorphism, grain, floating node-clouds) — see the ad-creative direction memory.

---

## 10. Engineering conventions (project-specific additions)

Global rules apply (TDD ≥80%, immutability, many-small-files <800 lines / functions <50, conventional commits,
mgrep-first search, research-before-build). On top of those, for Nexara:

- **TDD is mandatory for clinical logic** — emergency interceptor, triage routing, consent gate, RLS policies, and
  retention jobs get tests first, including adversarial cases (negation, Hinglish, minors, consent withdrawal).
- **i18n from day one** (English + Hindi/Hinglish). No hardcoded user-facing strings.
- **Validate at every boundary**; treat all external data (LLM output, geocoding, EHR/FHIR payloads) as untrusted.
- **Compliance-as-code:** consent service, retention/erasure jobs, PII-stripping LLM gateway, and audit logging are
  first-class modules, not afterthoughts.
- **Money & PHI changes are security-sensitive** → `security-reviewer` before merge.

---

## 11. Open strategic decisions (resolve before/at Phase 1 lock)

1. **Monetization:** confirm **patient-free, B2B-paid** (recommended, matches design doc). If patient billing is
   really wanted, it reopens consumer-protection + payment-localization load — decide explicitly.
2. **Web vs native patient app:** native (Expo/Flutter) is required for the headline passive-queue feature. Confirm.
3. **Hindi scope for v1:** full bilingual triage + emergency lexicon + symptom map, or "English + Hinglish-tolerant"?
   This is real scope, not a toggle.
4. **Cloud + LLM residency pairing** (rows 2 & 8): Azure-India-with-Azure-OpenAI is the cleanest residency story.
5. **FHIR core vs FHIR-facade** (row 1): adopting a FHIR system-of-record early is more work now but de-risks ABDM
   M2/M3 and the Golden Thread later.

> Update §8 statuses and §11 as decisions are made. Keep this file the single place a new contributor (or Claude)
> can read to understand *what Nexara is and what must never break.*
