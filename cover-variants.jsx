// cover-variants.jsx — Anomify cover rendered in swappable background themes.
// Exposes <CoverFrame theme="..." pw={...}/> on window for the design canvas.

const COVER_THEMES = {
  ink: {
    name: "Ink",
    blurb: "Warm charcoal, cream type",
    cover: { backgroundColor: "#1b1814" },
    ink: "#f4f0e8", soft: "#cbc4b7", faint: "#928a7d",
    em: "oklch(0.76 0.12 252)", rule: "rgba(244,240,232,0.85)", corner: "#f4f0e8",
    line: "#f4f0e8", accent: "oklch(0.76 0.12 252)", anomaly: "#ea845f",
    figBg: "rgba(255,255,255,0.025)", figBorder: "rgba(244,240,232,0.4)", figGrid: "rgba(255,255,255,0.055)",
    tag: "oklch(0.76 0.12 252)",
  },
  blueprint: {
    name: "Blueprint",
    blurb: "Deep navy, drafting grid",
    cover: {
      backgroundColor: "#0e2c4d",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.10) 1px,transparent 1px)",
      backgroundSize: "44px 44px",
    },
    ink: "#eef4fb", soft: "#bccfe4", faint: "#7f9bbb",
    em: "#8fd0ff", rule: "rgba(238,244,251,0.8)", corner: "#9ec4ec",
    line: "#dde9f7", accent: "#8fd0ff", anomaly: "#ffac76",
    figBg: "rgba(255,255,255,0.04)", figBorder: "rgba(255,255,255,0.28)", figGrid: "rgba(255,255,255,0.08)",
    tag: "#8fd0ff",
  },
  cobalt: {
    name: "Cobalt",
    blurb: "Solid brand blue, bold",
    cover: { backgroundColor: "oklch(0.52 0.15 252)" },
    ink: "#fbfaf7", soft: "rgba(255,255,255,0.84)", faint: "rgba(255,255,255,0.62)",
    em: "#ffd9a3", rule: "rgba(255,255,255,0.85)", corner: "#fbfaf7",
    line: "#ffffff", accent: "#ffd9a3", anomaly: "#ffc28f",
    figBg: "rgba(255,255,255,0.07)", figBorder: "rgba(255,255,255,0.32)", figGrid: "rgba(255,255,255,0.10)",
    tag: "#ffd9a3",
  },
  bone: {
    name: "Bone",
    blurb: "Flat warm white, no grid + ring",
    cover: { backgroundColor: "#f1ece2" },
    ink: "#14110d", soft: "#46413a", faint: "#8a847b",
    em: "oklch(0.55 0.14 252)", rule: "#11100e", corner: "#14110d",
    line: "#14110d", accent: "oklch(0.55 0.14 252)", anomaly: "#c33b27",
    figBg: "#fbfaf7", figBorder: "#11100e", figGrid: "rgba(20,17,13,0.05)",
    tag: "oklch(0.55 0.14 252)", ring: true,
  },
  plotter: {
    name: "Plotter",
    blurb: "Cream, fine diagonal hatch",
    cover: {
      backgroundColor: "#f6f3ec",
      backgroundImage:
        "repeating-linear-gradient(45deg, oklch(0.55 0.14 252 / 0.06) 0 1px, transparent 1px 11px)",
    },
    ink: "#14110d", soft: "#46413a", faint: "#8a847b",
    em: "oklch(0.55 0.14 252)", rule: "#11100e", corner: "#14110d",
    line: "#14110d", accent: "oklch(0.55 0.14 252)", anomaly: "#c33b27",
    figBg: "#ffffff", figBorder: "#11100e", figGrid: "rgba(20,17,13,0.05)",
    tag: "oklch(0.55 0.14 252)",
  },
};

