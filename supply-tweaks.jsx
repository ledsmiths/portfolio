/* supply-tweaks.jsx — Tweaks panel for the supply-zone case study */
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakToggle, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#2f5fb0", "#e7edf8"],
  "titleFont": "Newsreader",
  "maxw": 960,
  "grid": true,
  "captions": true
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const r = document.documentElement;
  if (Array.isArray(t.accent) && t.accent.length >= 2) {
    r.style.setProperty('--accent', t.accent[0]);
    r.style.setProperty('--accent-soft', t.accent[1]);
  }
  r.style.setProperty('--serif', '"' + t.titleFont + '", Georgia, "Times New Roman", serif');
  r.style.setProperty('--maxw', t.maxw + 'px');
  document.body.classList.toggle('no-grid', !t.grid);
  document.body.classList.toggle('no-caps', !t.captions);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent}
        options={[
          ["#2f5fb0", "#e7edf8"],
          ["#3f7a4e", "#e7f0e9"],
          ["#a8472f", "#f6e7e2"],
          ["#5a4ba8", "#ece9f6"]
        ]}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSelect label="Title font" value={t.titleFont}
        options={["Newsreader", "Inter"]}
        onChange={(v) => setTweak('titleFont', v)} />

      <TweakSection label="Layout" />
      <TweakSlider label="Reading width" value={t.maxw} min={860} max={1160} step={20} unit="px"
        onChange={(v) => setTweak('maxw', v)} />
      <TweakToggle label="Graph-paper grid" value={t.grid}
        onChange={(v) => setTweak('grid', v)} />
      <TweakToggle label="Figure captions" value={t.captions}
        onChange={(v) => setTweak('captions', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
