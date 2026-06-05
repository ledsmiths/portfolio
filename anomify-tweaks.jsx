/* anomify-tweaks.jsx — Tweaks panel for the case study page */
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakToggle, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#2f5fd0", "#e9eefc"],
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
          ["#2f5fd0", "#e9eefc"],
          ["#2f7d57", "#e6f1ec"],
          ["#c0573c", "#f6ebe5"],
          ["#3b3b3b", "#ececec"]
        ]}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSelect label="Title font" value={t.titleFont}
        options={["Newsreader", "Spectral", "Playfair Display"]}
        onChange={(v) => setTweak('titleFont', v)} />

      <TweakSection label="Layout" />
      <TweakSlider label="Reading width" value={t.maxw} min={800} max={1120} step={20} unit="px"
        onChange={(v) => setTweak('maxw', v)} />
      <TweakToggle label="Grid background" value={t.grid}
        onChange={(v) => setTweak('grid', v)} />
      <TweakToggle label="Figure captions" value={t.captions}
        onChange={(v) => setTweak('captions', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
