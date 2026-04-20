const { useState: useSX, useEffect: useEX, useRef: useRX, useMemo: useMX } = React;

// Reveal observer hook
function useReveal() {
  useEX(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// About
function AboutSection({ t, lang }) {
  return (
    <section className="section">
      <div className="eyebrow" data-reveal>{t.aboutEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>
        {t.aboutLead.split('. ').map((s, i, a) => (
          <React.Fragment key={i}>
            {i === 0 ? s + '. ' : <span className="em">{s}{i === a.length - 1 ? '' : '. '}</span>}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}

function ServicesSection({ t }) {
  const zones = [
    { num: '01', title: t.zone1Title, body: t.zone1Body },
    { num: '02', title: t.zone2Title, body: t.zone2Body },
    { num: '03', title: t.zone3Title, body: t.zone3Body },
  ];
  return (
    <section className="section" id="services">
      <div className="eyebrow" data-reveal>{t.zonesEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>{t.zonesLead}</p>
      <div className="zones-grid">
        {zones.map((z, i) => (
          <div className="zone" key={z.num} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
            <div className="zone-shimmer" />
            <div className="num">ZONE / {z.num}</div>
            <h3>{z.title}</h3>
            <p>{z.body}</p>
            <div className="zone-bar" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ t }) {
  const steps = [
    { n: '01', k: 'p1' }, { n: '02', k: 'p2' }, { n: '03', k: 'p3' },
    { n: '04', k: 'p4' }, { n: '05', k: 'p5' }, { n: '06', k: 'p6' },
  ];
  return (
    <section className="section" id="process">
      <div className="eyebrow" data-reveal>{t.processEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>{t.processLead}</p>
      <div className="process-list">
        {steps.map((s, i) => (
          <div className="process-row" key={s.n} data-reveal style={{ '--delay': `${i * 0.05}s` }}>
            <div className="pnum">{s.n}</div>
            <div className="ptitle">{t[s.k]}</div>
            <div className="pbody">{t[s.k + 'd']}</div>
            <div className="pdot">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClientsSection({ t }) {
  return (
    <section className="section" id="clients">
      <div className="eyebrow" data-reveal>{t.clientsEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>{t.clientsLead}</p>
      <div className="clients-grid" data-reveal style={{ '--delay': '0.2s' }}>
        {window.LOTIFY_CLIENTS.map(c => (
          <div className="client-cell" key={c}>{c}</div>
        ))}
      </div>
    </section>
  );
}

function TeamSection({ t, lang }) {
  return (
    <section className="section" id="team">
      <div className="eyebrow" data-reveal>{t.teamEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>{t.teamLead}</p>
      <div className="team-grid">
        {window.LOTIFY_TEAM.map((m, i) => (
          <div className="team-cell" key={m.name} data-reveal style={{ '--delay': `${(i % 4) * 0.08}s` }}>
            <div className="avatar">
              <span>{m.initial}</span>
              <div className="avatar-noise" />
            </div>
            <div>
              <div className="name">{m.name}</div>
              <div className="role">{m.role[lang]}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeedbackSection({ t, lang }) {
  return (
    <section className="section" id="feedback">
      <div className="eyebrow" data-reveal>{t.feedbackEyebrow}</div>
      <p className="lead" data-reveal style={{ '--delay': '0.1s' }}>{t.feedbackLead}</p>
      <div className="feedback-grid">
        {window.LOTIFY_FEEDBACK.map((f, i) => (
          <div className="fb-card" key={i} data-reveal style={{ '--delay': `${(i % 2) * 0.1}s` }}>
            <div className="mark">"</div>
            <div className="q">{f.quote[lang]}</div>
            <div>
              <div className="by">{f.by}</div>
              <div className="by-role">{f.role[lang]}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ t, lang }) {
  const titleEn = <>Let's build something <span className="em">inevitable.</span></>;
  const titleSr = <>Hajde da napravimo nešto <span className="em">neizbežno.</span></>;
  return (
    <section className="contact" id="contact">
      <div className="eyebrow" style={{ position: 'static', marginBottom: 20 }} data-reveal>{t.contactEyebrow}</div>
      <h2 data-reveal style={{ '--delay': '0.1s' }}>{lang === 'sr' ? titleSr : titleEn}</h2>
      <p style={{ maxWidth: 700, fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.5, marginBottom: 60 }} data-reveal>
        {t.contactLead}
      </p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 80 }} data-reveal style={{ '--delay': '0.15s', display: 'flex', gap: 12, marginBottom: 80 }}>
        <a className="btn-pill accent" href="mailto:hello@lotify.studio" data-magnetic>
          hello@lotify.studio <span className="arrow">↗</span>
        </a>
        <a className="btn-pill ghost" href="https://instagram.com/lotify.studio" target="_blank" data-magnetic>
          @lotify.studio
        </a>
      </div>
      <div className="contact-meta">
        <div className="contact-cell" data-reveal>
          <h5>{t.contact}</h5>
          <a href="mailto:hello@lotify.studio">hello@lotify.studio</a><br/>
          <a href="tel:+381616364494">+381 61 6364494</a>
        </div>
        <div className="contact-cell" data-reveal style={{ '--delay': '0.08s' }}>
          <h5>{lang === 'sr' ? 'DRUŠTVENE MREŽE' : 'SOCIAL'}</h5>
          <a href="https://instagram.com/lotify.studio">Instagram</a><br/>
          <a href="#">X / Twitter</a><br/>
          <a href="#">Dribbble</a>
        </div>
        <div className="contact-cell" data-reveal style={{ '--delay': '0.16s' }}>
          <h5>{lang === 'sr' ? 'STUDIO' : 'STUDIO'}</h5>
          <p>Belgrade, Serbia<br/>Working worldwide</p>
        </div>
      </div>
      <div style={{ marginTop: 140, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--fg-3)', textTransform: 'uppercase', borderTop: '1px solid var(--line)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <span>© LOTIFY STUDIO · MMXXVI</span>
        <span>INDEX / v1.0 · BUILT WITH CARE</span>
      </div>
    </section>
  );
}

// Magnetic button effect — binds to anything with [data-magnetic]
function useMagnetic(enabled) {
  useEX(() => {
    if (!enabled) return;
    const handlers = [];
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        el.style.setProperty('--mx', dx + 'px');
        el.style.setProperty('--my', dy + 'px');
      };
      const onLeave = () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push([el, onMove, onLeave]);
    });
    return () => handlers.forEach(([el, m, l]) => {
      el.removeEventListener('mousemove', m);
      el.removeEventListener('mouseleave', l);
    });
  });
}

// Tweaks panel
function TweaksPanel({ open, tweaks, setTweaks, t }) {
  if (!open) return null;
  const fonts = [
    { id: 'sans', label: 'Sans' },
    { id: 'serif', label: 'Serif' },
    { id: 'mono', label: 'Mono' },
  ];
  const heroes = [
    { id: 'grid', label: '3D' },
    { id: 'marquee', label: 'Marquee' },
    { id: 'type', label: 'Type' },
  ];
  const cursors = [
    { id: 'custom', label: 'Ring' },
    { id: 'crosshair', label: 'Cross' },
    { id: 'blob', label: 'Blob' },
    { id: 'none', label: 'System' },
  ];
  const accents = ['#4DA3FF', '#C6FF3D', '#FF5C2A', '#B794F6', '#FFE58A', '#2BFFCF'];
  return (
    <div className={`tweaks-panel ${open ? 'is-open' : ''}`}>
      <h4><span>// {t.tweaks.toUpperCase()}</span><span>⚙</span></h4>

      <div className="tweak-row">
        <label>{t.tFont}</label>
        <div className="tweak-opts">
          {fonts.map(f => (
            <button key={f.id} className={tweaks.type === f.id ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, type: f.id })}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t.tHero}</label>
        <div className="tweak-opts">
          {heroes.map(h => (
            <button key={h.id} className={tweaks.hero === h.id ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, hero: h.id })}>{h.label}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t.tCursor}</label>
        <div className="tweak-opts">
          {cursors.map(c => (
            <button key={c.id} className={tweaks.cursor === c.id ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, cursor: c.id })}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t.tAccent}</label>
        <div className="tweak-swatches">
          {accents.map(a => (
            <button key={a} style={{ background: a }} className={tweaks.accent === a ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, accent: a })} />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t.tGrain} · {Math.round(tweaks.grain * 100)}</label>
        <input type="range" className="tweak-slider" min="0" max="0.3" step="0.01"
          value={tweaks.grain}
          onChange={e => setTweaks({ ...tweaks, grain: parseFloat(e.target.value) })} />
      </div>

      <div className="tweak-row">
        <label>{t.tAudio}</label>
        <div className="tweak-opts">
          <button className={tweaks.audio ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, audio: true })}>{t.on}</button>
          <button className={!tweaks.audio ? 'active' : ''} onClick={() => setTweaks({ ...tweaks, audio: false })}>{t.off}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  useReveal, AboutSection, ServicesSection, ProcessSection,
  ClientsSection, TeamSection, FeedbackSection, ContactSection,
  TweaksPanel, useMagnetic,
});
