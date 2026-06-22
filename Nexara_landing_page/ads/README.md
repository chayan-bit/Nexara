# Nexara — Awareness Ads

Pre-launch ad creatives for Nexara. Two sets:

- **Set A — Adherence** (`post-01` … `post-03`): the narrow Root Cause Engine / retention layer.
- **Set B — Nexara as a whole** (`post-04` … `post-10`): the connective-tissue story across all four layers (routing → matching → coordination → continuity), aimed at an **urban, can-pay** audience that can *reach* care but still fights a disconnected system — so the stats avoid affordability/poverty framing.

---

## Set A — Adherence

Pre-launch ad set for Nexara's **adherence** focus (the Root Cause Engine / retention layer).

## Creative principle

These are **awareness ads**, not product ads. Nexara's solution isn't shipped yet, so:

- ❌ **No product or outcome data** — no invented adherence rates, PDC scores, "gaps closed", etc.
- ✅ **Only real data about the *problem*** of medication non-adherence as it exists today, with sources.
- ✅ **Real photography** of clinicians and patients (Unsplash, free license).
- ✅ **Honest positioning** — Nexara is "being built" / "early access" / "the fix we're building".
- ✅ On-brand and restrained per `design/DESIGN_DOC.md` (teal/mint, Inter, flat fills, whitespace — no decorative gradients/glows).

## The set (1080×1080, exported @2× → 2160px)

| # | File | Hook | Stat | Source |
|---|------|------|------|--------|
| 01 | `out/post-01-gap.png` | The adherence gap | Fewer than 1 in 4 Indians with high BP have it under control (~22.5%) | *The Lancet Regional Health — Southeast Asia* (2022) |
| 02 | `out/post-02-chain.png` | Where care breaks down | 3 in 5 diagnosed hypertensives in India aren't on treatment (~41% on meds) | NFHS-5 |
| 03 | `out/post-03-cost.png` | The cost of chronic disease | $4.5T projected loss to chronic disease before 2030 (India) | World Economic Forum & Harvard School of Public Health (2014) |

> India-specific public-health figures about the **problem**. Keep the source line on each creative; swap in a specific citation/year if Legal/Marketing prefers.

## Set B — Nexara as a whole (1080×1080, exported @2× → 2160px)

| # | File | Layer | Hook | Stat / framing | Source |
|---|------|-------|------|----------------|--------|
| 04 | `out/post-04-door.png` | Routing | "Getting sick is easy. Knowing which doctor to see isn't." | ~80% specialist shortfall at rural CHCs | Rural Health Statistics / *Health Dynamics of India 2022–23*, MoHFW |
| 05 | `out/post-05-twomin.png` | Coordination | "Your doctor has two minutes." | India's avg primary-care consult ≈ 2 min | Irving et al., *BMJ Open* (2017) |
| 06 | `out/post-06-burden.png` | Continuity/why-now | "Chronic disease is now the everyday Indian story." | 101M with diabetes, 136M pre-diabetic | ICMR-INDIAB, *Lancet Diabetes & Endocrinology* (2023) |
| 07 | `out/post-07-thread.png` | Golden Thread | "Every clinic keeps a piece of you. None keep the whole." | fragmented records (qualitative) | ABDM rationale |
| 08 | `out/post-08-find.png` | Matching | "Book dinner in 30 seconds. The right doctor still takes days." | discovery + booking friction (qualitative) | — |
| 09 | `out/post-09-manifesto.png` | Thesis | "Healthcare isn't broken. It's disconnected." | connective-tissue manifesto | — |
| 10 | `out/post-10-brand.png` | Brand/CTA | "Connecting every link in the care chain." | four layers, one record · early access | — |

> Posts 07–10 carry **no invented numbers** — they make qualitative problem/positioning statements only (per the pre-launch rule: real *problem* data, never product/outcome metrics).

## Files

```
ads/
├── ads.css                 # shared design system (brand tokens, components)
├── post-01-gap.html        # editorial split: India BP-control stat + warm patient photo
├── post-02-chain.html      # clinician photo + teal panel + "3 in 5" stat
├── post-03-cost.html       # full-bleed pill-organizer + "$4.5T" stat
├── index.html              # gallery of all three
├── render.sh               # HTML → PNG via headless Google Chrome
├── assets/                 # downloaded Unsplash photos
└── out/                    # rendered PNGs (the deliverables)
```

## Edit & re-render

Edit the HTML/CSS, then:

```bash
# Set A
bash render.sh post-01-gap post-02-chain post-03-cost
# Set B
bash render.sh post-04-door post-05-twomin post-06-burden post-07-thread post-08-find post-09-manifesto post-10-brand
# outputs land in out/*.png at 2160×2160
```

> **Render gotcha:** if a stray desktop Chrome is open, a `--headless=new` job can finish the screenshot but not self-exit, stalling `render.sh`'s sequential loop. If a batch hangs after the first file, render the rest one at a time (each writes its PNG within ~10s, then kill the process).

Rendering uses installed Google Chrome in headless mode (no Nix package needed on macOS).
Posters read optional `data-w` / `data-h` attributes for non-square sizes (default 1080×1080).

## Photo credits

All photos from [Unsplash](https://unsplash.com) (free to use, attribution appreciated):

Set A:
- `patient-b.jpg` — hands with prescription pills — `photo-1625055929490`
- `doctor-a.jpg` — clinician portrait — `photo-1622253692010`
- `patient-a.jpg` — weekly pill organizer — `photo-1563213126`

Set B (all from Unsplash, free license):
- `place-signage.jpg` — hospital reception + floor directory (post-04)
- `consult-pair.jpg` — clinician speaking with a patient (post-05)
- `doctor-phone.jpg` — doctor checking data on a phone (post-06)
- `ward-empty.jpg` — empty hospital ward (post-07)
- `phone-maps.jpg` — finding places nearby on a phone map (post-08)
- `surgery-team.jpg` — care team working together (post-09)
- `doctor-portrait.jpg` — doctor studio portrait (post-10)

## Why this pipeline (not Figma / Higgsfield)

The connected Figma account is a **View seat** (6 MCP calls/month, exhausted) and Higgsfield is on the **free plan** (~0 credits), so both were blocked for live generation. This local HTML→Chrome pipeline produces pixel-exact, on-brand, editable creatives at no cost. If the Figma seat is upgraded later, these layouts can be rebuilt as native editable frames.
