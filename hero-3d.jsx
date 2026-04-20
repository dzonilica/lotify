// Hero 3D grid — 8 project tiles orbiting on a sphere-like grid
// Drag to rotate, wheel to zoom, click to open
const { useState: useS3D, useEffect: useE3D, useRef: useR3D, useMemo: useM3D, useCallback: useC3D } = React;

function Hero3D({ projects, onOpen, onHoverTile, variant = 'grid' }) {
  const stageRef = useR3D(null);
  const worldRef = useR3D(null);
  const rot = useR3D({ x: -8, y: 0 });
  const targetRot = useR3D({ x: -8, y: 0 });
  const zoom = useR3D(1);
  const targetZoom = useR3D(1);
  const draggingRef = useR3D(false);
  const lastRef = useR3D({ x: 0, y: 0 });
  const autoRotRef = useR3D(true);

  // Tile positions — a 4x2 curved grid in 3D
  const positions = useM3D(() => {
    const cols = 4, rows = 2;
    const gapX = 480, gapY = 320;
    const arr = [];
    for (let i = 0; i < projects.length; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = (c - (cols - 1) / 2) * gapX;
      const y = (r - (rows - 1) / 2) * gapY;
      // Curve: tiles further from center push back on Z
      const distFromCenter = Math.sqrt(Math.pow(c - (cols - 1) / 2, 2) + Math.pow(r - (rows - 1) / 2, 2));
      const z = -distFromCenter * 90;
      // slight rotation on Y so side tiles angle toward viewer
      const rotY = -(c - (cols - 1) / 2) * 10;
      const rotX = -(r - (rows - 1) / 2) * 6;
      arr.push({ x, y, z, rotX, rotY });
    }
    return arr;
  }, [projects]);

  // Animation loop
  useE3D(() => {
    let raf;
    const loop = () => {
      // Smooth lerp
      rot.current.x += (targetRot.current.x - rot.current.x) * 0.08;
      rot.current.y += (targetRot.current.y - rot.current.y) * 0.08;
      zoom.current += (targetZoom.current - zoom.current) * 0.1;
      if (autoRotRef.current && !draggingRef.current) {
        targetRot.current.y += 0.05;
      }
      if (worldRef.current) {
        worldRef.current.style.transform =
          `translate(-50%, -50%) scale(${zoom.current.toFixed(3)}) rotateX(${rot.current.x.toFixed(2)}deg) rotateY(${rot.current.y.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag handlers
  const onDown = useC3D((e) => {
    draggingRef.current = true;
    autoRotRef.current = false;
    stageRef.current?.classList.add('is-dragging');
    const p = e.touches ? e.touches[0] : e;
    lastRef.current = { x: p.clientX, y: p.clientY };
    document.documentElement.classList.add('cursor-drag');
    const cursor = document.querySelector('.cursor');
    if (cursor) cursor.classList.add('is-drag');
  }, []);
  const onMove = useC3D((e) => {
    if (!draggingRef.current) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - lastRef.current.x;
    const dy = p.clientY - lastRef.current.y;
    targetRot.current.y += dx * 0.3;
    targetRot.current.x = Math.max(-60, Math.min(60, targetRot.current.x - dy * 0.2));
    lastRef.current = { x: p.clientX, y: p.clientY };
  }, []);
  const onUp = useC3D(() => {
    draggingRef.current = false;
    stageRef.current?.classList.remove('is-dragging');
    document.documentElement.classList.remove('cursor-drag');
    const cursor = document.querySelector('.cursor');
    if (cursor) cursor.classList.remove('is-drag');
    // resume auto rot after a delay
    setTimeout(() => { if (!draggingRef.current) autoRotRef.current = true; }, 3000);
  }, []);

  useE3D(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      targetZoom.current = Math.max(0.4, Math.min(2, targetZoom.current + delta));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      stage.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [onMove, onUp]);

  if (variant === 'marquee') {
    return <HeroMarquee projects={projects} onOpen={onOpen} />;
  }
  if (variant === 'type') {
    return <HeroType projects={projects} onOpen={onOpen} />;
  }

  return (
    <div
      className="hero-stage"
      ref={stageRef}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      <div className="hero-3d">
        <div className="hero-world" ref={worldRef}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="hero-tile"
              style={{
                transform: `translate3d(${positions[i].x}px, ${positions[i].y}px, ${positions[i].z}px) rotateX(${positions[i].rotX}deg) rotateY(${positions[i].rotY}deg)`,
              }}
              onMouseEnter={() => onHoverTile && onHoverTile(p)}
              onMouseLeave={() => onHoverTile && onHoverTile(null)}
              onClick={(e) => {
                // Only open if not a drag
                if (!draggingRef.current) onOpen(p);
              }}
            >
              <ProjectArt project={p} />
              <div className="tile-overlay" />
              <div className="tile-top">
                <span>{p.year}</span>
                <span>{p.category}</span>
              </div>
              <div className="tile-title">{p.title}</div>
              <div className="tile-meta">
                <span>{p.client}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroMarquee({ projects, onOpen }) {
  const row1 = [...projects, ...projects];
  const row2 = [...projects.slice(4), ...projects.slice(0, 4), ...projects.slice(4), ...projects.slice(0, 4)];
  return (
    <div className="hero-marquee-wrap">
      <div className="hero-marquee">
        {row1.map((p, i) => (
          <div key={i} className="hero-tile" onClick={() => onOpen(p)}>
            <ProjectArt project={p} />
            <div className="tile-overlay" />
            <div className="tile-top">
              <span>{p.year}</span>
              <span>{p.category}</span>
            </div>
            <div className="tile-title">{p.title}</div>
            <div className="tile-meta"><span>{p.client}</span><span>→</span></div>
          </div>
        ))}
      </div>
      <div className="hero-marquee rev">
        {row2.map((p, i) => (
          <div key={i} className="hero-tile" onClick={() => onOpen(p)}>
            <ProjectArt project={p} />
            <div className="tile-overlay" />
            <div className="tile-top"><span>{p.year}</span><span>{p.category}</span></div>
            <div className="tile-title">{p.title}</div>
            <div className="tile-meta"><span>{p.client}</span><span>→</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroType({ projects, onOpen }) {
  const [hovered, setHovered] = useS3D(null);
  return (
    <div className="hero-stage" style={{ cursor: 'default', padding: '0 48px', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'left', maxWidth: 1400, width: '100%' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--fg-2)', textTransform: 'uppercase', marginBottom: 20 }}>
          Selected work / 2024 — 2026
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--line)' }}>
          {projects.map((p, i) => (
            <li key={p.id}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onOpen(p)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto 80px',
                  alignItems: 'center',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer',
                  gap: 24,
                }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px,4vw,72px)', letterSpacing: '-0.03em' }}>{p.title}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', color: 'var(--fg-2)', textTransform: 'uppercase' }}>{p.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)' }}>{p.year}</span>
            </li>
          ))}
        </ul>
      </div>
      {hovered && (
        <div style={{
          position: 'fixed', pointerEvents: 'none', width: 340, height: 220,
          left: '60%', top: '30%',
          borderRadius: 10, overflow: 'hidden', zIndex: 30,
          border: '1px solid var(--line-2)',
          boxShadow: '0 30px 60px -20px rgba(0,0,0,.6)',
        }}>
          <ProjectArt project={hovered} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Hero3D });
