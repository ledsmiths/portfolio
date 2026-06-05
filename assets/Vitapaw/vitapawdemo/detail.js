// ─── State ────────────────────────────────────────────────────────────────────

let alertId = null;
let marked  = false;
let ignored = false;

// ─── Populate page from alert ID ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  alertId = params.get('id');

  const alert = ALERTS.find(a => a.id === alertId);
  if (!alert) return;

  // Fill content
  document.getElementById('detail-alarm-title').textContent = alert.alarm;
  document.getElementById('detail-alarm-desc').textContent  = descMap[alert.alarm] || 'Abnormal behaviour detected.';

  const sugs = sugMap[alert.alarm] || defaultSuggestions;
  document.getElementById('sug1').textContent = sugs[0];
  document.getElementById('sug2').textContent = sugs[1];
  document.getElementById('sug3').textContent = sugs[2];

  // Video vs chart
  if (alert.type === 'chart') {
    document.getElementById('video-section').style.display = 'none';
    document.getElementById('chart-section').style.display = 'block';
  } else {
    document.getElementById('video-section').style.display = 'block';
    document.getElementById('chart-section').style.display = 'none';
  }

  // Already seen → restore mark-expanded layout (no animation)
  if (getSeenIds().includes(alertId) && !getIgnoredIds().includes(alertId)) {
    marked = true;
    const markBtn   = document.getElementById('mark-btn');
    const ignoreBtn = document.getElementById('ignore-btn');
    const footer    = markBtn.closest('.detail-footer');

    markBtn.textContent        = 'Marked as seen';
    markBtn.style.flexGrow     = '3';
    ignoreBtn.style.flexGrow   = '0';
    ignoreBtn.style.opacity    = '0';
    ignoreBtn.style.pointerEvents = 'none';
    footer.style.transition    = 'none';
    footer.style.gap           = '0px';
    requestAnimationFrame(() => { footer.style.transition = ''; });
  }

  // Already ignored → restore ignore-expanded layout (no animation)
  if (getIgnoredIds().includes(alertId)) {
    ignored = true;
    const ignoreBtn = document.getElementById('ignore-btn');
    const markBtn   = document.getElementById('mark-btn');
    const footer    = ignoreBtn.closest('.detail-footer');

    ignoreBtn.textContent       = 'Ignored';
    ignoreBtn.style.flexGrow    = '3';
    markBtn.style.flexGrow      = '0';
    markBtn.style.opacity       = '0';
    markBtn.style.pointerEvents = 'none';
    footer.style.transition     = 'none'; // 初始渲染不触发过渡
    footer.style.gap            = '0px';
    // 下一帧恢复过渡，确保后续交互仍有动效
    requestAnimationFrame(() => { footer.style.transition = ''; });
  }
});

// ─── Ignore ───────────────────────────────────────────────────────────────────

function toggleIgnore() {
  const ignoreBtn = document.getElementById('ignore-btn');
  const markBtn   = document.getElementById('mark-btn');
  const footer    = ignoreBtn.closest('.detail-footer');

  if (!ignored) {
    ignored = true;

    ignoreBtn.classList.add('mark-pop');
    ignoreBtn.addEventListener('animationend', () => {
      ignoreBtn.classList.remove('mark-pop');
      ignoreBtn.textContent = 'Ignored';
    }, { once: true });

    if (alertId) markIgnored(alertId); // 同时写入 seen + ignored

    ignoreBtn.style.flexGrow    = '3';
    markBtn.style.flexGrow      = '0';
    markBtn.style.opacity       = '0';
    markBtn.style.pointerEvents = 'none';
    footer.style.gap            = '0px';

  } else {
    ignored = false;
    if (alertId) unmarkIgnored(alertId); // 从 seen + ignored 都移除

    ignoreBtn.classList.add('mark-fade');
    ignoreBtn.addEventListener('animationend', () => {
      ignoreBtn.classList.remove('mark-fade');
      ignoreBtn.textContent = 'Ignore';
    }, { once: true });

    ignoreBtn.style.flexGrow    = '1';
    markBtn.style.flexGrow      = '2';
    markBtn.style.opacity       = '1';
    markBtn.style.pointerEvents = '';
    footer.style.gap            = '';
  }
}

// ─── Mark as seen ─────────────────────────────────────────────────────────────

function toggleMark() {
  const markBtn   = document.getElementById('mark-btn');
  const ignoreBtn = document.getElementById('ignore-btn');
  const footer    = markBtn.closest('.detail-footer');

  if (!marked) {
    marked = true;
    if (alertId) markSeen(alertId);

    markBtn.classList.add('mark-pop');
    markBtn.addEventListener('animationend', () => {
      markBtn.classList.remove('mark-pop');
      markBtn.textContent = 'Marked as seen';
    }, { once: true });

    markBtn.style.flexGrow        = '3';
    ignoreBtn.style.flexGrow      = '0';
    ignoreBtn.style.opacity       = '0';
    ignoreBtn.style.pointerEvents = 'none';
    footer.style.gap              = '0px';

  } else {
    marked = false;
    if (alertId) unmarkSeen(alertId);

    markBtn.classList.add('mark-fade');
    markBtn.addEventListener('animationend', () => {
      markBtn.classList.remove('mark-fade');
      markBtn.textContent = 'Mark as seen';
    }, { once: true });

    markBtn.style.flexGrow        = '2';
    ignoreBtn.style.flexGrow      = '1';
    ignoreBtn.style.opacity       = '1';
    ignoreBtn.style.pointerEvents = '';
    footer.style.gap              = '';
  }
}

// ─── Video playback ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('alert-video');
  if (!video) return;
  video.addEventListener('timeupdate', () => {
    const pf = document.getElementById('progress-fill');
    if (pf && video.duration) {
      pf.style.width = (video.currentTime / video.duration * 100) + '%';
    }
  });
  video.addEventListener('ended', stopVideo);
});

function toggleVideo() {
  const video = document.getElementById('alert-video');
  const vp    = document.getElementById('video-playing');
  const pb    = document.getElementById('play-btn');
  if (!video) return;
  if (video.paused) {
    video.play();
    vp.style.display = 'flex';
    pb.style.display = 'none';
  } else {
    video.pause();
    vp.style.display = 'none';
    pb.style.display = 'flex';
  }
}

function stopVideo() {
  const video = document.getElementById('alert-video');
  const vp    = document.getElementById('video-playing');
  const pb    = document.getElementById('play-btn');
  const pf    = document.getElementById('progress-fill');
  if (video) { video.pause(); video.currentTime = 0; }
  if (vp) vp.style.display = 'none';
  if (pb) pb.style.display = 'flex';
  if (pf) pf.style.width   = '0%';
}
