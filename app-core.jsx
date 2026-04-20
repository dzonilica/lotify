const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ========== CURSOR ==========
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef([]);
  useEffect(() => {
    let tx = -100, ty = -100, dx = -100, dy = -100, rx = -100, ry = -100;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
      // trail
      const t = document.createElement('div');
      t.className = 'cursor-trail';
      t.style.left = (tx - 3) + 'px';
      t.style.top = (ty - 3) + 'px';
      document.body.appendChild(t);
      setTimeout(() => { t.style.transition = 'opacity .5s, transform .5s'; t.style.opacity = '0'; t.style.transform = `scale(.3) translate(${(Math.random()-.5)*20}px, ${(Math.random()-.5)*20}px)`; }, 10);
      setTimeout(() => t.remove(), 500);
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', onMove);
    // Hover detection
    const onOver = (e) => {
      const el = e.target;
      const c = document.querySelector('.cursor');
      if (!c) return;
      if (el.closest('button, a, [data-hover]')) c.classList.add('is-hover'); else c.classList.remove('is-hover');
      if (el.closest('input, textarea, [contenteditable]')) c.classList.add('is-text'); else c.classList.remove('is-text');
    };
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);
  return (
    <>
      <div className="cursor cursor-ring-wrap" ref={ringRef}><div className="cursor-ring" /></div>
      <div className="cursor cursor-dot-wrap" ref={dotRef}><div className="cursor-dot" /></div>
    </>
  );
}

// ========== LOADING ==========
function LoadingScreen({ onDone, lang, t }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [scramble, setScramble] = useState('');
  const [out, setOut] = useState(false);
  const steps = t.loadingSteps;

  useEffect(() => {
    const start = Date.now();
    const duration = 3400;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      // eased
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(eased);
      const s = Math.min(steps.length - 1, Math.floor(eased * steps.length));
      setStep(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setOut(true), 200);
        setTimeout(() => onDone(), 1000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scramble text
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    const target = steps[step] || '';
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (i < frame) out += target[i];
        else if (target[i] === ' ') out += ' ';
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      setScramble(out);
      if (frame >= target.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [step]);

  const word = 'LOTIFY';
  return (
    <div className={`loader ${out ? 'is-out' : ''}`}>
      <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
      <div className="loader-inner">
        <div className="loader-row">
          <span>{t.loadingTitle}</span>
          <span>{String(Math.floor(progress * 100)).padStart(3, '0')}%</span>
        </div>
        <div className="loader-brand">
          <div className="loader-brand-word">
            {word.split('').map((c, i) => (
              <span key={i} className="ch" style={{ animationDelay: `${i * 0.08}s` }}>{c}</span>
            ))}
          </div>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ right: `${(1 - progress) * 100}%` }} />
        </div>
        <div className="loader-scramble">› {scramble}</div>
        <div className="loader-meta">
          <span><b>CPU</b> · {String(Math.floor(progress * 100)).padStart(3, '0')}%</span>
          <span><b>SHADERS</b> · {progress > 0.3 ? 'LOADED' : 'LOADING'}</span>
          <span><b>TYPE</b> · {progress > 0.6 ? 'READY' : '...'}</span>
        </div>
      </div>
    </div>
  );
}

// ========== HEADER ==========
function Header({ lang, setLang, t, soundOn, setSoundOn, onOpenContact }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="header">
      <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <img src="assets/lotify-logo-white.png" alt="Lotify" />
      </a>
      <div className="header-status">
        <button className={`sound-toggle ${soundOn ? 'is-on' : ''}`} onClick={() => setSoundOn(!soundOn)}>
          <span className="eq"><span /><span /><span /><span /></span>
          <span>{soundOn ? t.soundOn : t.soundOff}</span>
        </button>
        <div className="cell tag">
          <span className="dot" />
          <span>{t.tagline}</span>
        </div>
        <div className="cell">
          <span>● {t.location}</span>
          <span>{time} GMT+1</span>
        </div>
      </div>
      <div className="lang-toggle">
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        <button className={lang === 'sr' ? 'active' : ''} onClick={() => setLang('sr')}>SR</button>
      </div>
      <button className="btn-pill magnetic" onClick={onOpenContact} data-magnetic>{t.letsTalk}</button>
    </div>
  );
}

