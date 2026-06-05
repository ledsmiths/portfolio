// ─── Deterministic data generator ────────────────────────────────────────────

function genData(n, base, variance, trend, seed) {
  return Array.from({ length: n }, (_, i) => {
    const p = ((i * 1664525 + seed * 22695477 + 1013904223) & 0x7fffffff) / 0x7fffffff;
    return Math.max(0, Math.round(base + trend * i + (p - 0.5) * 2 * variance));
  });
}

// ─── Y-axis scale helper ──────────────────────────────────────────────────────

function niceScale(max) {
  if (max <= 0)  return { max: 2,   mid: 1  };
  if (max <= 2)  return { max: 2,   mid: 1  };
  if (max <= 4)  return { max: 4,   mid: 2  };
  if (max <= 6)  return { max: 6,   mid: 3  };
  if (max <= 10) return { max: 10,  mid: 5  };
  if (max <= 20) return { max: 20,  mid: 10 };
  if (max <= 40) return { max: 40,  mid: 20 };
  if (max <= 60) return { max: 60,  mid: 30 };
  if (max <= 80) return { max: 80,  mid: 40 };
  return { max: 100, mid: 50 };
}

// ─── SVG: top-only rounded bar ────────────────────────────────────────────────

function topRoundedBar(x, y, w, h, r) {
  if (h <= 0) return '';
  const cr = Math.min(r, w / 2, h);
  return `M ${x + cr} ${y} L ${x + w - cr} ${y} Q ${x + w} ${y} ${x + w} ${y + cr}` +
         ` L ${x + w} ${y + h} L ${x} ${y + h} L ${x} ${y + cr}` +
         ` Q ${x} ${y} ${x + cr} ${y} Z`;
}

// ─── Chart layout: W=307 (375 screen − 40 scroll padding − 28 card padding), left-axis=28, top=8, bottom=20 ─────────────────────
const SVG_W = 307, SVG_L = 28, SVG_T = 8, SVG_B = 20;

// ─── Bar chart ────────────────────────────────────────────────────────────────

function drawBarChart(data, color, xLabels) {
  const W = SVG_W, L = SVG_L, T = SVG_T, B = SVG_B, H = 100;
  const chartW = W - L;      // 234
  const chartH = H - T - B;  // 72
  const n      = data.length;
  const scale  = niceScale(Math.max(...data));

  // Bar width and corner radius keyed on data-point count
  const bW = n === 7 ? 15 : n === 8 ? 15 : n === 14 ? 8 : 3;
  const r  = bW / 2;  // fully rounded top (arch shape)
  const gap = (chartW - bW * n) / (n + 1);

  // Y positions for grid ticks
  const yZero = H - B;               // 80
  const yMax  = T;                    // 8
  const yMid  = (yZero + yMax) / 2;  // 44

  // Grid lines + Y labels
  let grid = '', ylbls = '';
  [[scale.max, yMax], [scale.mid, yMid], [0, yZero]].forEach(([val, y]) => {
    grid  += `<line x1="${L}" y1="${y}" x2="${W}" y2="${y}" stroke="#f0f2f5" stroke-width="1"/>`;
    ylbls += `<text x="${L - 3}" y="${y + 3.5}" text-anchor="end" font-size="8"` +
             ` fill="#aab0bc" font-family="Inter,-apple-system,sans-serif">${val}</text>`;
  });

  // Bars + X labels
  let bars = '', xlbls = '';
  data.forEach((v, i) => {
    const x  = L + gap + i * (bW + gap);
    const bh = (v / scale.max) * chartH;
    const d  = topRoundedBar(x, yZero - bh, bW, bh, r);
    if (d) bars += `<path d="${d}" fill="${color}"/>`;

    const lbl = xLabels ? (xLabels[i] || '') : '';
    if (lbl) {
      xlbls += `<text x="${(x + bW / 2).toFixed(1)}" y="${H - 5}" text-anchor="middle"` +
               ` font-size="8.5" fill="#5F6C85" font-family="Inter,-apple-system,sans-serif">${lbl}</text>`;
    }
  });

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" style="display:block;margin-top:4px;">${grid}${ylbls}${bars}${xlbls}</svg>`;
}

