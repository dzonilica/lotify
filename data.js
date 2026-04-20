// Project data — 8 fictional web projects
// Each project has rich content for the scroll-driven case study page
window.LOTIFY_PROJECTS = [
  {
    id: 'aperture',
    slug: 'aperture',
    title: 'Aperture',
    tagline: { en: 'An editorial OS for photographers', sr: 'Urednički OS za fotografe' },
    year: '2025',
    client: 'Aperture Labs',
    role: { en: 'Design · Frontend · WebGL', sr: 'Dizajn · Frontend · WebGL' },
    stack: 'Next.js · Three.js · Rive',
    category: 'PLATFORM',
    tags: ['Product', 'WebGL', 'CMS'],
    color: '#4DA3FF',
    accent: '#FFE58A',
    bg: '#0A1420',
    heroPattern: 'grid',
    overview: {
      en: 'Aperture asked us to rebuild their photographer-facing portal as a single editorial surface — portfolio, client delivery, licensing and invoicing in one rhythm. We compressed four apps into one and made it feel like a magazine.',
      sr: 'Aperture je tražio da im preuredimo portal za fotografe kao jednu uredničku površinu — portfolio, isporuka klijentima, licenciranje i fakture u jednom ritmu. Sabili smo četiri aplikacije u jednu i učinili da deluje kao časopis.',
    },
    problem: {
      en: 'Four tools, four logins, four data models. Photographers were exporting to PDF just to send a deck.',
      sr: 'Četiri alata, četiri naloga, četiri modela. Fotografi su pravili PDF samo da pošalju predlog.',
    },
    approach: {
      en: 'We built a single spine — a Postgres-backed asset graph — and painted four surfaces on top. WebGL drives the cover and gallery; everything else is boring, fast HTML.',
      sr: 'Napravili smo jednu kičmu — graf resursa nad Postgresom — i nacrtali četiri površine preko. WebGL pogoni cover i galeriju; sve ostalo je dosadan, brz HTML.',
    },
    outcome: {
      en: '41% fewer support tickets. Median time-to-send-deck went from 18 minutes to 42 seconds.',
      sr: '41% manje tiketa podrške. Srednje vreme slanja predloga — 18 minuta → 42 sekunde.',
    },
    stats: [
      { n: '41%', l: { en: 'fewer support tickets', sr: 'manje tiketa' } },
      { n: '96', l: { en: 'Lighthouse performance', sr: 'Lighthouse performans' } },
      { n: '4→1', l: { en: 'apps unified', sr: 'aplikacije spojene' } },
      { n: '12ms', l: { en: 'p95 interaction latency', sr: 'p95 latencija' } },
    ],
  },
  {
    id: 'havana',
    slug: 'havana',
    title: 'Havana',
    tagline: { en: 'Banking for people who hate banking', sr: 'Banka za ljude koji mrze banke' },
    year: '2025',
    client: 'Havana Financial',
    role: { en: 'Brand · Web · Product', sr: 'Brend · Web · Proizvod' },
    stack: 'SvelteKit · Supabase · Framer Motion',
    category: 'FINTECH',
    tags: ['Product', 'Brand', 'Motion'],
    color: '#FF8A3D',
    accent: '#2BFFCF',
    bg: '#1A0F08',
    heroPattern: 'wave',
    overview: {
      en: 'A Serbian neobank needed to launch in six weeks. We rewrote the marketing site, onboarding flow, and the entire landing experience — with a brand that actually looks like it was made by humans.',
      sr: 'Srpskoj neobanci je trebalo lansiranje za šest nedelja. Preradili smo marketing sajt, onboarding tok i čitav landing — sa brendom koji stvarno izgleda kao da su ga ljudi pravili.',
    },
    problem: {
      en: 'Every EU neobank looks the same. Soft pastels, stock photos of diverse smiling people, and zero personality.',
      sr: 'Svaka EU neobanka izgleda isto. Meki pastelni tonovi, stock fotke nasmejanih ljudi i nula ličnosti.',
    },
    approach: {
      en: 'Editorial typography, warm palette pulled from rakia bottles and Belgrade awnings, and micro-copy in the voice of a smart friend.',
      sr: 'Urednička tipografija, topla paleta povučena iz flaša rakije i beogradskih tendi, i mikro-copy u glasu pametnog prijatelja.',
    },
    outcome: {
      en: '3.1× conversion vs. the previous landing. Press picked it up organically.',
      sr: '3.1× bolja konverzija u odnosu na prethodni landing. Mediji su pokupili organski.',
    },
    stats: [
      { n: '3.1×', l: { en: 'conversion lift', sr: 'rast konverzije' } },
      { n: '6 wks', l: { en: 'design to launch', sr: 'dizajn do lansiranja' } },
      { n: '28k', l: { en: 'week-one signups', sr: 'prijava u prvoj nedelji' } },
      { n: '4.9', l: { en: 'App Store rating', sr: 'ocena na App Store' } },
    ],
  },
  {
    id: 'meridian',
    slug: 'meridian',
    title: 'Meridian',
    tagline: { en: 'Docs that render reality', sr: 'Dokumenti koji renderuju stvarnost' },
    year: '2024',
    client: 'Meridian CAD',
    role: { en: 'Product Design · Frontend', sr: 'Dizajn proizvoda · Frontend' },
    stack: 'React · WebGPU · Rust (WASM)',
    category: 'TOOLS',
    tags: ['Product', 'Interface'],
    color: '#B794F6',
    accent: '#F6E05E',
    bg: '#110A1F',
    heroPattern: 'blueprint',
    overview: {
      en: 'A browser-first CAD tool for architects. We designed and built the editor — multiplayer cursors, commandable panels, and a renderer that runs at 120fps on a MacBook Air.',
      sr: 'CAD alat za arhitekte u browseru. Dizajnirali smo i napravili editor — multiplayer kursore, komandne panele, i renderer koji radi 120fps na MacBook Air-u.',
    },
    problem: {
      en: 'AutoCAD and Revit are 40 years of UI stacked on each other. Nothing for the next generation.',
      sr: 'AutoCAD i Revit su 40 godina UI-a naslaganog jedno na drugo. Ništa za narednu generaciju.',
    },
    approach: {
      en: 'Command palette first. Panels as plugins. A design system expressed as a grammar, not a sticker sheet.',
      sr: 'Komandna paleta prvo. Paneli kao plagini. Design sistem kao gramatika, ne kao nalepnica.',
    },
    outcome: {
      en: 'Seed round closed three weeks after launch. 2,400 studios in private beta.',
      sr: 'Seed runda zatvorena tri nedelje posle lansiranja. 2.400 studija u privatnoj beti.',
    },
    stats: [
      { n: '120fps', l: { en: 'editor target', sr: 'cilj editora' } },
      { n: '2.4k', l: { en: 'studios in beta', sr: 'studija u beti' } },
      { n: '0', l: { en: 'native installs', sr: 'nativnih instalacija' } },
      { n: '$8M', l: { en: 'seed round', sr: 'seed runda' } },
    ],
  },
  {
    id: 'northwind',
    slug: 'northwind',
    title: 'Northwind',
    tagline: { en: 'A logistics dashboard you actually read', sr: 'Logistički dashboard koji se zaista čita' },
    year: '2024',
    client: 'Northwind Freight',
    role: { en: 'Design · Data viz', sr: 'Dizajn · Vizualizacija podataka' },
    stack: 'Next.js · D3 · DuckDB',
    category: 'DASHBOARD',
    tags: ['Interface', 'Data'],
    color: '#2BFFCF',
    accent: '#FF5C8A',
    bg: '#081816',
    heroPattern: 'dots',
    overview: {
      en: 'The operations dashboard for a European freight network. Every decision for 12,000 drivers flows through this one screen.',
      sr: 'Operativni dashboard evropske transportne mreže. Svaka odluka za 12.000 vozača prolazi kroz ovaj ekran.',
    },
    problem: {
      en: 'Dispatchers were alt-tabbing between six systems. Mis-routes cost the company €4M/year.',
      sr: 'Dispečeri su alt-tabovali između šest sistema. Pogrešne rute su koštale €4M godišnje.',
    },
    approach: {
      en: 'Everything on one canvas. Ambient alerts, not modals. A keyboard-first IDE for moving trucks.',
      sr: 'Sve na jednom platnu. Ambijentalni alarmi, ne modali. Keyboard-first IDE za kretanje kamiona.',
    },
    outcome: {
      en: '73% reduction in mis-routes within the first quarter.',
      sr: '73% manje pogrešnih ruta u prvom kvartalu.',
    },
    stats: [
      { n: '73%', l: { en: 'fewer mis-routes', sr: 'manje grešaka' } },
      { n: '12k', l: { en: 'drivers supported', sr: 'vozača' } },
      { n: '€4M', l: { en: 'annual savings', sr: 'godišnja ušteda' } },
      { n: '28', l: { en: 'countries live', sr: 'zemalja u radu' } },
    ],
  },
  {
    id: 'atlas',
    slug: 'atlas',
    title: 'Atlas',
    tagline: { en: 'A map for the inside of your company', sr: 'Mapa za unutrašnjost tvoje firme' },
    year: '2024',
    client: 'Atlas Systems',
    role: { en: 'Brand · Web', sr: 'Brend · Web' },
    stack: 'Astro · Three.js · Sanity',
    category: 'MARKETING',
    tags: ['Brand', 'Web'],
    color: '#F6E05E',
    accent: '#4DA3FF',
    bg: '#1A1708',
    heroPattern: 'lines',
    overview: {
      en: 'Launch site for an internal-tools platform. The brief was one sentence: "make it obvious why we exist."',
      sr: 'Launch sajt za platformu internih alata. Brief je bio jedna rečenica: „napravi očiglednim zašto postojimo.“',
    },
    problem: {
      en: 'B2B infra sites all look identical — blue gradient, smiling avatars, "AI-powered" somewhere.',
      sr: 'B2B infra sajtovi svi izgledaju isto — plavi gradijent, nasmejani avatari, negde „AI-powered“.',
    },
    approach: {
      en: 'Treated the homepage like a cover of a book. One statement, one diagram that moves, one CTA.',
      sr: 'Tretirali smo homepage kao korice knjige. Jedna izjava, jedan dijagram koji se kreće, jedan CTA.',
    },
    outcome: {
      en: 'Design community Tweet went viral. Inbound leads 4× in month one.',
      sr: 'Tweet dizajn zajednice postao viralan. Inbound lidovi 4× u prvom mesecu.',
    },
    stats: [
      { n: '4×', l: { en: 'inbound lift', sr: 'rast inbound-a' } },
      { n: '100', l: { en: 'Lighthouse', sr: 'Lighthouse' } },
      { n: '62kb', l: { en: 'homepage weight', sr: 'veličina homepage-a' } },
      { n: '1', l: { en: 'CTA on page', sr: 'CTA na strani' } },
    ],
  },
  {
    id: 'pulse',
    slug: 'pulse',
    title: 'Pulse',
    tagline: { en: 'Live event tickets, done well', sr: 'Karte za događaje, kako treba' },
    year: '2025',
    client: 'Pulse Live',
    role: { en: 'Product · Brand', sr: 'Proizvod · Brend' },
    stack: 'Remix · Postgres · Stripe',
    category: 'ECOMMERCE',
    tags: ['Product', 'Brand'],
    color: '#FF5C8A',
    accent: '#2BFFCF',
    bg: '#200913',
    heroPattern: 'wave',
    overview: {
      en: 'A ticketing platform born in Belgrade, scaling across the Balkans. We built checkout, the organiser dashboard, and the brand.',
      sr: 'Platforma za karte rođena u Beogradu, širi se po Balkanu. Napravili smo checkout, organizatorski dashboard i brend.',
    },
    problem: {
      en: 'Ticketmaster fees eat a third of independent event revenue. Local artists deserve better margins.',
      sr: 'Ticketmaster takse pojedu trećinu prihoda nezavisnih događaja. Lokalni umetnici zaslužuju bolje marže.',
    },
    approach: {
      en: 'One-click checkout, organiser-first UX, and a brand that sounds like a friend not a corporation.',
      sr: 'Jedan-klik checkout, UX koji stavlja organizatore prvo i brend koji zvuči kao prijatelj a ne korporacija.',
    },
    outcome: {
      en: '120k tickets moved in the first festival season. Now the default in six countries.',
      sr: '120k karata u prvoj festivalskoj sezoni. Sad default u šest zemalja.',
    },
    stats: [
      { n: '120k', l: { en: 'tickets sold', sr: 'prodatih karata' } },
      { n: '6', l: { en: 'countries live', sr: 'zemalja' } },
      { n: '1.8%', l: { en: 'checkout fee', sr: 'checkout provizija' } },
      { n: '11s', l: { en: 'median checkout', sr: 'prosečni checkout' } },
    ],
  },
  {
    id: 'lumen',
    slug: 'lumen',
    title: 'Lumen',
    tagline: { en: 'Reading, reinvented for the phone', sr: 'Čitanje, osmišljeno za telefon' },
    year: '2023',
    client: 'Lumen Books',
    role: { en: 'Product · Motion', sr: 'Proizvod · Pokret' },
    stack: 'React Native · Reanimated · GraphQL',
    category: 'MOBILE',
    tags: ['Product', 'Motion'],
    color: '#FFE58A',
    accent: '#B794F6',
    bg: '#1F1A08',
    heroPattern: 'dots',
    overview: {
      en: 'A new e-reader built around the way people actually read on phones — in five-minute chunks, while commuting, often in bed.',
      sr: 'Novi e-reader oko načina na koji ljudi stvarno čitaju na telefonu — u deonicama od pet minuta, u prevozu, često u krevetu.',
    },
    problem: {
      en: 'Kindle is brilliant on Kindle and miserable on the phone. Apple Books forgot to ship taste.',
      sr: 'Kindle je sjajan na Kindle uređaju i mučan na telefonu. Apple Books je zaboravio ukus.',
    },
    approach: {
      en: 'Typography-first. Gestures over buttons. A reading streak system that does not feel like Duolingo.',
      sr: 'Tipografija na prvom mestu. Gestovi umesto dugmadi. Sistem niski čitanja koji ne podseća na Duolingo.',
    },
    outcome: {
      en: 'Featured in App Store three times. 340k monthly readers and growing.',
      sr: 'Featured na App Store-u tri puta. 340k mesečnih čitalaca i raste.',
    },
    stats: [
      { n: '340k', l: { en: 'MAU', sr: 'MAU' } },
      { n: '3×', l: { en: 'App Store features', sr: 'App Store featured' } },
      { n: '4.8', l: { en: 'rating', sr: 'ocena' } },
      { n: '22m', l: { en: 'median session', sr: 'prosečna sesija' } },
    ],
  },
  {
    id: 'orbit',
    slug: 'orbit',
    title: 'Orbit',
    tagline: { en: 'Calendar for teams that ship', sr: 'Kalendar za timove koji isporučuju' },
    year: '2025',
    client: 'Orbit Inc.',
    role: { en: 'Design · Frontend', sr: 'Dizajn · Frontend' },
    stack: 'Next.js · CRDT · WebSockets',
    category: 'PRODUCTIVITY',
    tags: ['Product', 'Interface'],
    color: '#E8E8E8',
    accent: '#4DA3FF',
    bg: '#0E0E10',
    heroPattern: 'grid',
    overview: {
      en: 'A calendar for engineering managers. Replaces Google Cal + Linear roadmap + a dozen Slack polls with one timeline.',
      sr: 'Kalendar za engineering menadžere. Zamenjuje Google Cal + Linear roadmap + tucet Slack anketa jednom vremenskom osom.',
    },
    problem: {
      en: 'Calendars treat meetings and milestones as the same object. They are not.',
      sr: 'Kalendari tretiraju sastanke i mejlstonove kao isti objekat. Nisu.',
    },
    approach: {
      en: 'Two timelines, one surface: a human rhythm and a project rhythm. Keyboard shortcuts for everything.',
      sr: 'Dve vremenske ose, jedna površina: ljudski ritam i ritam projekta. Prečice za sve.',
    },
    outcome: {
      en: 'Now the calendar of choice at 400+ startups. Acquired by a bigger company we cannot name yet.',
      sr: 'Kalendar izbora u 400+ startup-a. Akvizicija od veće firme koju još ne možemo imenovati.',
    },
    stats: [
      { n: '400+', l: { en: 'startups using', sr: 'startap-a' } },
      { n: '99.99', l: { en: 'uptime %', sr: 'uptime %' } },
      { n: '60', l: { en: 'shortcuts', sr: 'prečica' } },
      { n: '1', l: { en: 'acquisition', sr: 'akvizicija' } },
    ],
  },
];

