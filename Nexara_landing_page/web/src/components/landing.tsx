'use client';

import { useEffect } from 'react';

/**
 * Native React port of the Nexara landing design (previously an HTML artifact).
 * Markup is real JSX (server-rendered for SEO); all motion/behaviour lives in the
 * effect below. Styling is the verbatim design CSS in `src/app/nexara.css`.
 */

const ARROW = (
  <svg className="arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/**
 * Nexara mark — faithful rebuild of the brand asset: an even-weight "N" made of
 * three separate rounded strokes (no fat middle, small "cuts" at the joins) with
 * a detached vertical TAB on the upper-right. Dark-teal → mint diagonal gradient.
 */
function BrandMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" role="img" aria-label="Nexara">
      <defs>
        <linearGradient id="nx-grad" x1="9" y1="31" x2="31" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B5C5A" />
          <stop offset="0.5" stopColor="#0E7C7B" />
          <stop offset="1" stopColor="#3FBFB6" />
        </linearGradient>
      </defs>
      <g stroke="url(#nx-grad)" strokeWidth="5.6" strokeLinecap="round" fill="none">
        <path d="M11 12 V27.5" />
        <path d="M12.5 13.5 L27.5 26.5" />
        <path d="M29 17 V28" />
        <path d="M29 7 V11.2" />
      </g>
    </svg>
  );
}

