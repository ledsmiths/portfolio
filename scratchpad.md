# Anomify Case Study — Plan & Copy

## Deliverable
- Going into Framer. Structure = text block + image, alternating.
- I deliver: (1) polished English copy, (2) designed graphics as images.
- Portfolio aesthetic constant: serif display title, grid-paper bg, sans body, bold-label metadata, soft accent cards. Image art direction = open (3 directions to choose).

## Section flow (titles in noun-phrase editorial style, matching "Discover" / "Key findings")
1. Hero / Overview
2. Context
3. The Challenge
4. My Focus
5. Experimental Design  → IMG: 2×2 condition matrix
6. Tasks & Metrics      → IMG: 3 task cards
7. High-Fidelity Prototyping → IMG: chatbot screens (PHOTO placeholder)
8. Mixed-Methods Analysis → IMG: quant/qual split diagram
9. Key Results          → IMG: results / stat bars
10. Design Principles    → IMG: 3 principle diagrams

## Image inventory
- Designed by me (export from page): condition matrix, task cards, results bars, principle diagrams, confidence/alert UI mock.
- Placeholders (user supplies): real Voiceflow chatbot screenshots, interview photo.

## 3 image art directions
- A · Editorial Blueprint — grid paper, thin line diagrams, ink + cool blue accent. Closest to current portfolio.
- B · Soft Gradient — pastel gradient rounded cards (VitaPaw Discover vibe).
- C · Product Console — dark dashboard panels, alert chips, confidence meters. Most product-real.

## Accent (oklch): cool blue ≈ oklch(0.62 0.13 250)

---

## COPY

### Title
Anomify: Calibrating Trust in AI-Driven Anomaly Alerts

Label: Case study

### Overview paragraph
Anomify is a B2B platform that uses AI to monitor supply-chain and inventory data for high-stakes e-commerce operations. I partnered with the team to design and evaluate a multi-dimensional Explainable AI (XAI) framework inside their alerting chatbot — turning opaque "black-box" warnings into explanations that operations managers can actually act on.

Project Type: Industry research collaboration (Anomify)
My Role: UX Researcher & Designer
Duration: [add — e.g. 12 weeks]
Tools: Voiceflow, ChatGPT API, Figma, statistical analysis (Mann–Whitney U), thematic analysis
Methods: Within-subjects experiment · Mixed methods

### Context
In high-stakes B2B e-commerce, operations teams rely on AI to monitor data risks around the clock. But the black-box nature of AI alerts creates a severe trust gap: when a warning appears with no reasoning behind it, people can't tell what it means or whether to believe it.

### The Challenge
Faced with opaque warnings, users swing between two failure modes — over-relying on the AI without scrutiny, or dismissing critical issues entirely. Neither is safe when a missed anomaly can mean a stalled shipment or a costly inventory error.

How might explanation strategies be designed so that users trust AI alerts the right amount — neither too much nor too little?

### My Focus
I designed and evaluated a multi-dimensional XAI framework within the chatbot, with one goal: optimize decision efficiency through calibrated trust. Rather than teaching users how the algorithm works, the explanations give them justifiable, business-centric reasons to act.

### Experimental Design
To scientifically quantify how different explanation strategies affect trust, I ran a within-subjects study — every participant experienced every condition, eliminating individual variance. The study simulated a live B2B supply-chain monitoring environment and isolated one variable at a time across four conditions:

- Baseline — alert only, no explanation
- Source-based — alert + the data logs and records behind it
- Confidence-based — alert + a numerical certainty score (e.g. "92% confidence")
- Combined — source data + confidence score together

### Tasks & Metrics
Participants played the role of e-commerce operations managers and completed three targeted tasks, each probing a different dimension of the experience.

Task 1 — Source-Based Explanations · Understanding
Reviewing a stock-discrepancy alert, participants used the chatbot to find the root cause; it justified its finding by pointing to specific server logs and tracking records.
Measures: Knowledge Acquisition · Perceived Informativeness · Perceived Credibility

Task 2 — Confidence-Based Explanations · Trust & Adherence
Facing a logistics alert (e.g. a severe shipping delay), participants asked the chatbot to verify; it returned a specific certainty metric for its diagnosis.
Measures: Behavioral Intention · User Self-Confidence · Belief in System

Task 3 — Combined Explanations · Decision Efficiency
Under cognitive load, participants triaged a backlog of concurrent alerts and ranked them by severity, using a combined strategy (source data + confidence) to prioritize.
Measures: Perceived Diagnosticity · Decision-Making Confidence · Overall System Trustworthiness

### High-Fidelity Prototyping
Rather than static mockups, I engineered a fully reactive chatbot to maximize ecological validity during testing.
- Conversation architecture — built in Voiceflow to orchestrate multi-turn dialogue trees, conditional branching, and a dual-channel input system (guided buttons + free-text natural language).
- Dynamic AI responses — integrated the ChatGPT API with optimized prompt engineering to simulate realistic, human-like reasoning when the bot flagged logistics delays or inventory anomalies.

### Mixed-Methods Analysis
I used a double-validation approach to ensure the insights held up.
- Quantitative — subjective ratings on 5-point Likert scales, tested with the non-parametric Mann–Whitney U test to validate statistically significant differences (p < 0.05).
- Qualitative — semi-structured post-experiment interviews, transcribed and coded through a three-tier thematic analysis to map users' mental models of AI transparency.

### Key Results
1. Source-based explanations supercharge understanding, not blind trust.
Providing data sources and server logs significantly improved Knowledge Acquisition over baseline — users accurately diagnosed the root cause of inventory anomalies. (Mann–Whitney U, p < 0.05)

2. Confidence scores drive quick action — but they're context-dependent.
Numerical certainty (e.g. "92% confidence") triggered high Behavioral Intention, prompting faster risk-mitigation. The effect was strong under high cognitive load but faded in routine, low-urgency checks.

3. The combined strategy best calibrates trust under load.
Pairing source data with confidence scores scored highest on Perceived Diagnosticity and Decision-Making Confidence during multi-task severity ranking — significantly outperforming both baseline and confidence-only conditions. (p < 0.01)

### Design Principles
Principle 1 — Actionable Progressive Disclosure
Keep the primary interface clean, showing only the alert. Surface explanations — confidence scores and data logs alike — at a secondary level, on demand (a "Why?" / "View details" trigger). Transparency becomes an active investigative tool, not passive interface noise.

Principle 2 — Dynamic Multi-Dimensional Tiering
Adapt explanation depth to the task's risk and cognitive load. High-risk / ambiguous tasks get mandatory, multi-dimensional explanations (sources + certainty) for human-in-the-loop triage; routine / low-risk tasks stay lightweight and fast.

Principle 3 — Design for Trust Calibration, Not Machine Education
Shift focus from explaining how the algorithm works to giving justifiable, business-centric reasons to act. In B2B, the goal of XAI isn't to turn users into data scientists — it's a partnership where users feel secure enough to act on AI recommendations.
