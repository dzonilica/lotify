// Procedural SVG artwork for project tiles — no external assets, all CSS/SVG
const { useState, useEffect, useRef, useMemo, useCallback } = React;

function ProjectArt({ project, small = false }) {
  const { heroPattern, color, accent, bg, title, category } = project;
  const patterns = {
    grid: <GridArt color={color} accent={accent} bg={bg} title={title} category={category} />,
    wave: <WaveArt color={color} accent={accent} bg={bg} title={title} category={category} />,
    blueprint: <BlueprintArt color={color} accent={accent} bg={bg} title={title} category={category} />,
    dots: <DotsArt color={color} accent={accent} bg={bg} title={title} category={category} />,
    lines: <LinesArt color={color} accent={accent} bg={bg} title={title} category={category} />,
  };
  return patterns[heroPattern] || patterns.grid;
}

function GridArt({ color, accent, bg, title, category }) {
  return (
    <div className="art" style={{ background: bg }}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`g-${title}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="0.4" opacity="0.35" />
          </pattern>
          <radialGradient id={`rg-${title}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="420" height="260" fill={`url(#g-${title})`} />
        <rect width="420" height="260" fill={`url(#rg-${title})`} />
        <g transform="translate(210 130)">
          <circle r="60" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
          <circle r="90" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          <circle r="36" fill={accent} opacity="0.7" />
          <circle r="8" fill={color} />
        </g>
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="2">{category}</text>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">LOTIFY / {title.toUpperCase()}</text>
      </svg>
    </div>
  );
}

function WaveArt({ color, accent, bg, title, category }) {
  return (
    <div className="art" style={{ background: bg }}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`wg-${title}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="420" height="260" fill={bg} />
        {[...Array(14)].map((_, i) => (
          <path key={i}
            d={`M 0 ${40 + i * 16} Q 105 ${10 + i * 16} 210 ${40 + i * 16} T 420 ${40 + i * 16}`}
            fill="none" stroke={i % 3 === 0 ? accent : color} strokeWidth={i % 3 === 0 ? 1 : 0.4} opacity={0.2 + (i / 30)} />
        ))}
        <circle cx="320" cy="80" r="44" fill={`url(#wg-${title})`} opacity="0.6" />
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="2">{category}</text>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">LOTIFY / {title.toUpperCase()}</text>
      </svg>
    </div>
  );
}

function BlueprintArt({ color, accent, bg, title, category }) {
  return (
    <div className="art" style={{ background: bg }}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="260" fill={bg} />
        <g stroke={color} strokeWidth="0.5" fill="none" opacity="0.6">
          {[...Array(10)].map((_, i) => (<line key={`v${i}`} x1={i * 42} y1="0" x2={i * 42} y2="260" />))}
          {[...Array(7)].map((_, i) => (<line key={`h${i}`} x1="0" y1={i * 40} x2="420" y2={i * 40} />))}
        </g>
        {/* floor plan abstraction */}
        <g stroke={color} strokeWidth="1.4" fill="none">
          <rect x="60" y="60" width="300" height="140" />
          <line x1="180" y1="60" x2="180" y2="140" />
          <line x1="60" y1="140" x2="260" y2="140" />
          <line x1="260" y1="140" x2="260" y2="200" />
          <circle cx="220" cy="175" r="14" fill="none" />
        </g>
        <g fill={accent}>
          <rect x="176" y="56" width="8" height="8" />
          <rect x="256" y="136" width="8" height="8" />
        </g>
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="2">{category}</text>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">LOTIFY / {title.toUpperCase()}</text>
      </svg>
    </div>
  );
}

function DotsArt({ color, accent, bg, title, category }) {
  const dots = [];
  for (let y = 0; y < 14; y++) {
    for (let x = 0; x < 24; x++) {
      const cx = 8 + x * 18;
      const cy = 8 + y * 18;
      const dx = cx - 210, dy = cy - 130;
      const d = Math.sqrt(dx * dx + dy * dy);
      const r = Math.max(0.6, 3 - d / 60);
      dots.push(<circle key={`${x}-${y}`} cx={cx} cy={cy} r={r} fill={d < 80 ? accent : color} opacity={Math.max(0.2, 1 - d / 180)} />);
    }
  }
  return (
    <div className="art" style={{ background: bg }}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="260" fill={bg} />
        {dots}
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="2">{category}</text>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">LOTIFY / {title.toUpperCase()}</text>
      </svg>
    </div>
  );
}

function LinesArt({ color, accent, bg, title, category }) {
  return (
    <div className="art" style={{ background: bg }}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="260" fill={bg} />
        {[...Array(28)].map((_, i) => {
          const y1 = (i * 9) % 260;
          const y2 = (i * 17 + 40) % 260;
          return <line key={i} x1="0" y1={y1} x2="420" y2={y2}
            stroke={i % 5 === 0 ? accent : color}
            strokeWidth={i % 5 === 0 ? 1 : 0.4}
            opacity={0.25 + (i % 5 === 0 ? 0.3 : 0)}
          />;
        })}
        <circle cx="330" cy="100" r="34" fill={accent} opacity="0.5" />
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="2">{category}</text>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">LOTIFY / {title.toUpperCase()}</text>
      </svg>
    </div>
  );
}

Object.assign(window, { ProjectArt });