function CoverIllustration({ t }) {
  return (
    <svg viewBox="0 0 1380 470" style={{ display: "block", width: "100%", height: "auto" }}>
      <text x="60" y="56" fontFamily="'JetBrains Mono',monospace" fontSize="15" letterSpacing="2" fill={t.faint}>01 · MONITORING SIGNAL</text>
      <line x1="60" y1="150" x2="1320" y2="150" stroke={t.figGrid.replace("0.05", "0.5")} strokeWidth="1" strokeDasharray="2 5" opacity="0.5" />
      <polyline fill="none" stroke={t.line} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
        points="60,150 150,158 240,144 330,154 410,150 470,150 510,150 545,58 580,150 650,156 740,146 830,156 920,148 1010,156 1100,146 1190,154 1280,150 1320,150" />
      <circle cx="545" cy="58" r="30" fill="none" stroke={t.anomaly} strokeWidth="2.5" />
      <line x1="545" y1="18" x2="545" y2="40" stroke={t.anomaly} strokeWidth="2" />
      <line x1="545" y1="76" x2="545" y2="98" stroke={t.anomaly} strokeWidth="2" />
      <line x1="505" y1="58" x2="527" y2="58" stroke={t.anomaly} strokeWidth="2" />
      <line x1="563" y1="58" x2="585" y2="58" stroke={t.anomaly} strokeWidth="2" />
      <text x="600" y="52" fontFamily="'JetBrains Mono',monospace" fontSize="15" fill={t.anomaly} fontWeight="500">anomaly detected</text>
      <text x="600" y="74" fontFamily="'JetBrains Mono',monospace" fontSize="13" fill={t.faint}>confidence 92%</text>
      <line x1="60" y1="248" x2="1320" y2="248" stroke={t.figGrid} strokeWidth="1" opacity="0.8" />
      <text x="60" y="306" fontFamily="'JetBrains Mono',monospace" fontSize="15" letterSpacing="2" fill={t.faint}>02 · TRUST CALIBRATION</text>
      <line x1="170" y1="392" x2="1210" y2="392" stroke={t.line} strokeWidth="2.5" />
      <line x1="170" y1="376" x2="170" y2="408" stroke={t.line} strokeWidth="2.5" />
      <line x1="1210" y1="376" x2="1210" y2="408" stroke={t.line} strokeWidth="2.5" />
      <line x1="690" y1="368" x2="690" y2="416" stroke={t.accent} strokeWidth="2" />
      <line x1="430" y1="384" x2="430" y2="400" stroke={t.faint} strokeWidth="1.5" />
      <line x1="950" y1="384" x2="950" y2="400" stroke={t.faint} strokeWidth="1.5" />
      <path d="M690 360 L708 392 L690 424 L672 392 Z" fill={t.accent} />
      <text x="170" y="446" fontFamily="'JetBrains Mono',monospace" fontSize="14" fill={t.faint}>under-trust</text>
      <text x="690" y="446" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="14" fill={t.accent} fontWeight="500">calibrated</text>
      <text x="1210" y="446" textAnchor="end" fontFamily="'JetBrains Mono',monospace" fontSize="14" fill={t.faint}>over-trust</text>
    </svg>
  );
}

function CoverFrame({ theme = "ink", pw = 780 }) {
  const t = COVER_THEMES[theme] || COVER_THEMES.ink;
  const scale = pw / 1600;
  const cornerBase = { position: "absolute", width: 26, height: 26, borderStyle: "solid", borderColor: t.corner, borderWidth: 2 };
  return (
    <div style={{ width: pw, height: 1200 * scale, overflow: "hidden", position: "relative" }}>
      <div style={{
        width: 1600, height: 1200, position: "absolute", top: 0, left: 0,
        transform: `scale(${scale})`, transformOrigin: "top left",
        padding: "104px 110px 90px", display: "flex", flexDirection: "column",
        fontFamily: "'Inter',sans-serif", WebkitFontSmoothing: "antialiased", ...t.cover,
      }}>
        {/* corners */}
        <div style={{ ...cornerBase, top: 46, left: 50, borderRight: 0, borderBottom: 0 }} />
        <div style={{ ...cornerBase, top: 46, right: 50, borderLeft: 0, borderBottom: 0 }} />
        <div style={{ ...cornerBase, bottom: 46, left: 50, borderRight: 0, borderTop: 0 }} />
        <div style={{ ...cornerBase, bottom: 46, right: 50, borderLeft: 0, borderTop: 0 }} />

        {/* decorative ring for 'bone' */}
        {t.ring && (
          <div style={{
            position: "absolute", width: 620, height: 620, borderRadius: "50%",
            border: "1.5px solid " + t.accent, opacity: 0.5, right: -150, top: 70, pointerEvents: "none",
          }} />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", position: "relative" }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: t.ink }}>Case Study · UX Research &amp; Design</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, letterSpacing: "0.06em", color: t.tag, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.tag }} />Anomify · Explainable AI
          </div>
        </div>

        <h1 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, color: t.ink, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.02em", marginTop: 54, position: "relative" }}>
          Calibrating <em style={{ fontStyle: "italic", color: t.em }}>Trust</em> in<br />AI-Driven Anomaly Alerts
        </h1>

        <div style={{ height: 2, background: t.rule, margin: "46px 0 30px", position: "relative" }} />
        <p style={{ fontSize: 24, lineHeight: 1.5, color: t.soft, maxWidth: "46ch", margin: 0, position: "relative" }}>
          Turning opaque, black-box AI warnings into <b style={{ color: t.ink, fontWeight: 600 }}>explanations operations teams can actually act on.</b>
        </p>

        <div style={{
          marginTop: "auto", border: "1.5px solid " + t.figBorder, borderRadius: 18, overflow: "hidden",
          position: "relative",
          backgroundColor: t.figBg,
          backgroundImage: `linear-gradient(${t.figGrid} 1px,transparent 1px),linear-gradient(90deg,${t.figGrid} 1px,transparent 1px)`,
          backgroundSize: "32px 32px",
        }}>
          <CoverIllustration t={t} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 30, fontSize: 16, color: t.soft, position: "relative" }}>
          <div style={{ fontFamily: "'Newsreader',serif", fontSize: 21, color: t.ink, fontWeight: 500 }}>Muhua Qin</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, letterSpacing: "0.04em", color: t.faint, display: "flex", gap: 22 }}>
            <span><b style={{ color: t.soft, fontWeight: 500 }}>Role</b> UX Researcher &amp; Designer</span>
            <span><b style={{ color: t.soft, fontWeight: 500 }}>Method</b> Within-subjects study</span>
            <span><b style={{ color: t.soft, fontWeight: 500 }}>2025</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CoverFrame, COVER_THEMES });
