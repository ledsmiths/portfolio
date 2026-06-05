/* anomify-graphics.jsx — case study graphic components (3 art directions) */

function Hero({ dir }) {
  const cls = dir === 'B' ? 'gfx hero heroB' : dir === 'C' ? 'gfx hero heroC' : 'gfx hero gridpaper';
  return (
    <div className={cls}>
      <div className="kicker">Case study</div>
      <div className="serif" style={{ marginTop: 18 }}>Calibrating Trust<br/>in AI-Driven Alerts</div>
      <div className="rule"></div>
      <div className="lede">A multi-dimensional Explainable AI framework inside Anomify's B2B alerting chatbot — turning black-box warnings into explanations operations teams can act on.</div>
      <div className="meta">
        <div><b>Role</b>&nbsp;&nbsp;UX Researcher &amp; Designer</div>
        <div><b>Methods</b>&nbsp;&nbsp;Within-subjects experiment · Mixed methods</div>
        <div><b>Tools</b>&nbsp;&nbsp;Voiceflow · ChatGPT API · Figma</div>
      </div>
      <div className="link">Partnered with Anomify&nbsp;→</div>
    </div>
  );
}

function Matrix({ dir }) {
  const cls = dir === 'B' ? 'gfx mx mxB' : dir === 'C' ? 'gfx mx mxC' : 'gfx mx mxA gridpaper';
  return (
    <div className={cls}>
      <div className="kicker">Experimental design</div>
      <h3>Four conditions, one variable at a time</h3>
      <p className="sub">Within-subjects · every participant saw every condition.</p>
      <div className="mxgrid">
        <div></div>
        <div className="axis">Confidence&nbsp;OFF</div>
        <div className="axis">Confidence&nbsp;ON</div>

        <div className="axis v">Source&nbsp;OFF</div>
        <div className="cell">
          <div className="cname">Baseline</div>
          <div><div className="cnote">Alert only — no explanation</div><div className="ctag">control</div></div>
        </div>
        <div className="cell">
          <div className="cname">Confidence-based</div>
          <div><div className="cnote">Alert + certainty score</div><div className="ctag">“92% confidence”</div></div>
        </div>

        <div className="axis v">Source&nbsp;ON</div>
        <div className="cell">
          <div className="cname">Source-based</div>
          <div><div className="cnote">Alert + data logs &amp; records</div><div className="ctag">server evidence</div></div>
        </div>
        <div className="cell combined">
          <div className="cname">Combined</div>
          <div><div className="cnote">Source data + confidence score</div><div className="ctag">multi-dimensional</div></div>
        </div>
      </div>
    </div>
  );
}

function AlertUI({ dir }) {
  const cls = dir === 'B' ? 'gfx ui uiB' : dir === 'C' ? 'gfx ui uiC' : 'gfx ui uiA gridpaper';
  return (
    <div className={cls}>
      <div className="kicker">On-demand explanation</div>
      <h3 style={{ marginTop: 6 }}>Why this alert?</h3>
      <div className="alertcard">
        <div className="arow">
          <span className="dot"></span>
          <span className="atitle">Inventory discrepancy</span>
          <span className="achip">HIGH RISK</span>
        </div>
        <div className="abody">SKU&nbsp;#A-2241 shows a 1,480-unit gap between the warehouse feed and the order ledger over the last 6 hours.</div>
        <div className="conf">
          <div className="clab"><span>Diagnostic confidence</span><span>92%</span></div>
          <div className="ctrack"><div className="cfill"></div></div>
        </div>
        <div className="src">
          <div className="sttl">SOURCE&nbsp;·&nbsp;server logs</div>
          <div className="logline">14:02 sync_warehouse → 8,120<br/>14:02 order_ledger&nbsp;&nbsp;→ 9,600<br/>Δ&nbsp;−1,480&nbsp;&nbsp;flagged anomaly</div>
        </div>
        <div className="why">
          <button className="btn solid">Freeze shipment</button>
          <button className="btn">Dismiss</button>
        </div>
      </div>
    </div>
  );
}

