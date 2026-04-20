const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM, useCallback: uC } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "type": "sans",
  "hero": "grid",
  "cursor": "custom",
  "accent": "#4DA3FF",
  "grain": 0.12,
  "audio": false
}/*EDITMODE-END*/;

function App() {
  const [loading, setLoading] = uS(true);
  const [lang, setLangRaw] = uS(() => localStorage.getItem('lotify.lang') || 'en');
  const [screen, setScreen] = uS('work');
  const [openProject, setOpenProject] = uS(null);
  const [hoveredTile, setHoveredTile] = uS(null);
  const [tweaksOpen, setTweaksOpen] = uS(false);
  const [tweaks, setTweaksRaw] = uS(TWEAK_DEFAULTS);
  const [soundOn, setSoundOn] = uS(TWEAK_DEFAULTS.audio);
  const t = window.LOTIFY_I18N[lang];

  // Persist lang
  const setLang = (l) => { setLangRaw(l); localStorage.setItem('lotify.lang', l); };

  // Apply tweaks to :root
  uE(() => {
    document.documentElement.setAttribute('data-type', tweaks.type);
    document.documentElement.setAttribute('data-cursor', tweaks.cursor);
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--grain', tweaks.grain);
  }, [tweaks]);

  const setTweaks = (v) => {
    setTweaksRaw(v);
    // persist via host bridge
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: v }, '*');
    } catch (e) {}
  };

  // Edit-mode integration with host
  uE(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch (e) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Magnetic
  useMagnetic(!loading);

  // Reveal
  useReveal();

  // Scroll to top when switching non-work screens
  uE(() => {
    if (screen === 'work') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      // scroll to the section
      const id = screen === 'about' ? 'about-sec' : screen;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [screen]);

  // Project navigation
  const projects = window.LOTIFY_PROJECTS;
  const onOpenProject = (p) => {
    setOpenProject(p);
  };
  const onNextProject = () => {
    if (!openProject) return;
    const idx = projects.findIndex(x => x.id === openProject.id);
    const next = projects[(idx + 1) % projects.length];
    setOpenProject(next);
    document.querySelector('.project-modal')?.scrollTo({ top: 0, behavior: 'instant' });
  };
  uE(() => {
    if (openProject) {
      const idx = projects.findIndex(x => x.id === openProject.id);
      const next = projects[(idx + 1) % projects.length];
      window.LOTIFY_NEXT_TITLE = next?.title || '';
    }
  }, [openProject]);

  return (
    <>
      {tweaks.cursor !== 'none' && <Cursor />}
      <div className="grain" />
      <div className="scanline" />

      {loading && <LoadingScreen onDone={() => setLoading(false)} lang={lang} t={t} />}

      <Header lang={lang} setLang={setLang} t={t} soundOn={soundOn} setSoundOn={setSoundOn}
              onOpenContact={() => { setScreen('contact'); }} />

      {/* WORK screen = full-bleed hero + sections scroll */}
      <div className={`screen ${screen === 'work' ? 'is-active' : ''}`}>
        <Hero3D projects={projects} onOpen={onOpenProject} onHoverTile={setHoveredTile} variant={tweaks.hero} />
        <div className="hero-copy">
          <h1>
            {t.heroTitle1}<br />
            <span className="em">{t.heroTitle2}</span><br />
            {t.heroTitle3}
          </h1>
          <div className="sub">{t.heroSub}</div>
        </div>
        <div className="hero-indicator">LOTIFY / {new Date().getFullYear()}</div>
        <div className="hero-indicator right">{hoveredTile ? `${hoveredTile.title.toUpperCase()} / ${hoveredTile.client.toUpperCase()}` : t.heroSub.toUpperCase()}</div>
      </div>

      {/* All other screens inline so users can scroll among them */}
      <div id="about-sec"><AboutSection t={t} lang={lang} /></div>
      <ServicesSection t={t} />
      <ProcessSection t={t} />
      <div id="clients"><ClientsSection t={t} /></div>
      <TeamSection t={t} lang={lang} />
      <FeedbackSection t={t} lang={lang} />
      <ContactSection t={t} lang={lang} />

      <FloatingNav screen={screen} setScreen={setScreen} t={t} />

      <div className="bottom-left">
        <button className="icon-btn" title="View all" onClick={() => document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' })}>
          <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" fill="none" stroke="currentColor"/><rect x="9" y="1" width="6" height="6" fill="none" stroke="currentColor"/><rect x="1" y="9" width="6" height="6" fill="none" stroke="currentColor"/><rect x="9" y="9" width="6" height="6" fill="none" stroke="currentColor"/></svg>
        </button>
        <button className="icon-btn" title="List view" onClick={() => setTweaksRaw({ ...tweaks, hero: tweaks.hero === 'type' ? 'grid' : 'type' })}>
          <svg width="16" height="16" viewBox="0 0 16 16"><line x1="2" y1="4" x2="14" y2="4" stroke="currentColor"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor"/><line x1="2" y1="12" x2="14" y2="12" stroke="currentColor"/></svg>
        </button>
      </div>

      <div className="bottom-right">
        <button className={`icon-btn ${tweaksOpen ? 'is-active' : ''}`} title="Tweaks" onClick={() => setTweaksOpen(!tweaksOpen)}>
          <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2" fill="currentColor"/><path d="M8 1 L8 4 M8 12 L8 15 M1 8 L4 8 M12 8 L15 8 M3 3 L5 5 M11 11 L13 13 M13 3 L11 5 M5 11 L3 13" stroke="currentColor"/></svg>
        </button>
      </div>

      <TweaksPanel open={tweaksOpen} tweaks={tweaks} setTweaks={setTweaks} t={t} />

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} onNext={onNextProject} lang={lang} t={t} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
