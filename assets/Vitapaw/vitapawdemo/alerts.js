// ─── All Alerts page ──────────────────────────────────────────────────────────

let allPetAlerts = [];

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const petId  = params.get('id');
  const pet    = PETS.find(p => p.id === petId) || PETS[0];

  // All alerts for this pet (any type), newest first
  allPetAlerts = ALERTS
    .filter(a => a.name.toLowerCase() === pet.name.toLowerCase())
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  document.getElementById('al-title').textContent = pet.name + ''s Alerts';

  renderAlerts('');
});

// ─── Render ───────────────────────────────────────────────────────────────────

function renderAlerts(dateFilter) {
  const filtered = dateFilter
    ? allPetAlerts.filter(a => a.date === dateFilter)
    : allPetAlerts;

  const list  = document.getElementById('al-list');
  const empty = document.getElementById('al-empty');
  const count = document.getElementById('al-result-count');

  if (filtered.length === 0) {
    list.innerHTML  = '';
    empty.style.display = 'flex';
    count.textContent   = '';
  } else {
    empty.style.display = 'none';
    count.textContent   = filtered.length + ' alert' + (filtered.length > 1 ? 's' : '');
    list.innerHTML = filtered.map(a => buildAlertCard(a)).join('');
  }
}

// ─── Alert card HTML ──────────────────────────────────────────────────────────

function buildAlertCard(a) {
  const dotColor = a.priority === 'urgent' ? '#FF4D4D'
                 : a.priority === 'red'    ? '#FF4D4D'
                 : '#FF9A3C';

  const thumb = a.type === 'video'
    ? `<svg viewBox="0 0 56 48" width="56" height="48" style="position:absolute;inset:0;">
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
      </div>`
    : `<svg viewBox="0 0 56 48" width="56" height="48" style="position:absolute;inset:0;">
        <rect width="56" height="48" fill="#0f1520"/>
        <polyline points="8,36 18,24 26,30 36,16 48,20" fill="none" stroke="#4EC1EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="36" cy="16" r="3" fill="#4EC1EB"/>
      </svg>`;

  return `
    <div class="pi-alert-card al-alert-card" onclick="location.href='detail.html?id=${a.id}'">
      <div class="pi-alert-thumb" style="position:relative;">
        ${thumb}
      </div>
      <div class="pi-alert-info">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
          <span class="al-dot" style="background:${dotColor};"></span>
          <span class="pi-alert-alarm">${a.alarm}</span>
        </div>
        <div class="pi-alert-time">${a.time}</div>
      </div>
    </div>`;
}

// ─── Date filter handlers ─────────────────────────────────────────────────────

function onDateChange(val) {
  renderAlerts(val);
  document.getElementById('al-clear-btn').style.display = val ? 'inline-flex' : 'none';
}

function clearDate() {
  document.getElementById('al-date-input').value = '';
  document.getElementById('al-clear-btn').style.display = 'none';
  renderAlerts('');
}