// ========== FLOATING NAV ==========
function FloatingNav({ screen, setScreen, t }) {
  const wrapRef = useRef(null);
  const indRef = useRef(null);
  const items = [
    { id: 'work', label: t.work },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'process', label: t.process },
    { id: 'team', label: t.team },
    { id: 'contact', label: t.contact },
  ];
  useEffect(() => {
    if (!wrapRef.current || !indRef.current) return;
    const btn = wrapRef.current.querySelector(`[data-nav="${screen}"]`);
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const pr = wrapRef.current.getBoundingClientRect();
    indRef.current.style.left = (r.left - pr.left) + 'px';
    indRef.current.style.width = r.width + 'px';
  }, [screen, t]);
  return (
    <div className="floating-nav" ref={wrapRef}>
      <div className="nav-indicator" ref={indRef} />
      {items.map(it => (
        <button key={it.id} data-nav={it.id} className={screen === it.id ? 'active' : ''}
          onClick={() => setScreen(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

// ========== PROJECT MODAL ==========
function ProjectModal({ project, onClose, onNext, lang, t }) {
  const modalRef = useRef(null);
  const progRef = useRef(null);
  useEffect(() => {
    if (!project) return;
    document.body.classList.add('no-scroll');
    const el = modalRef.current;
    if (el) el.scrollTop = 0;
    const onScroll = () => {
      if (!el || !progRef.current) return;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      progRef.current.style.transform = `scaleX(${p})`;
    };
    el?.addEventListener('scroll', onScroll);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      el?.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [project]);

  // Intersection observer for reveals inside modal
  useEffect(() => {
    if (!project || !modalRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('is-in');
      });
    }, { threshold: 0.15, root: modalRef.current });
    modalRef.current.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [project]);

  if (!project) return null;
  const p = project;

  const galleryItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  return (
    <div className={`project-modal ${project ? 'is-open' : ''}`} ref={modalRef}>
      <div className="pm-progress"><div className="pm-progress-fill" ref={progRef} /></div>
      <button className="project-close" onClick={onClose} aria-label={t.closeProject}>
        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>

      <div className="pm-hero">
        <div className="pm-bg"><ProjectArt project={p} /></div>
        <div className="pm-top">
          <span>LOTIFY / CASE STUDY / {p.category}</span>
          <span>{p.year}</span>
        </div>
        <div>
          <h1 className="pm-title" data-reveal>{p.title}</h1>
          <p className="pm-tagline" data-reveal style={{ '--delay': '0.1s' }}>{p.tagline[lang]}</p>
        </div>
        <div className="pm-meta-grid" data-reveal style={{ '--delay': '0.2s' }}>
          <div><h6>{t.client}</h6><p>{p.client}</p></div>
          <div><h6>{t.year}</h6><p>{p.year}</p></div>
          <div><h6>{t.role}</h6><p>{p.role[lang]}</p></div>
          <div><h6>{t.stack}</h6><p>{p.stack}</p></div>
        </div>
      </div>

      <div className="pm-section">
        <div className="pm-section-grid">
          <div className="pm-section-label" data-reveal>01 / {t.overview.toUpperCase()}</div>
          <div className="pm-section-body" data-reveal style={{ '--delay': '0.1s' }}>
            {p.overview[lang]}
          </div>
        </div>
      </div>

      <div className="pm-section">
        <div className="pm-section-grid">
          <div className="pm-section-label" data-reveal>02 / {t.problem.toUpperCase()}</div>
          <div className="pm-section-body" data-reveal style={{ '--delay': '0.1s' }}>
            <span style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>"</span>
            {p.problem[lang]}
            <span style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>"</span>
          </div>
        </div>
      </div>

      <div className="pm-section" style={{ background: 'var(--bg-2)' }}>
        <div className="pm-section-grid">
          <div className="pm-section-label" data-reveal>03 / {t.approachH.toUpperCase()}</div>
          <div className="pm-section-body" data-reveal style={{ '--delay': '0.1s' }}>
            {p.approach[lang]}
          </div>
        </div>
      </div>

      <div className="pm-stats">
        {p.stats.map((s, i) => (
          <div className="pm-stat" key={i} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
            <StatNumber target={s.n} color={p.color} />
            <div className="l">{s.l[lang]}</div>
          </div>
        ))}
      </div>

      <div className="pm-section">
        <div className="pm-section-grid">
          <div className="pm-section-label" data-reveal>04 / {t.outcome.toUpperCase()}</div>
          <div className="pm-section-body" data-reveal style={{ '--delay': '0.1s' }}>
            {p.outcome[lang]}
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 48px 0', borderTop: '1px solid var(--line)' }}>
        <div className="pm-section-label" data-reveal>05 / {t.gallery.toUpperCase()}</div>
      </div>
      <div className="pm-gallery">
        {galleryItems.map((c, i) => (
          <div key={i} className={`pm-gallery-item ${c}`} data-reveal style={{ '--delay': `${(i % 3) * 0.1}s` }}>
            <ProjectArt project={{ ...p, heroPattern: ['grid', 'wave', 'dots', 'blueprint', 'lines'][i % 5], title: p.title + ' ' + (i + 1) }} />
            <div className="gl-label">{String(i + 1).padStart(2, '0')} / {t.gallery}</div>
          </div>
        ))}
      </div>

      <div className="pm-next" onClick={onNext}>
        <div>
          <div className="l">{t.nextProject}</div>
          <div className="t">{onNext && typeof onNext === 'function' && window.LOTIFY_NEXT_TITLE || ''}</div>
        </div>
        <div className="arrow">→</div>
      </div>
    </div>
  );
}

function StatNumber({ target, color }) {
  const ref = useRef(null);
  const [val, setVal] = useState(target);
  useEffect(() => {
    // Only animate if pure number or starts with number
    const m = target.match(/^(\d+(\.\d+)?)/);
    if (!m) { setVal(target); return; }
    const n = parseFloat(m[1]);
    const suffix = target.slice(m[1].length);
    let start;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const tick = (t) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / 1400);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = n * eased;
          setVal((Number.isInteger(n) ? Math.round(cur) : cur.toFixed(1)) + suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [target]);
  return <div className="n" ref={ref} style={{ color }}>{val}</div>;
}

Object.assign(window, { Cursor, LoadingScreen, Header, FloatingNav, ProjectModal });