// Clients — placeholder wordmarks
window.LOTIFY_CLIENTS = [
  'APERTURE', 'HAVANA', 'MERIDIAN', 'NORTHWIND', 'ATLAS',
  'PULSE', 'LUMEN', 'ORBIT', 'VIONA', 'HALCYON',
  'KINETIC', 'SABLE', 'PROVIDENCE', 'TESSELLATE',
];

// Team
window.LOTIFY_TEAM = [
  { name: 'Milena K.', role: { en: 'Founder · Design', sr: 'Osnivač · Dizajn' }, initial: 'MK' },
  { name: 'Luka P.', role: { en: 'Founder · Engineering', sr: 'Osnivač · Inženjering' }, initial: 'LP' },
  { name: 'Ana V.', role: { en: 'Design Director', sr: 'Direktor dizajna' }, initial: 'AV' },
  { name: 'Stefan M.', role: { en: 'Tech Lead', sr: 'Tech Lead' }, initial: 'SM' },
  { name: 'Jelena T.', role: { en: 'Motion Designer', sr: 'Motion dizajner' }, initial: 'JT' },
  { name: 'Nikola R.', role: { en: 'Frontend Engineer', sr: 'Frontend inženjer' }, initial: 'NR' },
  { name: 'Ivana S.', role: { en: 'Producer', sr: 'Producent' }, initial: 'IS' },
  { name: 'Filip Đ.', role: { en: 'WebGL Engineer', sr: 'WebGL inženjer' }, initial: 'FĐ' },
];

