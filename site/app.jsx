/* Nodecraft — AI web agency landing
   Single-file React shell. Mostly static markup so users can direct-edit
   text in the browser; interactivity lives in FAQ + service nav + tweaks. */

const { useState, useEffect } = React;

const BRAND = "Summit Ridge Solutions";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F04E2C",
  "bg": "#F3EFEA",
  "density": "regular",
  "heroStyle": "code-window",
  "showWatermark": true
}/*EDITMODE-END*/;

/* ── Icons ─────────────────────────────────────────────────── */
const Ico = {
  arrowUR: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowR: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowL: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2" strokeLinecap="round"/>
    </svg>
  ),
  node: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/>
      <circle cx="12" cy="18" r="2.4"/>
      <path d="M8 7l3 9M16 7l-3 9" strokeLinecap="round"/>
    </svg>
  ),
  chat: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M4 6.5a2.5 2.5 0 012.5-2.5h11A2.5 2.5 0 0120 6.5v8A2.5 2.5 0 0117.5 17H10l-4 4v-4H6.5A2.5 2.5 0 014 14.5v-8z" strokeLinejoin="round"/>
      <path d="M9 10h6M9 13h4" strokeLinecap="round"/>
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" strokeLinejoin="round"/>
      <path d="M9 12l2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.4L4.5 21H1.5l7.4-8.6L1 3h6.5l4.5 5.9L17.5 3z"/>
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M4.5 3a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM3 8.5h3v12H3v-12zm6 0h2.9v1.6c.4-.8 1.5-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5v6.8h-3v-6c0-1.4 0-3.3-2-3.3s-2.4 1.6-2.4 3.2v6.1H9v-12z"/>
    </svg>
  ),
  insta: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  gh: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.6 3 8.6 7.2 10 .5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.7 0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10C22.5 6.2 17.8 1.5 12 1.5z"/>
    </svg>
  )
};

/* ── Tiny pieces ─────────────────────────────────────────── */
const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>;