// ─── Line chart ───────────────────────────────────────────────────────────────

function drawLineChart(data, color, xLabels) {
  const W = SVG_W, L = SVG_L, T = SVG_T, B = SVG_B, H = 85;
  const chartW = W - L;      // 234
  const chartH = H - T - B;  // 57
  const n      = data.length;
  const scale  = niceScale(Math.max(...data));

  const yZero = H - B;
  const yMax  = T;
  const yMid  = (yZero + yMax) / 2;

  // Grid + Y labels
  let grid = '', ylbls = '';
  [[scale.max, yMax], [scale.mid, yMid], [0, yZero]].forEach(([val, y]) => {
    grid  += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${W}" y2="${y.toFixed(1)}" stroke="#f0f2f5" stroke-width="1"/>`;
    ylbls += `<text x="${L - 3}" y="${(y + 3.5).toFixed(1)}" text-anchor="end" font-size="8"` +
             ` fill="#aab0bc" font-family="Inter,-apple-system,sans-serif">${val}</text>`;
  });

  // Data → pixel coords
  const xs = data.map((_, i) => L + (n > 1 ? i / (n - 1) : 0.5) * chartW);
  const ys = data.map(v => yZero - (v / scale.max) * chartH);

  // Smooth cubic bezier path
  let linePath = `M ${xs[0].toFixed(1)},${ys[0].toFixed(1)}`;
  for (let i = 1; i < n; i++) {
    const cpx = ((xs[i - 1] + xs[i]) / 2).toFixed(1);
    linePath += ` C ${cpx},${ys[i - 1].toFixed(1)} ${cpx},${ys[i].toFixed(1)} ${xs[i].toFixed(1)},${ys[i].toFixed(1)}`;
  }
  const areaPath = `${linePath} L ${xs[n - 1].toFixed(1)},${yZero} L ${xs[0].toFixed(1)},${yZero} Z`;

  // X labels
  let xlbls = '';
  if (xLabels) {
    xLabels.forEach((lbl, i) => {
      if (!lbl) return;
      xlbls += `<text x="${xs[i].toFixed(1)}" y="${H - 5}" text-anchor="middle"` +
               ` font-size="8.5" fill="#5F6C85" font-family="Inter,-apple-system,sans-serif">${lbl}</text>`;
    });
  }

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" style="display:block;margin-top:4px;">
    <defs><linearGradient id="lga" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    ${grid}${ylbls}
    <path d="${areaPath}" fill="url(#lga)"/>
    <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    ${xlbls}
  </svg>`;
}

// ─── Period X-axis label sets ─────────────────────────────────────────────────

const X_LABELS = {
  today: ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'],
  '7d':  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '14d': (() => {
    const a = Array(14).fill('');
    [[0,'13d'], [3,'10d'], [6,'7d'], [9,'4d'], [12,'1d'], [13,'T']].forEach(([i, v]) => { a[i] = v; });
    return a;
  })(),
  '30d': (() => {
    const a = Array(30).fill('');
    [[0,'30'], [6,'24'], [12,'18'], [18,'12'], [24,'6'], [29,'T']].forEach(([i, v]) => { a[i] = v; });
    return a;
  })(),
};

const PERIOD_SUB = {
  today: 'today',
  '7d':  'last 7 days',
  '14d': 'last 14 days',
  '30d': 'last 30 days',
};

// ─── Per-pet chart data ───────────────────────────────────────────────────────

const chartData = {
  luna: {
    today: {
      activity:    [20, 10,  8, 25, 48, 55, 42, 28],
      elimination: [ 0,  0,  1,  0,  0,  0,  1,  0],
      eating:      [ 0,  0,  1,  0,  1,  0,  0,  0],
    },
    '7d': {
      activity:    [55, 48, 30, 22, 18, 28, 42],
      elimination: [ 4,  3,  4,  2,  3,  1,  1],
      eating:      [ 3,  3,  2,  3,  2,  2,  2],
    },
    '14d': {
      activity:    [62, 58, 55, 52, 48, 44, 40, 30, 22, 18, 24, 28, 35, 42],
      elimination: [ 4,  4,  3,  4,  3,  4,  2,  3,  1,  1,  2,  3,  2,  1],
      eating:      [ 3,  3,  3,  3,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2],
    },
    '30d': {
      activity:    genData(30, 68, 10, -0.4,  11),
      elimination: genData(30,  4,  1, -0.05, 22),
      eating:      genData(30,  3,  0.7, -0.02, 33),
    },
  },
  coco: {
    today: {
      activity:    [40, 30, 22, 55, 75, 80, 70, 60],
      elimination: [ 0,  0,  1,  1,  1,  0,  1,  0],
      eating:      [ 0,  0,  1,  0,  1,  1,  0,  1],
    },
    '7d': {
      activity:    [72, 78, 64, 82, 68, 74, 78],
      elimination: [ 4,  5,  4,  4,  3,  5,  4],
      eating:      [ 3,  4,  3,  3,  4,  3,  3],
    },
    '14d': {
      activity:    [70, 75, 72, 78, 64, 80, 68, 74, 78, 72, 75, 70, 76, 78],
      elimination: [ 4,  5,  4,  5,  4,  4,  3,  5,  4,  4,  5,  4,  5,  4],
      eating:      [ 3,  4,  3,  4,  3,  3,  4,  3,  3,  4,  3,  4,  3,  3],
    },
    '30d': {
      activity:    genData(30, 74, 8, 0, 44),
      elimination: genData(30,  4, 0.8, 0, 55),
      eating:      genData(30,  3, 0.5, 0, 66),
    },
  },
  mike: {
    today: {
      activity:    [35, 20, 15, 60, 80, 85, 75, 65],
      elimination: [ 0,  0,  1,  0,  1,  1,  0,  1],
      eating:      [ 0,  0,  1,  1,  0,  1,  0,  1],
    },
    '7d': {
      activity:    [80, 85, 76, 90, 82, 86, 72],
      elimination: [ 3,  4,  5,  4,  4,  3,  3],
      eating:      [ 3,  3,  4,  3,  3,  4,  3],
    },
    '14d': {
      activity:    [82, 78, 80, 85, 76, 82, 90, 85, 82, 86, 80, 72, 75, 72],
      elimination: [ 3,  4,  4,  5,  4,  4,  4,  5,  4,  3,  4,  3,  3,  3],
      eating:      [ 3,  3,  4,  3,  4,  3,  3,  4,  3,  3,  3,  4,  3,  3],
    },
    '30d': {
      activity:    genData(30, 82, 8, 0, 77),
      elimination: genData(30,  4, 0.8, 0, 88),
      eating:      genData(30,  3, 0.5, 0, 99),
    },
  },
};

// ─── Chart render + tab switch ────────────────────────────────────────────────

let activePetId = null;
let activeHealthPeriod = 'today';
const HEALTH_PERIODS = ['today', '7d', '14d', '30d'];

function renderHealthCharts(period) {
  const petData = chartData[activePetId] || chartData.coco;
  const cd  = petData[period] || petData.today;
  const xl  = X_LABELS[period];
  const sub = PERIOD_SUB[period] || 'today';

  document.getElementById('chart-activity').innerHTML    = drawLineChart(cd.activity,    '#6e76fe', xl);
  document.getElementById('chart-elimination').innerHTML = drawBarChart(cd.elimination,  '#4EC1EB', xl);
  document.getElementById('chart-eating').innerHTML      = drawBarChart(cd.eating,        '#99E09D', xl);

  document.getElementById('sub-activity').textContent    = 'Movement index · ' + sub;
  document.getElementById('sub-elimination').textContent = 'Litter box visits · ' + sub;
  document.getElementById('sub-eating').textContent      = 'Meal visits · ' + sub;
}

function switchHealthPeriod(period) {
  if (!HEALTH_PERIODS.includes(period)) return;
  activeHealthPeriod = period;
  document.querySelectorAll('#health-tabs .health-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.period === period);
  });
  renderHealthCharts(period);
}

function switchHealthTab(el, period) {
  switchHealthPeriod(period);
}

function switchAdjacentHealthPeriod(direction) {
  const currentIndex = HEALTH_PERIODS.indexOf(activeHealthPeriod);
  if (currentIndex < 0) return;

  const nextIndex = direction === 'left' ? currentIndex + 1 : currentIndex - 1;
  if (nextIndex < 0 || nextIndex >= HEALTH_PERIODS.length) return;
  switchHealthPeriod(HEALTH_PERIODS[nextIndex]);
}

function enableHealthPeriodSwipe() {
  const swipeTargets = [
    document.getElementById('health-tabs'),
    document.getElementById('health-report-content')
  ].filter(Boolean);

  swipeTargets.forEach((target) => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    target.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
      startY = event.clientY;
      tracking = true;
    });

    target.addEventListener('pointerup', (event) => {
      if (!tracking) return;
      tracking = false;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

      switchAdjacentHealthPeriod(dx < 0 ? 'left' : 'right');
    });

    target.addEventListener('pointercancel', () => {
      tracking = false;
    });
  });
}

// ─── Section builders ─────────────────────────────────────────────────────────

function buildProfileCard(pet) {
  return `
    <div class="pi-profile-card">
      <div class="pi-avatar-wrap">
        <div class="pi-avatar">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <use href="#${pet.avatar}" width="72" height="72"/>
          </svg>
        </div>
      </div>
      <div class="pi-info-row">
        <span class="pi-info-label">Name</span>
        <span class="pi-info-value">${pet.name}</span>
      </div>
      <div class="pi-info-row">
        <span class="pi-info-label">Weight</span>
        <span class="pi-info-value">${pet.weight}</span>
      </div>
      <div class="pi-info-row">
        <span class="pi-info-label">Birthday</span>
        <span class="pi-info-value">${pet.birthday}</span>
      </div>
      <div class="pi-info-row">
        <span class="pi-info-label">Breed</span>
        <span class="pi-info-value">${pet.breed}</span>
      </div>
      <div class="pi-info-row">
        <span class="pi-info-label">Neutered</span>
        <span class="pi-info-value">${pet.neuteredStatus}</span>
      </div>
      <div class="pi-med-section">
        <div class="pi-med-label">Medical History</div>
        ${(pet.medicalHistory && pet.medicalHistory.length > 0)
          ? `<div class="pi-med-tags">${pet.medicalHistory.map(d => `<span class="pi-med-tag">${d}</span>`).join('')}</div>`
          : `<div class="pi-med-empty">No medical history recorded.</div>`
        }
      </div>
      <div class="pi-divider"></div>
      <div class="pi-additional-label">Additional information</div>
      <div class="pi-address">${pet.address || '—'}</div>
    </div>`;
}

function buildRecentAlerts(alerts, petId) {
  if (alerts.length === 0) return '';

  const cards = alerts.map(a => `
    <div class="pi-alert-card" onclick="location.href='detail.html?id=${a.id}'">
      <div class="pi-alert-thumb">
        <svg viewBox="0 0 56 48" width="56" height="48" style="position:absolute;inset:0;">
          <rect width="56" height="48" fill="#0f1520"/>
          <rect x="6" y="14" width="34" height="24" rx="3" fill="#1a2535"/>
          <rect x="4" y="10" width="4" height="28" rx="2" fill="#1e2c40"/>
          <rect x="38" y="10" width="4" height="28" rx="2" fill="#1e2c40"/>
          <rect x="6" y="10" width="34" height="8" rx="2" fill="#1e2c40"/>
          <ellipse cx="26" cy="43" rx="10" ry="4" fill="#131c28"/>
          <rect x="20" y="28" width="12" height="16" rx="4" fill="#3d6a3d"/>
          <circle cx="26" cy="23" r="7" fill="#3d6a3d"/>
          <polygon points="21,18 19,10 24,17" fill="#3d6a3d"/>
          <polygon points="31,18 33,10 28,17" fill="#3d6a3d"/>
          <circle cx="23" cy="22" r="2" fill="#7afc7a" opacity="0.9"/>
          <circle cx="29" cy="22" r="2" fill="#7afc7a" opacity="0.9"/>
        </svg>
        <div class="pi-play-btn" style="position:relative;z-index:2;">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M1 1L7 5L1 9V1Z" fill="#2A282F"/>
          </svg>
        </div>
      </div>
      <div class="pi-alert-info">
        <div class="pi-alert-alarm">${a.alarm}</div>
        <div class="pi-alert-time">${a.time}</div>
      </div>
    </div>`).join('');

  return `
    <div class="pi-section">
      <div class="pi-section-header">
        <div class="pi-section-title" style="margin:0;">Recent alerts</div>
        <a class="pi-view-all" href="alerts.html?id=${petId}">View all</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">${cards}</div>
    </div>`;
}

// ─── Empty chart SVGs (same axes as real charts, no data) ────────────────────

const FONT = 'font-family="Inter,-apple-system,sans-serif"';

// Today x-labels shared by both chart types
const TODAY_LBLS = ['12a','3a','6a','9a','12p','3p','6p','9p'];

// Bar chart (H=100): gap=17.67, bW=15, bar-center = 53.17 + i*32.67
const BAR_XS = TODAY_LBLS.map((_, i) => +(53.17 + i * 32.67).toFixed(1));

// Line chart (H=85): xs[i] = 28 + (i/7)*279
const LINE_XS = TODAY_LBLS.map((_, i) => +(28 + (i / 7) * 279).toFixed(1));

function emptyBarChartSVG() {
  const [W, L, H] = [307, 28, 100];
  const [yMax, yMid, yZero] = [8, 44, 80];
  const midX = ((L + W) / 2).toFixed(1);
  const midY = ((yMax + yZero) / 2 + 4).toFixed(1);   // text baseline

  const grid = [[yMax],[yMid],[yZero]].map(([y]) =>
    `<line x1="${L}" y1="${y}" x2="${W}" y2="${y}" stroke="#f0f2f5" stroke-width="1"/>`
  ).join('');

  const ylbls =
    `<text x="${L-3}" y="${yMax+3.5}" text-anchor="end" font-size="8" fill="#d0d6e0" ${FONT}>–</text>` +
    `<text x="${L-3}" y="${yMid+3.5}" text-anchor="end" font-size="8" fill="#d0d6e0" ${FONT}>–</text>` +
    `<text x="${L-3}" y="${yZero+3.5}" text-anchor="end" font-size="8" fill="#aab0bc" ${FONT}>0</text>`;

  const xlbls = TODAY_LBLS.map((lbl, i) =>
    `<text x="${BAR_XS[i]}" y="${H-5}" text-anchor="middle" font-size="8.5" fill="#5F6C85" ${FONT}>${lbl}</text>`
  ).join('');

  const msg = `<text x="${midX}" y="${midY}" text-anchor="middle" font-size="11" fill="#c0c8d8" ${FONT}>Not enough data yet</text>`;

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" style="display:block;margin-top:4px;">${grid}${ylbls}${xlbls}${msg}</svg>`;
}