export function Landing() {
  useEffect(() => {
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // ---- scroll reveal (r / pop / line-mask) ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.r,.pop,.line-mask').forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // hero line-mask reveals immediately (above the fold)
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero .line-mask').forEach((el) => el.classList.add('in'));
    });

    // golden thread draw-in
    const thread = document.getElementById('thread');
    if (thread) {
      const tio = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); tio.unobserve(e.target); } }),
        { threshold: 0.4 },
      );
      tio.observe(thread);
      cleanups.push(() => tio.disconnect());
    }

    // ---- count-up ----
    function animate(el: Element) {
      const to = parseFloat(el.getAttribute('data-to') || '0');
      const prefix = el.getAttribute('data-prefix') || '';
      if (rm) { el.textContent = prefix + to; return; }
      const dur = 1200;
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(to * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const cio = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); } }),
      { threshold: 0.6 },
    );
    document.querySelectorAll('.cu').forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    // ---- scroll-driven: top progress bar + nav frosted state ----
    const nav = document.getElementById('nav');
    const prog = document.getElementById('scroll-prog') as HTMLElement | null;
    let ticking = false;
    function frame() {
      ticking = false;
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? y / docH : 0;
      if (prog) prog.style.transform = 'scaleX(' + p + ')';
      if (nav) nav.classList.toggle('scrolled', y > 12);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    frame();
    cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); });

    // ---- self-playing intro ----
    const film = document.getElementById('hero-film');
    function play() {
      if (rm || !film) return;
      film.classList.remove('playing');
      void film.offsetWidth; // reflow so the animation restarts
      film.classList.add('playing');
    }
    if (film) {
      requestAnimationFrame(play);
      const rbtn = document.getElementById('film-replay');
      if (rbtn) {
        rbtn.addEventListener('click', play);
        cleanups.push(() => rbtn.removeEventListener('click', play));
      }
    }

    // ---- platform showcase slider ----
    const track = document.getElementById('sl-track');
    const vp = document.getElementById('sl-viewport');
    const dotsWrap = document.getElementById('sl-dots');
    if (track && vp && dotsWrap) {
      const dots = Array.from(dotsWrap.querySelectorAll<HTMLElement>('.sl-dot'));
      const prevBtn = document.getElementById('sl-prev') as HTMLButtonElement | null;
      const nextBtn = document.getElementById('sl-next') as HTMLButtonElement | null;
      const count = dots.length;
      let cur = 0;
      let timer: ReturnType<typeof setInterval> | null = null;

      const paint = () => {
        track.style.transform = 'translateX(' + -cur * 100 + '%)';
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      };
      const goTo = (i: number) => { cur = (i + count) % count; paint(); };

      dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); restart(); }));
      if (prevBtn) prevBtn.addEventListener('click', () => { goTo(cur - 1); restart(); });
      if (nextBtn) nextBtn.addEventListener('click', () => { goTo(cur + 1); restart(); });

      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function start() { if (rm) return; stop(); timer = setInterval(() => goTo(cur + 1), 4200); }
      function restart() { stop(); start(); }

      // pause auto-advance on interaction / when off-screen
      vp.addEventListener('mouseenter', stop);
      vp.addEventListener('mouseleave', start);
      vp.addEventListener('focusin', stop);
      const vio = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop())), { threshold: 0.3 });
      vio.observe(vp);

      paint();
      cleanups.push(() => { stop(); vio.disconnect(); });
    }

    // ---- magnetic CTA ----
    if (!rm) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          btn.style.transform = 'translate(' + mx * 0.18 + 'px,' + my * 0.28 + 'px)';
        };
        const leave = () => { btn.style.transform = ''; };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', leave);
        cleanups.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave); });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="scroll-prog" id="scroll-prog" />

      {/* NAV */}
      <nav className="nav" id="nav" data-od-id="nav" aria-label="Primary">
        <div className="nav-inner">
          <a className="brand" href="#top"><BrandMark className="brand-mark" /> Nexara</a>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#layers">Platform</a>
            <a href="#personas">Who it serves</a>
            <a href="#trust">Trust &amp; safety</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <div className="nav-cta">
            <a href="#cta" className="btn btn-primary btn-sm" data-magnetic>Request access
              <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top" data-od-id="hero">
        <div className="hero-glow" />
        <div className="wrap">
          <span className="eyebrow r">The connective tissue of healthcare for India</span>
          <h1 className="display">
            <span className="line-mask"><span>Connecting every link</span></span>
            <span className="line-mask d2"><span className="tl">in the care chain.</span></span>
          </h1>
          <p className="lead r" data-d="2">Not a symptom checker. Not a booking tool. Nexara is one FHIR-native record with four intelligent layers — so every encounter is smarter than the last, from first symptom to long-term adherence.</p>

          <div className="hero-film r" data-d="3" id="hero-film" data-od-id="hero-film">
            <span className="film-badge">Patient triage · live</span>
            <div className="film-stage hf-stage">
              <div className="film-grid" aria-hidden="true" />

              {/* phone running the triage conversation */}
              <div className="hf-phone dev dev-phone" aria-hidden="true">
                <div className="scr">
                  <div className="dev-notch" />
                  <div className="hf-chat">
                    <div className="hf-step hf-bub1 u-row">
                      <span className="u-av"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg></span>
                      <div className="u-bub them">Chest tightness since this morning, a little short of breath.</div>
                    </div>
                    <div className="hf-step hf-bub2 u-bub you">Thanks — that needs prompt review.</div>
                    <div className="hf-step hf-chip u-chip">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      Cardiology · within 24h
                    </div>
                  </div>
                </div>
              </div>

              {/* live triage trace → booked */}
              <div className="hf-side">
                <span className="hf-side-k">Routing in real time</span>
                <div className="hf-trace">
                  <div className="hf-t t1">Mapped to <b>Cardiology</b></div>
                  <div className="hf-t t2">Urgency <b>within 24h</b></div>
                  <div className="hf-t t3"><b>3 clinics</b> within 1 km, live queue</div>
                </div>
                <div className="hf-booked">
                  <span className="bchk"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg></span>
                  <span className="bx"><b>Booked · Today 16:40</b><span className="sub">Dr. Rao · 0.8 km · written to the record</span></span>
                </div>
              </div>

              <button type="button" className="film-replay" id="film-replay" aria-label="Replay demo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
                Replay
              </button>
            </div>
          </div>

          <div className="hero-cta r" data-d="4">
            <a href="#cta" className="btn btn-primary" data-magnetic>Request access {ARROW}</a>
            <a href="#layers" className="btn btn-ghost">See how it works</a>
          </div>

          <div className="thread r" data-d="4" id="thread">
            <div className="thread-line" />
            <div className="thread-nodes">
              {['Symptom', 'Triage', 'Booking', 'Care team', 'Adherence'].map((t) => (
                <div className="tnode" key={t}><span className="tdot" /><span className="tlabel">{t}</span></div>
              ))}
            </div>
          </div>

          <div className="trust-strip r" data-d="5">
            {['FHIR-native', 'ABDM-connected', 'India-hosted', 'Free for patients'].map((t) => (
              <span className="chip" key={t}><span className="dot" />{t}</span>
            ))}
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="band band--tint" id="problem" data-od-id="problem">
        <div className="wrap">
          <div className="prob-grid">
            <div className="shead">
              <span className="eyebrow r">Why Nexara</span>
              <h2 className="h2 r" data-d="1">Care in India works in fragments. The patient is left to connect them.</h2>
              <p className="lead r" data-d="2">A symptom, a search, the wrong specialist, a queue, a prescription, a follow-up that never happens — each link works alone, and the patient becomes their own navigator. The cost of that disconnection is measurable.</p>
            </div>
            <figure className="nx-figure duotone r" data-d="2">
              <img src="/assets/images/doctor-phone.jpg" alt="A patient managing their own care on a phone" loading="lazy" />
              <figcaption className="nx-cap">The patient, navigating alone</figcaption>
            </figure>
          </div>
          <div className="stats">
            <div className="stat pop" data-d="1"><div className="num"><span className="cu" data-to="2" data-prefix="~">~0</span><span className="u">min</span></div><p className="lab">the average primary-care consultation in India — too little time to start from scratch.</p><div className="src">BMJ Open, 2017</div></div>
            <div className="stat pop" data-d="2"><div className="num"><span className="cu" data-to="80" data-prefix="~">~0</span><span className="u">%</span></div><p className="lab">shortfall of specialists at rural community health centres — the right door is rarely near.</p><div className="src">Rural Health Statistics, MoHFW</div></div>
            <div className="stat pop" data-d="3"><div className="num"><span className="cu" data-to="101">0</span><span className="u">M</span></div><p className="lab">Indians live with diabetes, with 136M more on the edge — chronic care can’t be a one-time event.</p><div className="src">ICMR-INDIAB, Lancet 2023</div></div>
            <div className="stat pop" data-d="4"><div className="num"><span className="cu" data-to="1">0</span><span className="u">record</span></div><p className="lab">is what’s missing. Your history is scattered across clinics that never talk to each other.</p><div className="src">The case for ABDM</div></div>
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section className="band" id="layers" data-od-id="layers">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">The platform</span>
            <h2 className="h2 r" data-d="1">One record. Four intelligent layers.</h2>
            <p className="lead r" data-d="2">Each layer acts on the same longitudinal record — and writes back to it. That compounding is the defensibility.</p>
          </div>
          <div className="layers">
            <article className="layer pop" data-d="1">
              <div className="layer-top"><span className="layer-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M9 19h6a4 4 0 0 0 4-4V8M15 5H9a4 4 0 0 0-4 4v7" /></svg></span><span className="layer-n">01</span></div>
              <div className="layer-name"><h3>Routing</h3></div>
              <p>Get the patient to the right door. Conversational AI triage maps symptoms to a specialty and urgency — decision support, never a diagnosis.</p>
            </article>
            <article className="layer pop" data-d="2">
              <div className="layer-top"><span className="layer-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></span><span className="layer-n">02</span></div>
              <div className="layer-name"><h3>Matching</h3></div>
              <p>Book the right professional. Geofenced discovery, verified profiles, live queue and ETA, fee transparency — booking that respects the patient’s time.</p>
            </article>
            <article className="layer pop" data-d="3">
              <div className="layer-top"><span className="layer-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></span><span className="layer-n">03</span></div>
              <div className="layer-name"><h3>Coordination</h3></div>
              <p>Keep the care team in sync. An EHR-embedded Care Team Hub, a pharmacist console with interaction alerts, and referral loops that actually close.</p>
            </article>
            <article className="layer pop" data-d="4">
              <div className="layer-top"><span className="layer-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg></span><span className="layer-n">04</span></div>
              <div className="layer-name"><h3>Retention</h3><span className="moat">The moat</span></div>
              <p>Diagnose why care breaks down and fix it. The Root Cause Engine surfaces adherence barriers and PDC — turning one-time visits into lasting outcomes.</p>
            </article>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="band band--tint" id="personas" data-od-id="personas">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">One record, four surfaces</span>
            <h2 className="h2 r" data-d="1">Everyone sees the same picture — in their own language.</h2>
            <p className="lead r" data-d="2">A shared component library and tokens render four surfaces from one record. The voice changes with the reader.</p>
          </div>
          <div className="personas">
            <article className="persona pop" data-d="1">
              <div className="ph-img"><img src="/assets/images/patient-app.jpg" alt="A person using a phone to find and book care" loading="lazy" /><span className="ph-tag">Patient · Mobile app</span></div>
              <div className="persona-body">
                <div className="persona-top"><span className="persona-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M11 18h2" /></svg></span><div><div className="persona-name">Patient</div><div className="persona-surface">Mobile app</div></div></div>
                <p className="persona-jtbd">Get me to the right care without making me my own navigator.</p>
              </div>
            </article>
            <article className="persona pop" data-d="2">
              <div className="ph-img"><img src="/assets/images/consult-pair.jpg" alt="A clinician reviewing a patient’s history during a consultation" loading="lazy" /><span className="ph-tag">Provider · EHR-embedded</span></div>
              <div className="persona-body">
                <div className="persona-top"><span className="persona-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 15a6 6 0 0 0 12 0v-3" /><path d="M8 2v5a4 4 0 0 0 8 0V2" /><circle cx="20" cy="10" r="2" /></svg></span><div><div className="persona-name">Provider</div><div className="persona-surface">Care Team Hub · EHR-embedded</div></div></div>
                <p className="persona-jtbd">Why this patient, why now — full context before they sit down.</p>
              </div>
            </article>
            <article className="persona pop" data-d="3">
              <div className="ph-img"><img src="/assets/images/pharmacist-a.jpg" alt="Medication on a pharmacy counter" loading="lazy" /><span className="ph-tag">Pharmacist · Console</span></div>
              <div className="persona-body">
                <div className="persona-top"><span className="persona-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg></span><div><div className="persona-name">Pharmacist</div><div className="persona-surface">Console + structured alerts</div></div></div>
                <p className="persona-jtbd">Surface the interaction and the adherence barrier so I act in one call.</p>
              </div>
            </article>
            <article className="persona pop" data-d="4">
              <div className="ph-img"><img src="/assets/images/data-care.jpg" alt="An analytics dashboard showing population health metrics" loading="lazy" /><span className="ph-tag">Payer / Admin · Dashboard</span></div>
              <div className="persona-body">
                <div className="persona-top"><span className="persona-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></svg></span><div><div className="persona-name">Payer / Admin</div><div className="persona-surface">Population dashboard</div></div></div>
                <p className="persona-jtbd">Adherence, referral completion and Star-rating impact — in ₹.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SHOWCASE — see the platform */}
      <section className="band" id="showcase" data-od-id="showcase">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">See it live</span>
            <h2 className="h2 r" data-d="1">The same record, felt four ways.</h2>
            <p className="lead r" data-d="2">Not mockups of a brochure — the actual surfaces. Slide through how each role meets the record.</p>
          </div>

          <div className="showcase r" data-d="2">
            <div className="sl-frame">
              <div className="sl-viewport" id="sl-viewport">
                <div className="sl-track" id="sl-track">

                  {/* 1 — Patient */}
                  <div className="sl-item" role="group" aria-roledescription="slide" aria-label="1 of 4 — Patient app">
                    <div className="sl-copy">
                      <span className="sl-kicker">Patient · iOS</span>
                      <h3>Describe it once. Land at the right door.</h3>
                      <p>Conversational triage maps symptoms to a specialty and urgency — decision support, never a diagnosis.</p>
                      <div className="sl-meta"><span>Symptom → specialty</span><span>Live queue &amp; ETA</span></div>
                    </div>
                    <div className="sl-stage">
                      <div className="dev dev-phone">
                        <div className="scr">
                          <div className="dev-notch" />
                          <div className="dev-body" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                            <div className="u-row"><span className="u-av"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg></span><div className="u-bub them">Chest tightness since this morning, a bit short of breath.</div></div>
                            <div className="u-bub you">Thanks — that needs prompt review.</div>
                            <div className="u-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>Cardiology · within 24h</div>
                            <div style={{ marginTop: 2 }} className="u-btn">Book nearest — 0.8 km</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2 — Provider */}
                  <div className="sl-item" role="group" aria-roledescription="slide" aria-label="2 of 4 — Provider Care Team Hub">
                    <div className="sl-copy">
                      <span className="sl-kicker">Provider · EHR-embedded</span>
                      <h3>Full context before they sit down.</h3>
                      <p>The Care Team Hub shows why this patient, why now — the thread of every prior encounter, in one pane.</p>
                      <div className="sl-meta"><span>Why-now summary</span><span>Referral loop closes</span></div>
                    </div>
                    <div className="sl-stage">
                      <div className="dev dev-card">
                        <div className="dev-bar"><span className="dev-dot" /><span className="dev-dot" /><span className="dev-dot" /><span className="lbl">care-team-hub</span></div>
                        <div className="dev-body">
                          <div className="u-row" style={{ justifyContent: 'space-between' }}>
                            <div className="u-row"><span className="u-av">R</span><div><div style={{ fontSize: 12.5, fontWeight: 600 }}>R. Mehta · 54</div><div style={{ fontSize: 10.5, color: 'var(--muted)' }}>Referred — Cardiology</div></div></div>
                            <span className="u-tag warn">Priority</span>
                          </div>
                          <div style={{ marginTop: 10 }}>
                            <div className="u-line"><span className="k">Triage</span><span className="v">Cardiology · 24h</span></div>
                            <div className="u-line"><span className="k">Booking</span><span className="v">Today 16:40</span></div>
                            <div className="u-line"><span className="k">Last labs</span><span className="v">Lipid · 6 wks</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 — Pharmacist */}
                  <div className="sl-item" role="group" aria-roledescription="slide" aria-label="3 of 4 — Pharmacist console">
                    <div className="sl-copy">
                      <span className="sl-kicker">Pharmacist · Console</span>
                      <h3>Catch the interaction. Fix the barrier.</h3>
                      <p>Structured alerts surface the drug interaction and the adherence barrier together — so you act in one call.</p>
                      <div className="sl-meta"><span>Interaction checks</span><span>Adherence / PDC</span></div>
                    </div>
                    <div className="sl-stage">
                      <div className="dev dev-card">
                        <div className="dev-bar"><span className="dev-dot" /><span className="dev-dot" /><span className="dev-dot" /><span className="lbl">rx-console</span></div>
                        <div className="dev-body">
                          <div className="u-line"><span className="k">Atorvastatin 20mg</span><span className="u-tag ok">Active</span></div>
                          <div className="u-line"><span className="k">Clarithromycin 500mg</span><span className="u-tag warn">New</span></div>
                          <div className="u-alert" style={{ marginTop: 10 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none', color: 'var(--warn)' }}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
                            <span><strong>Interaction:</strong> raises statin levels. Suggest azithromycin — adherence barrier: cost.</span>
                          </div>
                          <div className="u-btn" style={{ marginTop: 10 }}>Resolve in one call</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 — Payer */}
                  <div className="sl-item" role="group" aria-roledescription="slide" aria-label="4 of 4 — Payer dashboard">
                    <div className="sl-copy">
                      <span className="sl-kicker">Payer / Admin · Dashboard</span>
                      <h3>Adherence and referral lift — in ₹.</h3>
                      <p>Population health rolls up to the numbers that move Star ratings and outcomes, by cohort and over time.</p>
                      <div className="sl-meta"><span>PDC by cohort</span><span>Referral completion</span></div>
                    </div>
                    <div className="sl-stage">
                      <div className="dev dev-card">
                        <div className="dev-bar"><span className="dev-dot" /><span className="dev-dot" /><span className="dev-dot" /><span className="lbl">population</span></div>
                        <div className="dev-body">
                          <div className="u-kpis">
                            <div className="u-kpi"><div className="n">+14%</div><div className="c">Adherence (PDC), 90d</div></div>
                            <div className="u-kpi"><div className="n">81%</div><div className="c">Referral completion</div></div>
                          </div>
                          <div style={{ fontSize: 10.5, color: 'var(--muted)', marginBottom: 4 }}>PDC trend — last 6 cohorts</div>
                          <div className="u-bars" aria-hidden="true">
                            <i style={{ height: '46%' }} /><i style={{ height: '58%' }} /><i style={{ height: '52%' }} /><i style={{ height: '70%' }} /><i style={{ height: '78%' }} /><i style={{ height: '92%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="sl-ctrls">
              <div className="sl-dots" id="sl-dots" role="tablist" aria-label="Choose surface">
                <button className="sl-dot active" type="button" aria-label="Patient app" />
                <button className="sl-dot" type="button" aria-label="Provider hub" />
                <button className="sl-dot" type="button" aria-label="Pharmacist console" />
                <button className="sl-dot" type="button" aria-label="Payer dashboard" />
              </div>
              <div className="sl-arrows">
                <button className="sl-arrow" id="sl-prev" type="button" aria-label="Previous surface"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
                <button className="sl-arrow" id="sl-next" type="button" aria-label="Next surface"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOLDEN THREAD (dark) */}
      <section className="thread-band" id="thread-band" data-od-id="thread-band">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">The Golden Thread</span>
            <h2 className="h2 r" data-d="1">A single living record that compounds with every encounter.</h2>
            <p className="lead r" data-d="2">Four data streams, written back to one longitudinal record. No single screen is the moat — their compounding is.</p>
          </div>
          <div className="streams r" data-d="2">
            <div className="stream"><div className="stream-n">01</div><h4>Routing signal</h4><p>Symptom → specialty patterns sharpen triage over time.</p></div>
            <div className="stream"><div className="stream-n">02</div><h4>Matching signal</h4><p>Discovery, queues and bookings reveal real access and supply.</p></div>
            <div className="stream"><div className="stream-n">03</div><h4>Coordination signal</h4><p>Care-team threads and referrals map how care actually flows.</p></div>
            <div className="stream"><div className="stream-n">04</div><h4>Retention signal</h4><p>Adherence and PDC expose where — and why — care drops off.</p></div>
          </div>
          <div className="moat-line r" data-d="3">
            <p><span className="em">Defensibility is the compounding</span> of these four streams against one record — never any single screen.</p>
            <span className="mb"><BrandMark className="brand-mark" /> Nexara</span>
          </div>
        </div>
      </section>

      {/* EDITORIAL — full-bleed quote over real photography */}
      <section className="editorial" data-od-id="editorial" aria-label="Why we're building Nexara">
        <img src="/assets/images/clinic-modern.jpg" alt="" aria-hidden="true" />
        <div className="eq">
          <span className="ek r">The thesis</span>
          <blockquote className="r" data-d="1">Getting care should never depend on the patient being their own navigator.</blockquote>
          <cite className="r" data-d="2">— Why we're building Nexara</cite>
        </div>
      </section>

      {/* TRUST */}
      <section className="band" id="trust" data-od-id="trust">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">Trust &amp; safety</span>
            <h2 className="h2 r" data-d="1">Built for the most regulated industry in India — by design.</h2>
            <p className="lead r" data-d="2">These aren’t features bolted on later. They’re invariants the product is built around.</p>
          </div>
          <div className="invariants">
            <div className="inv pop" data-d="1" data-tone="success"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></svg></span><span className="inv-label">AI never diagnoses</span></div><p>Decision support only — routes to a specialty, never names a condition. CDSCO Class A.</p></div>
            <div className="inv pop" data-d="2" data-tone="danger"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a5 5 0 0 1 10 0" /><path d="M12 3a4 4 0 0 1 4 4v6H8V7a4 4 0 0 1 4-4Z" /><path d="M5 21h14M12 3V1" /></svg></span><span className="inv-label">Deterministic emergency path</span></div><p>A bilingual, negation-aware interceptor runs before the LLM. On match: 112 &amp; 108, nearest ER.</p></div>
            <div className="inv pop" data-d="3" data-tone="info"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><path d="m2 2 20 20" /></svg></span><span className="inv-label">No PII to the model</span></div><p>Only symptom text reaches triage — never name, phone, ABHA or address. In-region LLM preferred.</p></div>
            <div className="inv pop" data-d="4" data-tone="success"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v5h5" /><path d="m9 15 2 2 4-4" /></svg></span><span className="inv-label">Consent is a hard wall</span></div><p>Explicit, purpose-specific, withdrawable. Immutable consent receipt. Minors need verifiable parental consent (DPDP).</p></div>
            <div className="inv pop" data-d="5" data-tone="info"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></span><span className="inv-label">India-only residency</span></div><p>All patient and clinical data stored and processed in-region (ap-south). RBI-localized payments.</p></div>
            <div className="inv pop" data-d="5" data-tone="warning"><div className="inv-top"><span className="inv-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4" /><path d="M8 8h8M8 12h8M8 16h5" /></svg></span><span className="inv-label">CERT-In logging</span></div><p>Append-only audit, 6-hour incident reporting, 180-day logs in India — with no clinical content.</p></div>
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section className="band band--tint" id="model" data-od-id="model">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">Business model</span>
            <h2 className="h2 r" data-d="1">Free at the point of use. Patients are never billed.</h2>
            <p className="lead r" data-d="2">Care should never be gated behind a patient’s wallet. Five B2B buyers fund the network — each paying for the data stream they value.</p>
          </div>
          <div className="buyers">
            <div className="buyer pop" data-d="1"><span className="buyer-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v4M10 8h4" /><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" /><path d="M2 22h20M6 12H4a2 2 0 0 0-2 2v8M18 12h2a2 2 0 0 1 2 2v8" /></svg></span><div className="buyer-name">Providers</div><p>Queue and practice SaaS that gives clinicians their time back.</p></div>
            <div className="buyer pop" data-d="2"><span className="buyer-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="M12 8v6M9 11h6" /></svg></span><div className="buyer-name">Payers</div><p>Adherence and Star-rating lift, measured in ₹ and outcomes.</p></div>
            <div className="buyer pop" data-d="3"><span className="buyer-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31l-5.5 9.5A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3.19L14 9.3V2" /><path d="M8.5 2h7M7 16h10" /></svg></span><div className="buyer-name">Pharma</div><p>Real-world adherence and access signal — privacy-preserving.</p></div>
            <div className="buyer pop" data-d="4"><span className="buyer-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4" /></svg></span><div className="buyer-name">Hospitals</div><p>Referral capture and care-continuity across the network.</p></div>
            <div className="buyer pop" data-d="5"><span className="buyer-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h.01M9 2c-.8 0-1.5.5-1.7 1.3" /><path d="M11 2 9 22" /></svg></span><div className="buyer-name">Diagnostics</div><p>Right-test routing and closed-loop result delivery.</p></div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="band" id="roadmap" data-od-id="roadmap">
        <div className="wrap">
          <div className="shead">
            <span className="eyebrow r">Roadmap</span>
            <h2 className="h2 r" data-d="1">A wedge that compounds into infrastructure.</h2>
          </div>
          <div className="roadmap r" data-d="2">
            <div className="rm-track" />
            <div className="rm-grid">
              <div className="phase" data-wedge="now"><div className="phase-meta"><span className="phase-tag">Phase 0</span><span className="phase-status">Now</span></div><h4>Foundation</h4><p>Design system, brand and the connective-tissue thesis. Live now.</p></div>
              <div className="phase" data-wedge="true"><div className="phase-meta"><span className="phase-tag">Phase 1</span><span className="phase-status">Building</span></div><h4>The MVP wedge</h4><p>Triage → specialty → geofenced discovery → booking → clinic queue. FHIR record + ABHA + consent from day one.</p></div>
              <div className="phase"><div className="phase-meta"><span className="phase-tag">Phase 2</span><span className="phase-status">Next</span></div><h4>Coordination</h4><p>Care Team Hub (EHR-embedded), pharmacist console, drug-interaction alerts, ABDM HIP (FHIR R4).</p></div>
              <div className="phase"><div className="phase-meta"><span className="phase-tag">Phase 3</span><span className="phase-status">Later</span></div><h4>Retention — the moat</h4><p>Root Cause Engine (adherence / PDC), payer &amp; population dashboard, ABDM HIU consent-managed record pull.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band cta-band" id="cta" data-od-id="cta">
        <div className="wrap">
          <div className="cta-card r">
            <img className="cta-photo" src="/assets/images/surgery-team.jpg" alt="" aria-hidden="true" />
            <span className="eyebrow">Early access</span>
            <h2>Help build the connective layer for Indian healthcare.</h2>
            <p className="lead">Nexara is being built. We’re onboarding founding providers, payers and clinical partners.</p>
            <div className="hero-cta">
              <a href="#cta" className="btn btn-primary" data-magnetic>Request access {ARROW}</a>
              <a href="#problem" className="btn btn-ghost">Read the vision</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot" data-od-id="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a className="brand" href="#top"><BrandMark className="brand-mark" /> Nexara</a>
              <p className="foot-blurb">The connective tissue of healthcare for India. Currently being built — early access opening soon.</p>
            </div>
            <div className="foot-col"><h5>Platform</h5><a href="#layers">Routing</a><a href="#layers">Matching</a><a href="#layers">Coordination</a><a href="#layers">Retention</a></div>
            <div className="foot-col"><h5>Company</h5><a href="#problem">The problem</a><a href="#personas">Who it serves</a><a href="#roadmap">Roadmap</a><a href="#cta">Request access</a></div>
            <div className="foot-col"><h5>Trust</h5><a href="#trust">Trust &amp; safety</a><a href="#model">Business model</a><a href="#thread-band">The Golden Thread</a></div>
          </div>
          <div className="foot-bottom">
            <span className="compliance">DPDP Act 2023 · ABDM-aligned · CDSCO SaMD Class A · CERT-In · India data residency</span>
            <span className="copyr">© 2025 Nexara</span>
          </div>
        </div>
      </footer>
    </>
  );
}