function CountUp({ to, duration = 1500 }) {
  const ref = React.useRef(null);
  const [val, setVal] = useState(0);
  const startedRef = React.useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

const Btn = ({ children, variant = "primary", as = "button", ...p }) => {
  const Tag = as;
  const cls = variant === "ghost" ? "btn btn-ghost" : variant === "dark" ? "btn btn-dark" : "btn";
  return (
    <Tag className={cls} {...p}>
      <span>{children}</span>
      <span className="arr"><Ico.arrowUR/></span>
    </Tag>
  );
};

const ImgPh = ({ label, theme = "blue" }) => (
  <div className={`svc-media theme-${theme}`}>
    <div className="imgph">
      <div className="imgph-card">{label}</div>
    </div>
  </div>
);

/* ── Workflow mock (scroll-reveal nodes) ─────────────────── */
const WF_NODES = [
  { id: "form",  x:  50, y: 230, w: 240, h: 110, color: "#2f6a55", title: "Form submitted",  sub: "New user created" },
  { id: "ai",    x: 380, y: 230, w: 240, h: 110, color: "#4f3a8a", title: "AI agent",        sub: "Reviews + decides" },
  { id: "mgr",   x: 710, y: 230, w: 220, h: 110, color: "#9a6a1f", title: "Manager?",        sub: "Check role" },
  { id: "slack", x: 1020,y:  60, w: 260, h: 110, color: "#2a4f80", title: "Add to channel",  sub: "Slack invite sent" },
  { id: "rec",   x: 1020,y: 400, w: 260, h: 110, color: "#8a3a2a", title: "Update profile",  sub: "Record saved" }
];

function WorkflowMock() {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height * 0.5)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const revealAt = (i) => 0.15 + (i / 5) * 0.7;
  const visible = (i) => Math.max(0, Math.min(1, (progress - revealAt(i)) / 0.08));

  return (
    <div className="wf-inner" ref={ref}>
      <div className="wf-browser">
        <div className="wf-chrome">
          <div className="wf-dots">
            <span style={{background:"#f37165"}}/>
            <span style={{background:"#f5bd4a"}}/>
            <span style={{background:"#5ec469"}}/>
          </div>
          <div className="wf-url">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#7a756c" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>
            summitridge.studio / flows / onboarding
          </div>
          <div className="wf-tab-actions"><span/><span/><span/></div>
        </div>
        <div className="wf-stage">
          <svg viewBox="0 0 1340 600" className="wf-svg" preserveAspectRatio="xMidYMid meet">
        <g className="wf-edges" stroke="#a8a098" strokeWidth="2" fill="none">
          <path d="M290 285 L380 285" markerEnd="url(#wf-arr)" style={{opacity: visible(1)}}/>
          <path d="M620 285 L710 285" markerEnd="url(#wf-arr)" style={{opacity: visible(2)}}/>
          <path d="M930 270 L990 270 L990 115 L1020 115" markerEnd="url(#wf-arr)" style={{opacity: visible(3)}}/>
          <path d="M930 300 L990 300 L990 455 L1020 455" markerEnd="url(#wf-arr)" style={{opacity: visible(4)}}/>
        </g>
        <defs>
          <marker id="wf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#a8a098"/>
          </marker>
        </defs>
        <text x="998" y="200" fill="#9a958d" fontSize="18" fontFamily="Inter, sans-serif" style={{opacity: visible(3)}}>yes</text>
        <text x="998" y="370" fill="#9a958d" fontSize="18" fontFamily="Inter, sans-serif" style={{opacity: visible(4)}}>no</text>

        {WF_NODES.map((n, i) => {
          const v = visible(i);
          return (
            <g key={n.id} style={{opacity: v, transform: `translate(0, ${(1 - v) * 8}px)`, transformOrigin: "center", transformBox: "fill-box", transition: "opacity .2s ease"}}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="16" fill={n.color}/>
              <text x={n.x + 24} y={n.y + 48} fill="#fff" fontSize="26" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.01em">{n.title}</text>
              <text x={n.x + 24} y={n.y + 82} fill="rgba(255,255,255,0.78)" fontSize="20" fontFamily="Inter, sans-serif">{n.sub}</text>
            </g>
          );
        })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Website mock (bubbly hero, parallax bg) ─────────────── */
function WebsiteMock() {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--wm-py", `${(p - 0.5) * el.clientHeight * 0.35}px`);
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Cursor path in mockup-natural coordinates (1200×900 frame, .wm-card at left:32, top:32)
  // Start lower-right area, travel up to "About" link in nav.
  // About link sits at roughly x=600, y=82 in card coords → absolute (632, 114)
  const aboutX = 632, aboutY = 110;
  const startX = 900, startY = 540;
  // Ease cursor along progress 0.05 → 0.55, click at 0.55, hold past
  const t = Math.max(0, Math.min(1, (progress - 0.05) / 0.5));
  const ease = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
  const cx = startX + (aboutX - startX) * ease;
  const cy = startY + (aboutY - startY) * ease;
  const clicked = progress > 0.55;
  const clickPulse = progress > 0.55 && progress < 0.62;
  return (
    <div className="wm-inner" ref={ref}>
      <div className="wm-frame">
        <div className="wm-bg" aria-hidden>
          {/* layered soft scene: sky → distant ridge → mid hill → foreground */}
          <div className="wm-sky"/>
          <div className="wm-clouds"/>
          <div className="wm-ridge"/>
          <div className="wm-hill"/>
          <div className="wm-cabin">
            <div className="wm-cabin-roof"/>
            <div className="wm-cabin-door"/>
            <div className="wm-cabin-win"/>
            <div className="wm-cabin-win two"/>
          </div>
          <div className="wm-grass"/>
        </div>
        <div className="wm-card">
          <div className="wm-nav">
            <div className="wm-brand">Lumenform</div>
            <div className="wm-links">
              <span>Home</span>
              <span className={clicked ? "wm-link-active" : ""}>About</span>
              <span>Studio</span><span>Journal</span>
            </div>
            <div className="wm-nav-right">
              <div className="wm-cart">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4h2l2 12h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
              </div>
              <div className="wm-contact">
                Contact
                <span className="wm-arr"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
              </div>
            </div>
          </div>
          <div className="wm-eyebrow">Built for the long view</div>
          <div className="wm-icons">
            <div className="wm-ico wm-ico-dark">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 3l-6 11h5l-1 7 7-11h-5l1-7z" fill="#fff"/></svg>
            </div>
            <div className="wm-ico wm-ico-lime">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#111" strokeWidth="1.8"><circle cx="12" cy="12" r="2.5" fill="#111"/><path d="M12 4l3 6-3 2-3-2 3-6zM20 14l-6 1 0 3.5 2 2.5 4-7zM4 14l6 1 0 3.5-2 2.5-4-7z" fill="#111"/></svg>
            </div>
          </div>
          <div className="wm-blurb">
            Hand-crafted sites that move the way ideas do —<br/>
            calm, considered, and ready when your customers are.
          </div>
          <div className="wm-display">
            <div>Ideas</div>
            <div>In Frame</div>
          </div>
          <div className="wm-scroll">Scroll to discover more <span>↓</span></div>
          <div className="wm-cursor" style={{left: cx, top: cy}}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M5 3 L5 19 L9 15 L11.5 21 L14 20 L11.5 14 L17 14 Z" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            {clickPulse && <span className="wm-click-ring"/>}
          </div>
        </div>
        <div className="wm-belowfold">
          <div className="wm-bf-label">[ About us ]</div>
          <div className="wm-bf-text">
            Lumenform is a small studio designing websites and brand systems
            for founders who care about the details — from the first click to
            the long-term feel of the work…
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Notion Kanban mock ─────────────────────────────────── */
// Bubbly v2 palette — pastel skeleton cards per column
const NK_COLS = [
  { key: "new",       label: "New request", dot: "#2A8AE6",
    headBg: "#C8E1F7", headFg: "#0D4A8C",
    cardBg: "#DCEAF8", barBg: "#9DC3EC",
    cards: [
      { dots: [{ s: 28, c: "#5DA3E0" }], mini: 100 },
      { dots: [{ s: 28, c: "#85B7EB" }], mini: 45 }
    ]},
  { key: "reviewing", label: "Reviewing", dot: "#E89A2A",
    headBg: "#F8DDA8", headFg: "#6F3F08",
    cardBg: "#FAE7BC", barBg: "#EBBE6C",
    cards: [
      { dots: [{ s: 28, c: "#E5A648" }], mini: 100 },
      { dots: [{ s: 28, c: "#EF9F27" }], mini: 70 },
      { dots: [{ s: 20, c: "#FAC775" }, { s: 20, c: "#FDDFA8" }] }
    ]},
  { key: "quoting",   label: "Quoting", dot: "#D8602A",
    headBg: "#F6CFC0", headFg: "#7A2C12",
    cardBg: "#F8D9CC", barBg: "#E89C7E",
    cards: [
      { dots: [{ s: 28, c: "#DD7755" }], mini: 50 },
      { dots: [{ s: 28, c: "#D85A30" }], mini: 80 }
    ]},
  { key: "booked",    label: "Booked", dot: "#2DAA7C",
    headBg: "#B6E6D2", headFg: "#0A5742",
    cardBg: "#C8EDDC", barBg: "#7DD0AE",
    cards: [
      { dots: [{ s: 28, c: "#3DB888" }], mini: 55 },
      { dots: [{ s: 20, c: "#9FE1CB" }, { s: 20, c: "#5DCAA5" }] },
      { dots: [{ s: 28, c: "#1D9E75" }], mini: 35 }
    ]},
  { key: "editing",   label: "Editing", dot: "#6E63D8",
    headBg: "#D6D2F4", headFg: "#3E368F",
    cardBg: "#E1DEF8", barBg: "#B3ACE8",
    cards: [
      { dots: [{ s: 28, c: "#8A82DE" }], mini: 80 },
      { dots: [{ s: 28, c: "#7F77DD" }], mini: 40 }
    ]},
  { key: "delivered", label: "Delivered", dot: "#C53A6B",
    headBg: "#F4C5D6", headFg: "#7C2444",
    cardBg: "#F6D4E0", barBg: "#E48DAE",
    cards: [
      { dots: [{ s: 28, c: "#D86B92" }], mini: 100 },
      { dots: [{ s: 20, c: "#ED93B1" }, { s: 20, c: "#F4C0D1" }] },
      { dots: [{ s: 28, c: "#D4537E" }], mini: 65 },
      { dots: [{ s: 20, c: "#F4C0D1" }, { s: 20, c: "#ED93B1" }, { s: 20, c: "#D4537E" }] }
    ]}
];

function NKCard({ c, col, live, glow }) {
  return (
    <div className={`nk-card${live ? " live" : ""}`} data-glow={glow} style={{background: col.cardBg}}>
      <div className="nk-dot-row">
        {c.dots.map((d, i) => (
          <span key={i} className="nk-bdot" style={{width: d.s, height: d.s, background: d.c}}/>
        ))}
        <span className="nk-bbar" style={{background: col.barBg, "--bar-base": col.barBg}}/>
      </div>
      {c.mini != null && (
        <span className="nk-bmini" style={{background: col.barBg, "--bar-base": col.barBg, width: `${c.mini}%`}}/>
      )}
    </div>
  );
}

function NotionKanban() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // progress: 0 when card enters bottom of viewport, 1 when it exits top
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      // pan range: card is ~15% wider than its container; pan by -container width * 0.15
      const range = el.clientWidth * 0.06;
      el.style.setProperty("--nk-px", `${-p * range}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="notion-shot-inner" ref={ref}>
    <div className="nk-frame">
      <div className="nk-board">
        {NK_COLS.map((col, ci) => (
          <div className="nk-col" key={col.key}>
            <div className="nk-col-head" style={{background: col.headBg, color: col.headFg}}>
              {col.label}
            </div>
            {col.cards.map((c, i) => (
              <NKCard
                c={c}
                col={col}
                key={i}
                live={i === 0}
                glow={["blue","amber","orange","green","purple","pink"][ci % 6]}
              />
            ))}
          </div>
        ))}
        <div className="nk-flyer" aria-hidden>
          <span className="fdot"/>
          <div className="fbars">
            <span className="fbar"/>
            <span className="fbar short"/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

/* ── Sections ────────────────────────────────────────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#">
          <span className="brand-mark"/>
          <span>{BRAND}</span>
        </a>
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <Btn>Start a project</Btn>
        </div>
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span/><span/><span/>
        </button>
      </div>
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <a href="#" onClick={close}>Home</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#services" onClick={close}>Services</a>
        <a href="#process" onClick={close}>Process</a>
        <a href="#faq" onClick={close}>FAQ</a>
        <Btn onClick={close}>Start a project</Btn>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-card">
          <div className="hero-image"/>
          <div className="hero-window">
            <div className="hw-chrome">
              <span style={{background:"#ff5f57"}}/>
              <span style={{background:"#febc2e"}}/>
              <span style={{background:"#28c840"}}/>
              <div className="hw-tab">page.tsx</div>
              <div className="hw-deploy">
                <span className="hw-dot"/> Deployed · summitridge.studio
              </div>
            </div>
            <div className="hw-body">
              <div className="hw-gutter">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <span key={n}>{n}</span>)}
              </div>
              <div className="hw-code">
                <div><span className="c-kw">export default function</span> <span className="c-fn">Page</span>() {'{'}</div>
                <div className="ind">  <span className="c-kw">return</span> (</div>
                <div className="ind2">    &lt;<span className="c-tag">Hero</span></div>
                <div className="ind3">      <span className="c-attr">title</span>=<span className="c-str">"Summit Ridge"</span></div>
                <div className="ind3">      <span className="c-attr">cta</span>=<span className="c-str">"Book a call"</span></div>
                <div className="ind3">      <span className="c-attr">onSubmit</span>={'{'}<span className="c-fn">toNotion</span>{'}'}</div>
                <div className="ind2">    /&gt;</div>
                <div className="ind">  )</div>
                <div>{'}'}</div>
                <div className="hw-spacer"/>
                <div className="hw-status">
                  <span className="hw-ok">●</span> Build passed · pushed to <span className="c-attr">main</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-overlay"/>
          <span className="hero-tag"><span className="dot"/>Ready for work — booking now</span>
          <div className="hero-content">
            <div>
              <h1 className="display">Ship a custom site<br/>in days, not months</h1>
              <p className="hero-sub">
                Hand-built websites and AI automations that turn forms into
                fulfilled work — without anyone copy-pasting into a spreadsheet.
              </p>
              <Btn>Book an intro call</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="tight">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <Eyebrow>About us</Eyebrow>
            <div className="about-mark mono">EST. 2026</div>
            <div className="about-watermark" data-watermark>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#0E0E0E" strokeWidth="1.2" opacity="0.6">
                  <circle cx="40" cy="60" r="14"/>
                  <circle cx="160" cy="60" r="14"/>
                  <circle cx="100" cy="150" r="14"/>
                  <path d="M52 70l40 70M148 70l-40 70M54 60h92"/>
                </g>
                <g fontFamily="Geist Mono, monospace" fontSize="9" fill="#0E0E0E" opacity="0.7">
                  <text x="20" y="44">FORM</text>
                  <text x="140" y="44">NOTION</text>
                  <text x="80" y="180">FULFILLMENT</text>
                </g>
              </svg>
            </div>
          </div>
          <div>
            <p className="about-lede">
              At {BRAND}, we build websites that <em>work for you while you sleep —</em>
              every form a structured task, every reply a draft already in your inbox,
              every customer routed through a system that thinks before you do.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="num mono"><CountUp to={120} duration={1800}/><small>+</small></div>
                <div className="lbl">Sites shipped on Vercel & GitHub</div>
              </div>
              <div className="stat">
                <div className="num mono"><CountUp to={7} duration={900}/><small>D</small></div>
                <div className="lbl">Average time to launch</div>
              </div>
              <div className="stat">
                <div className="num mono"><CountUp to={40} duration={2400}/><small>+</small></div>
                <div className="lbl">n8n flows in production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [idx, setIdx] = useState(1);
  const total = 4;
  return (
    <section id="services">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h2 className="display-md" style={{marginTop: 14}}>What we build</h2>
          </div>
          <div className="right">
            <button className="arr-btn" onClick={() => setIdx(Math.max(1, idx - 1))} aria-label="prev"><Ico.arrowL/></button>
            <button className="arr-btn" onClick={() => setIdx(Math.min(total, idx + 1))} aria-label="next"><Ico.arrowR/></button>
            <span>(SERVICES 0{idx}/0{total})</span>
          </div>
        </div>

        <div className="svc-grid">
          <article className="svc-card">
            <div className="svc-media website-shot">
              <WebsiteMock/>
            </div>
            <div className="svc-meta">
              <h3>Custom website build</h3>
              <span className="when mono">(LAUNCH IN 7 DAYS)</span>
            </div>
          </article>
          <article className="svc-card">
            <div className="svc-media workflow-shot">
              <WorkflowMock/>
            </div>
            <div className="svc-meta">
              <h3>n8n workflow automation</h3>
              <span className="when mono">(BUILT TO ORDER)</span>
            </div>
          </article>
        </div>

        <div className="svc-row">
          <article className="svc-row-card">
            <div className="svc-media notion-shot">
              <NotionKanban/>
            </div>
            <div className="svc-meta">
              <h3>Notion intake dashboard</h3>
              <span className="when mono">(INCLUDED)</span>
            </div>
          </article>
          <div className="svc-pitch">
            Every project ships with a system underneath — forms that route to Notion,
            replies drafted by AI, quotes generated on intake.
            <div className="cta-line">
              <Btn>Get a quote</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { ico: <Ico.spark/>, t: "Hand-built, not templated", d: "Real React + Next.js code on your own GitHub repo. You own it, you can leave us anytime." },
    { ico: <Ico.node/>,  t: "Automations that actually run", d: "n8n flows deployed to your stack — quote generation, CRM sync, ticket routing, the boring stuff." },
    { ico: <Ico.chat/>,  t: "AI replies, in your voice", d: "Inbox agents trained on your past emails and SOPs. They draft, you approve, your customer never waits." },
    { ico: <Ico.shield/>,t: "Hosted where you want", d: "Vercel, Cloudflare, your own GitHub Pages — your domain, your invoice, our handoff doc." }
  ];
  return (
    <section id="process">
      <div className="wrap">
        <div className="why">
          <div className="why-left">
            <div>
              <Eyebrow>Why teams pick us</Eyebrow>
              <h2 className="display-md" style={{marginTop: 14}}>Why companies hire {BRAND} to wire up their intake</h2>
            </div>
            <Btn variant="primary">Get a quote</Btn>
          </div>
          <div className="why-right">
            {items.map((it, i) => (
              <div className="why-card" key={i}>
                <div className="ico">{it.ico}</div>
                <div>
                  <h4>{it.t}</h4>
                  <p>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section>
      <div className="wrap">
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="display-md" style={{marginTop: 14}}>What clients say</h2>

        <div className="tst">
          <div>
            <div className="meta-label">Words from the ones<br/>who know us best</div>
            <div className="pct mono"><span className="plus">+</span>99<small>%</small></div>
            <div className="pct-lbl">Reply within 24h, every weekday</div>
          </div>
          <div>
            <div className="tst-quote">
              “From first click to signed contract, we handle the whole pipeline
              so our clients never chase a lead again.”
            </div>
            <div className="tst-foot">
              <div className="tst-author">
                <div className="avatar"/>
                <div>
                  <div className="name">Josh Holt</div>
                  <div className="role">Owner, Summit Ridge Solutions</div>
                </div>
              </div>
              <a className="arr-btn" aria-label="open testimonial on twitter"><Ico.twitter/></a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What do I get when I hire you?",
    a: "A production-ready website hosted on Vercel or GitHub, a Notion workspace wired to your forms, and any n8n automations we scoped — all on your own accounts so you own the keys."
  },
  {
    q: "How does the n8n automation work?",
    a: "We run n8n flows that watch your inbox and forms, draft replies with an LLM trained on your past responses, generate quotes from a pricing sheet, and push everything into Notion or your CRM. You approve, the customer hears back in minutes."
  },
  {
    q: "Can you integrate with my existing CRM?",
    a: "Yes. We've shipped flows for HubSpot, Pipedrive, Attio, Airtable, and plain Google Sheets. If it has an API or a webhook, we can wire it up."
  },
  {
    q: "What does a typical project cost and take?",
    a: "Most landings ship in 5–10 days. Sites with custom forms, Notion dashboards, and one or two automations run 7–14 days. We quote a fixed price after a 30-minute scoping call."
  },
  {
    q: "What happens after launch?",
    a: "You keep the GitHub repo, the Vercel project, and the n8n instance. We offer a monthly retainer for tweaks and new flows, but there's no lock-in — keep us on call or take it from here."
  }
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="wrap">
        <div className="faq-head">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display-md" style={{marginTop: 14}}>Frequently asked<br/>questions</h2>
          </div>
          <div className="right">
            Short answers to the questions we get every week. If yours isn't here,
            we'll cover it on the intro call — no slide deck, just answers.
          </div>
        </div>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className={`faq-item reveal ${open === i ? "open" : "collapsed"}`}
            style={{ transitionDelay: `${i * 90}ms` }}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <div className="qnum mono">{i + 1}</div>
            <div className="q">{f.q}</div>
            <div className="a">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="tight">
      <div className="wrap">
        <div className="final">
          <div className="final-left">
            <div>
              <h2 className="display-md">Ready to plug<br/>your inbox in?</h2>
              <p style={{marginTop: 16}}>
                Tell us what you're shipping and what's stuck on a spreadsheet.
                You'll have a scoped quote within 24 hours.
              </p>
            </div>
            <Btn variant="primary">Book intro call</Btn>
          </div>
          <div className="final-right"/>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <h3 className="foot-h">Let's wire up your next project</h3>
            <div className="foot-email">
              <input placeholder="your@email.com" type="email"/>
              <button aria-label="submit"><Ico.arrowUR/></button>
            </div>
          </div>
          <div>
            <div className="lbl">Contact</div>
            <div className="val">hello@nodecraft.studio<br/>+1 (415) 555 — 0142</div>
            <div className="lbl" style={{marginTop: 18}}>Office hours</div>
            <div className="val">Mon — Fri, 09:00 — 18:00 PT</div>
          </div>
          <div className="foot-cols">
            <div>
              <div className="lbl">Studio</div>
              <ul>
                <li>Services</li><li>Process</li><li>Case studies</li><li>Pricing</li>
              </ul>
            </div>
            <div>
              <div className="lbl">Resources</div>
              <ul>
                <li>n8n templates</li><li>Notion starter</li><li>Handoff guide</li><li>Changelog</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="brand">
            <span className="brand-mark"/>&nbsp;{BRAND}
          </div>
          <div className="links">
            <a>© 2026 {BRAND}. All rights reserved.</a>
            <a>Privacy</a>
            <a>Terms</a>
          </div>
          <div className="socials">
            <a><Ico.twitter/></a>
            <a><Ico.linkedin/></a>
            <a><Ico.insta/></a>
            <a><Ico.gh/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Tweaks ──────────────────────────────────────────────── */
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Theme"/>
      <TweakColor
        label="Accent"
        value={t.accent}
        options={["#F04E2C","#2F6BFF","#5BE889","#B66CFF","#0E0E0E"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakColor
        label="Background"
        value={t.bg}
        options={["#F3EFEA","#F4F2EE","#ECE9E2","#F5F1E8","#EDE9DF"]}
        onChange={(v) => setTweak("bg", v)}
      />
      <TweakSection label="Hero"/>
      <TweakRadio
        label="Hero visual"
        value={t.heroStyle}
        options={["code-window","grid-only","solid"]}
        onChange={(v) => setTweak("heroStyle", v)}
      />
      <TweakSection label="Layout"/>
      <TweakRadio
        label="Density"
        value={t.density}
        options={["compact","regular","comfy"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakToggle
        label="About watermark"
        value={t.showWatermark}
        onChange={(v) => setTweak("showWatermark", v)}
      />
    </TweaksPanel>
  );
}

/* ── Root ────────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Stagger-in observer for any `.reveal` element
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Apply tweaks to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--bg", t.bg);
    const densityPad = t.density === "compact" ? 56 : t.density === "comfy" ? 120 : 88;
    document.querySelectorAll("section").forEach(s => {
      if (!s.classList.contains("tight")) s.style.padding = `${densityPad}px 0`;
    });
    // Hero variant
    const heroImg = document.querySelector(".hero-image");
    if (heroImg) {
      heroImg.classList.remove("hv-grid","hv-solid","hv-code");
      heroImg.style.cssText = "";
      if (t.heroStyle === "grid-only") {
        heroImg.style.background = "linear-gradient(135deg,#0d2547,#1e5aa3)";
      } else if (t.heroStyle === "solid") {
        heroImg.style.background = "#0d2547";
      }
    }
    // After-element (code window) visibility
    const styleId = "__nc_hero_after";
    let st = document.getElementById(styleId);
    if (!st) { st = document.createElement("style"); st.id = styleId; document.head.appendChild(st); }
    st.textContent = t.heroStyle === "code-window"
      ? ""
      : `.hero-image::after { display: none; }`;
    // Watermark
    const wm = document.querySelector("[data-watermark]");
    if (wm) wm.style.display = t.showWatermark ? "grid" : "none";
  }, [t]);

  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <About/>
        <Services/>
        <Why/>
        <Testimonials/>
        <FAQ/>
        <FinalCta/>
      </main>
      <Footer/>
      <Tweaks t={t} setTweak={setTweak}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