function emptyLineChartSVG() {
  const [W, L, H] = [307, 28, 85];
  const [yMax, yMid, yZero] = [8, 36.5, 65];
  const midX = ((L + W) / 2).toFixed(1);
  const midY = ((yMax + yZero) / 2 + 4).toFixed(1);

  const grid = [[yMax],[yMid],[yZero]].map(([y]) =>
    `<line x1="${L}" y1="${y}" x2="${W}" y2="${y}" stroke="#f0f2f5" stroke-width="1"/>`
  ).join('');

  const ylbls =
    `<text x="${L-3}" y="${yMax+3.5}" text-anchor="end" font-size="8" fill="#d0d6e0" ${FONT}>–</text>` +
    `<text x="${L-3}" y="${yMid+3.5}" text-anchor="end" font-size="8" fill="#d0d6e0" ${FONT}>–</text>` +
    `<text x="${L-3}" y="${yZero+3.5}" text-anchor="end" font-size="8" fill="#aab0bc" ${FONT}>0</text>`;

  const xlbls = TODAY_LBLS.map((lbl, i) =>
    `<text x="${LINE_XS[i]}" y="${H-5}" text-anchor="middle" font-size="8.5" fill="#5F6C85" ${FONT}>${lbl}</text>`
  ).join('');

  const msg = `<text x="${midX}" y="${midY}" text-anchor="middle" font-size="11" fill="#c0c8d8" ${FONT}>Not enough data yet</text>`;

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" style="display:block;margin-top:4px;">${grid}${ylbls}${xlbls}${msg}</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────

function buildHealthReport(pet) {
  /* ── New pet: axes-only charts with empty-state message ── */
  if (pet.isNew) {
    return `
      <div class="pi-section">
        <div class="pi-section-title">Health report</div>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="health-card">
            <div class="health-card-title">Abnormal Behaviour</div>
            <div class="health-card-sub">Detected events today</div>
            <p class="pi-no-events" style="color:#c0c8d8;">Not enough data yet</p>
          </div>
          <div class="health-card">
            <div class="health-card-title">Activity Level</div>
            <div class="health-card-sub">Movement index · today</div>
            ${emptyLineChartSVG()}
          </div>
          <div class="health-card">
            <div class="health-card-title">Elimination Frequency</div>
            <div class="health-card-sub">Litter box visits · today</div>
            ${emptyBarChartSVG()}
          </div>
          <div class="health-card">
            <div class="health-card-title">Eating Frequency</div>
            <div class="health-card-sub">Meal visits · today</div>
            ${emptyBarChartSVG()}
          </div>
        </div>
      </div>`;
  }

  /* ── Existing pet: full report ── */
  const abnormalItems = pet.recentEvents.length > 0
    ? pet.recentEvents.map(e => `
        <div class="pi-abnormal-item">
          <span class="pi-abnormal-label">${e.label}</span>
          <span class="pi-abnormal-time">${e.time}</span>
        </div>`).join('')
    : `<p class="pi-no-events">No abnormal behaviour detected.</p>`;

  return `
    <div class="pi-section">
      <div class="pi-section-title">Health report</div>
      <div class="health-tabs" id="health-tabs">
        <div class="health-tab active" data-period="today" onclick="switchHealthTab(this,'today')">Today</div>
        <div class="health-tab" data-period="7d" onclick="switchHealthTab(this,'7d')">7 days</div>
        <div class="health-tab" data-period="14d" onclick="switchHealthTab(this,'14d')">14 days</div>
        <div class="health-tab" data-period="30d" onclick="switchHealthTab(this,'30d')">30 days</div>
      </div>
      <div id="health-report-content" style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
        <div class="health-card">
          <div class="health-card-title">Abnormal Behaviour</div>
          <div class="health-card-sub">Detected events today</div>
          ${abnormalItems}
        </div>
        <div class="health-card">
          <div class="health-card-title">Activity Level</div>
          <div class="health-card-sub" id="sub-activity"></div>
          <div id="chart-activity"></div>
        </div>
        <div class="health-card">
          <div class="health-card-title">Elimination Frequency</div>
          <div class="health-card-sub" id="sub-elimination"></div>
          <div id="chart-elimination"></div>
        </div>
        <div class="health-card">
          <div class="health-card-title">Eating Frequency</div>
          <div class="health-card-sub" id="sub-eating"></div>
          <div id="chart-eating"></div>
        </div>
      </div>
    </div>`;
}

// ─── Edit ─────────────────────────────────────────────────────────────────────

function goEdit() {
  location.href = 'add-pet.html?edit=' + activePetId;
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const petId  = params.get('id');
  const all    = getAllPets();
  const pet    = all.find(p => p.id === petId) || all[0];
  activePetId  = pet.id;

  // New pets have no alerts
  const petAlerts = pet.isNew ? [] : ALERTS.filter(
    a => a.name.toLowerCase() === pet.name.toLowerCase() && a.type === 'video'
  );

  const content = document.getElementById('pi-content');
  content.innerHTML = `<div class="pi-content-inner">
    ${buildProfileCard(pet)}
    ${buildRecentAlerts(petAlerts, pet.id)}
    ${buildHealthReport(pet)}
  </div>`;

  // Only render charts for existing pets that have chart data
  if (!pet.isNew) {
    switchHealthPeriod('today');
    enableHealthPeriodSwipe();
  }
});