// Feedback
window.LOTIFY_FEEDBACK = [
  {
    quote: {
      en: 'Lotify does that rare thing — they ship faster than our internal team and the work is sharper than the agency we fired. We renewed for three years.',
      sr: 'Lotify radi onu retku stvar — isporučuju brže od našeg internog tima i rad je oštriji od agencije koju smo otpustili. Obnovili smo na tri godine.',
    },
    by: 'Maya Oduya',
    role: { en: 'VP Product, Aperture', sr: 'VP proizvoda, Aperture' },
  },
  {
    quote: {
      en: 'They pushed back on our brief in week one and they were right. The launch site did in a month what our old marketing site never did.',
      sr: 'Odbili su naš brief prve nedelje i bili su u pravu. Launch sajt je za mesec dana uradio ono što stari marketing sajt nikad nije.',
    },
    by: 'Dejan Stojanović',
    role: { en: 'CEO, Havana', sr: 'CEO, Havana' },
  },
  {
    quote: {
      en: 'The editor felt impossible. They built it in a quarter and it runs at 120fps. I still do not understand how.',
      sr: 'Editor je delovao nemoguć. Napravili su ga za kvartal i radi na 120fps. I dalje ne razumem kako.',
    },
    by: 'Priya Jain',
    role: { en: 'Co-founder, Meridian', sr: 'Suosnivač, Meridian' },
  },
  {
    quote: {
      en: 'They care about details we would have shipped over. The hover state on our pricing page got a hand-written apology from a junior designer. Rare.',
      sr: 'Brinu o detaljima preko kojih bismo mi preskočili. Hover na pricing stranici dobio je ručno pisano izvinjenje od juniora. Retko.',
    },
    by: 'Marcus Leigh',
    role: { en: 'Head of Brand, Atlas', sr: 'Head of Brand, Atlas' },
  },
];
