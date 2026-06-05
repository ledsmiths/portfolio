const descMap = {
  'Reduced activity and abnormal posture': 'Reduced movement and unusual resting posture detected.',
  'Abnormal posture': 'Cat has been holding an abnormal body posture for an extended period.',
  'Abnormal Litter Box Frequency': 'Visits dropped significantly this week — only 1 today vs. avg of 4/day.',
  'Unsteady walking': 'Unstable gait detected within the last 5 minutes.',
};

const sugMap = {
  'Abnormal Litter Box Frequency': [
    'Check litter box cleanliness and placement',
    'Monitor whether water intake has also decreased',
    'Watch for signs of straining when urinating',
  ],
};

let marked = false;

function switchTab(tab) {
  const n = document.getElementById('new-content');
  const s = document.getElementById('seen-content');
  const tn = document.getElementById('tab-new');
  const ts = document.getElementById('tab-seen');
  if (tab === 'new') {
    n.style.display = 'block'; s.style.display = 'none';
    tn.className = 'tab active'; ts.className = 'tab';
  } else {
    n.style.display = 'none'; s.style.display = 'block';
    tn.className = 'tab'; ts.className = 'tab active';
  }
}

function openDetail(name, alarm, time, type) {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('detail-view').style.display = 'flex';
  document.getElementById('detail-alarm-title').textContent = alarm;
  document.getElementById('detail-alarm-desc').textContent = descMap[alarm] || 'Abnormal behaviour detected.';
  const sugs = sugMap[alarm] || [
    'Observe closely for the next 30–60 minutes',
    'Check the surrounding environment',
    'Review recent behaviour patterns',
  ];
  document.getElementById('sug1').textContent = sugs[0];
  document.getElementById('sug2').textContent = sugs[1];
  document.getElementById('sug3').textContent = sugs[2];
  if (type === 'chart') {
    document.getElementById('video-section').style.display = 'none';
    document.getElementById('chart-section').style.display = 'block';
  } else {
    document.getElementById('video-section').style.display = 'block';
    document.getElementById('chart-section').style.display = 'none';
  }
  stopVideo();
  marked = false;
  resetMarkBtn();
}

function resetMarkBtn() {
  const b = document.getElementById('mark-btn');
  b.textContent = 'Mark as seen';
  b.style.background = '#868DFF';
  b.style.color = '#fff';
}

function toggleMark() {
  const b = document.getElementById('mark-btn');
  if (!marked) {
    marked = true;
    b.textContent = '✓ Marked as seen';
    b.style.background = '#4CD087';
  } else {
    marked = false;
    resetMarkBtn();
  }
}

function closeDetail() {
  stopVideo();
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('home-view').style.display = 'flex';
}

let playTimer = null;

function toggleVideo() {
  const vp = document.getElementById('video-playing');
  const pb = document.getElementById('play-btn');
  const pf = document.getElementById('progress-fill');
  if (vp.style.display === 'flex') { stopVideo(); return; }
  vp.style.display = 'flex';
  pb.style.display = 'none';
  let pct = 0;
  playTimer = setInterval(() => {
    pct += 100 / 80;
    pf.style.width = Math.min(pct, 100) + '%';
    if (pct >= 100) stopVideo();
  }, 100);
}

function stopVideo() {
  clearInterval(playTimer);
  const vp = document.getElementById('video-playing');
  const pb = document.getElementById('play-btn');
  const pf = document.getElementById('progress-fill');
  if (vp) vp.style.display = 'none';
  if (pb) pb.style.display = 'flex';
  if (pf) pf.style.width = '0%';
}

function openMonitor() {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('monitor-view').style.display = 'flex';
}

function closeMonitor() {
  document.getElementById('monitor-view').style.display = 'none';
  document.getElementById('home-view').style.display = 'flex';
}