function ImgNote({ children }) {
  return <div className="imgnote">🖼 IMAGE — {children}</div>;
}

function FullCopy() {
  return (
    <div className="gfx copy">
      <div className="kicker">Case study</div>
      <div className="ctitle">Anomify: Calibrating Trust in AI-Driven Anomaly Alerts</div>

      <ImgNote>Hero — title + grid background (see direction A/B/C)</ImgNote>

      <p>Anomify is a B2B platform that uses AI to monitor supply-chain and inventory data for high-stakes e-commerce operations. I partnered with the team to design and evaluate a multi-dimensional <b>Explainable AI (XAI)</b> framework inside their alerting chatbot — turning opaque “black-box” warnings into explanations that operations managers can actually act on.</p>

      <div className="metablock">
        <div><b>Project Type:</b> Industry research collaboration (Anomify)</div>
        <div><b>My Role:</b> UX Researcher &amp; Designer</div>
        <div><b>Duration:</b> [add — e.g. 12 weeks]</div>
        <div><b>Tools:</b> Voiceflow, ChatGPT API, Figma, statistical analysis, thematic analysis</div>
        <div><b>Methods:</b> Within-subjects experiment · Mixed methods</div>
      </div>

      <div className="rule"></div>

      <h2>Context</h2>
      <p>In high-stakes B2B e-commerce, operations teams rely on AI to monitor data risks around the clock. But the black-box nature of AI alerts creates a severe trust gap: when a warning appears with no reasoning behind it, people can’t tell what it means — or whether to believe it.</p>

      <h2>The Challenge</h2>
      <p>Faced with opaque warnings, users swing between two failure modes — <b>over-relying</b> on the AI without scrutiny, or <b>dismissing</b> critical issues entirely. Neither is safe when a missed anomaly can mean a stalled shipment or a costly inventory error.</p>
      <p className="q">“How might we design explanations so users trust AI alerts the right amount — neither too much nor too little?”</p>

      <h2>My Focus</h2>
      <p>I designed and evaluated a multi-dimensional XAI framework within the chatbot, with one goal: <b>optimize decision efficiency through calibrated trust</b>. Rather than teaching users how the algorithm works, the explanations give them justifiable, business-centric reasons to act.</p>

      <div className="rule"></div>

      <h2>Experimental Design</h2>
      <p>To scientifically quantify how different explanation strategies affect trust, I ran a <b>within-subjects study</b> — every participant experienced every condition, eliminating individual variance. The study simulated a live B2B supply-chain monitoring environment and isolated one variable at a time across four conditions:</p>
      <ul>
        <li><b>Baseline</b> — alert only, no explanation</li>
        <li><b>Source-based</b> — alert + the data logs and records behind it</li>
        <li><b>Confidence-based</b> — alert + a numerical certainty score (e.g. “92% confidence”)</li>
        <li><b>Combined</b> — source data + confidence score together</li>
      </ul>
      <ImgNote>2×2 condition matrix</ImgNote>

      <h2>Tasks &amp; Metrics</h2>
      <p>Participants played the role of e-commerce operations managers and completed three targeted tasks, each probing a different dimension of the experience.</p>
      <h4>Task 1 — Source-Based Explanations · Understanding</h4>
      <p>Reviewing a stock-discrepancy alert, participants used the chatbot to find the root cause; it justified its finding by pointing to specific server logs and tracking records.<br/><i>Measures: Knowledge Acquisition · Perceived Informativeness · Perceived Credibility</i></p>
      <h4>Task 2 — Confidence-Based Explanations · Trust &amp; Adherence</h4>
      <p>Facing a logistics alert (e.g. a severe shipping delay), participants asked the chatbot to verify; it returned a specific certainty metric for its diagnosis.<br/><i>Measures: Behavioral Intention · User Self-Confidence · Belief in System</i></p>
      <h4>Task 3 — Combined Explanations · Decision Efficiency</h4>
      <p>Under cognitive load, participants triaged a backlog of concurrent alerts and ranked them by severity, using a combined strategy (source data + confidence) to prioritize.<br/><i>Measures: Perceived Diagnosticity · Decision-Making Confidence · Overall System Trustworthiness</i></p>
      <ImgNote>3 task cards</ImgNote>

      <div className="rule"></div>

      <h2>High-Fidelity Prototyping</h2>
      <p>Rather than static mockups, I engineered a fully reactive chatbot to maximize <b>ecological validity</b> during testing.</p>
      <ul>
        <li><b>Conversation architecture</b> — built in Voiceflow to orchestrate multi-turn dialogue trees, conditional branching, and a dual-channel input system (guided buttons + free-text natural language).</li>
        <li><b>Dynamic AI responses</b> — integrated the ChatGPT API with optimized prompt engineering to simulate realistic, human-like reasoning when the bot flagged logistics delays or inventory anomalies.</li>
      </ul>
      <ImgNote>Real Voiceflow chatbot screenshots — you supply these</ImgNote>

      <h2>Mixed-Methods Analysis</h2>
      <p>I used a double-validation approach to ensure the insights held up.</p>
      <ul>
        <li><b>Quantitative</b> — subjective ratings on 5-point Likert scales, tested with the non-parametric <b>Mann–Whitney U</b> test to validate statistically significant differences (p &lt; 0.05).</li>
        <li><b>Qualitative</b> — semi-structured post-experiment interviews, transcribed and coded through a three-tier <b>thematic analysis</b> to map users’ mental models of AI transparency.</li>
      </ul>

      <div className="rule"></div>

      <h2>Key Results</h2>
      <h4>1 · Source-based explanations supercharge understanding, not blind trust.</h4>
      <p>Providing data sources and server logs significantly improved <b>Knowledge Acquisition</b> over baseline — users accurately diagnosed the root cause of inventory anomalies. <i>(Mann–Whitney U, p &lt; 0.05)</i></p>
      <h4>2 · Confidence scores drive quick action — but they’re context-dependent.</h4>
      <p>Numerical certainty (e.g. “92% confidence”) triggered high <b>Behavioral Intention</b>, prompting faster risk-mitigation. The effect was strong under high cognitive load but faded in routine, low-urgency checks.</p>
      <h4>3 · The combined strategy best calibrates trust under load.</h4>
      <p>Pairing source data with confidence scores scored highest on <b>Perceived Diagnosticity</b> and <b>Decision-Making Confidence</b> during multi-task severity ranking — significantly outperforming both baseline and confidence-only conditions. <i>(p &lt; 0.01)</i></p>
      <ImgNote>Results chart / stat bars</ImgNote>

      <div className="rule"></div>

      <h2>Design Principles</h2>
      <h4>Principle 1 — Actionable Progressive Disclosure</h4>
      <p>Keep the primary interface clean, showing only the alert. Surface explanations — confidence scores and data logs alike — at a secondary level, on demand (a “Why?” / “View details” trigger). Transparency becomes an active investigative tool, not passive interface noise.</p>
      <h4>Principle 2 — Dynamic Multi-Dimensional Tiering</h4>
      <p>Adapt explanation depth to the task’s risk and cognitive load. High-risk / ambiguous tasks get mandatory, multi-dimensional explanations (sources + certainty) for human-in-the-loop triage; routine / low-risk tasks stay lightweight and fast.</p>
      <h4>Principle 3 — Design for Trust Calibration, Not Machine Education</h4>
      <p>Shift focus from explaining how the algorithm works to giving justifiable, business-centric reasons to act. In B2B, the goal of XAI isn’t to turn users into data scientists — it’s a partnership where users feel secure enough to act on AI recommendations.</p>
      <ImgNote>3 principle diagrams</ImgNote>
    </div>
  );
}

Object.assign(window, { Hero, Matrix, AlertUI, FullCopy });
