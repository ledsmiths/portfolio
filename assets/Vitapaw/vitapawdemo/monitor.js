// ─── Zone mode ────────────────────────────────────────────────────────────────

const isZoneMode = new URLSearchParams(location.search).get('mode') === 'zone';

if (isZoneMode) {
  document.addEventListener('DOMContentLoaded', initZoneMode);
}

let zoneTab    = 'toilet';
let isDrawing  = false;
let drawStart  = null;
let pendingZone = null;

function initZoneMode() {
  // Update nav title
  const navTitle = document.querySelector('.monitor-nav span');
  if (navTitle) navTitle.textContent = 'Set Pet Zones';

  // Show zone panel
  const panel = document.getElementById('zone-panel');
  if (panel) panel.style.display = 'flex';

  // Wire up drawing overlay events
  const overlay = document.getElementById('draw-overlay');
  overlay.addEventListener('pointerdown', onDrawStart);
  overlay.addEventListener('pointermove', onDrawMove);
  overlay.addEventListener('pointerup',   onDrawEnd);
  overlay.addEventListener('pointercancel', onDrawEnd);
}

// ─── Tab selection ────────────────────────────────────────────────────────────

function selectTab(type) {
  zoneTab = type;
  const tToilet  = document.getElementById('tab-toilet');
  const tFeeding = document.getElementById('tab-feeding');
  tToilet.className  = 'zone-tab toilet'  + (type === 'toilet'  ? ' zone-tab-active' : '');
  tFeeding.className = 'zone-tab feeding' + (type === 'feeding' ? ' zone-tab-active' : '');
  if (pendingZone) { pendingZone.type = type; renderZone(pendingZone); }
}

// ─── Draw mode ────────────────────────────────────────────────────────────────

function startDraw() {
  const overlay  = document.getElementById('draw-overlay');
  const drawBtn  = document.getElementById('draw-btn');
  const hintBar  = document.getElementById('zone-hint');
  const drawHint = document.getElementById('draw-hint');

  overlay.style.display  = 'block';
  drawHint.style.display = 'block';
  drawBtn.classList.add('active');
  hintBar.textContent = 'Drag on the camera feed to draw a zone';

  // Fade hint after 1.8s
  setTimeout(() => { drawHint.style.display = 'none'; }, 1800);
}

function onDrawStart(e) {
  const areaRect = document.getElementById('draw-overlay').getBoundingClientRect();
  isDrawing = true;
  drawStart = { x: e.clientX - areaRect.left, y: e.clientY - areaRect.top };
  e.currentTarget.setPointerCapture(e.pointerId);

  const rb = document.getElementById('rubber-band');
  rb.style.cssText = `display:block;left:${drawStart.x}px;top:${drawStart.y}px;width:0;height:0;` +
    `position:absolute;border:2px dashed rgba(255,255,255,0.85);z-index:31;pointer-events:none;border-radius:3px;`;
}

function onDrawMove(e) {
  if (!isDrawing) return;
  const areaRect = document.getElementById('draw-overlay').getBoundingClientRect();
  const x = e.clientX - areaRect.left;
  const y = e.clientY - areaRect.top;
  const rb = document.getElementById('rubber-band');
  rb.style.left   = Math.min(x, drawStart.x) + 'px';
  rb.style.top    = Math.min(y, drawStart.y) + 'px';
  rb.style.width  = Math.abs(x - drawStart.x) + 'px';
  rb.style.height = Math.abs(y - drawStart.y) + 'px';
}

function onDrawEnd(e) {
  if (!isDrawing) return;
  isDrawing = false;

  const overlay  = document.getElementById('draw-overlay');
  const drawBtn  = document.getElementById('draw-btn');
  const rb       = document.getElementById('rubber-band');
  const hintBar  = document.getElementById('zone-hint');
  const area     = document.getElementById('draw-overlay').getBoundingClientRect();

  const left   = parseFloat(rb.style.left)   / area.width  * 100;
  const top    = parseFloat(rb.style.top)    / area.height * 100;
  const width  = parseFloat(rb.style.width)  / area.width  * 100;
  const height = parseFloat(rb.style.height) / area.height * 100;

  rb.style.display      = 'none';
  overlay.style.display = 'none';
  drawBtn.classList.remove('active');

  if (width > 3 && height > 3) {
    pendingZone = { left, top, width, height, type: zoneTab };
    renderZone(pendingZone);
    document.getElementById('confirm-btn').disabled = false;
    hintBar.textContent = 'Zone marked — select type and confirm';
  } else {
    hintBar.textContent = 'Too small — try again';
  }
}

// ─── Render zone overlay ──────────────────────────────────────────────────────

function renderZone(z) {
  const isToilet = z.type === 'toilet';
  const fill     = isToilet ? 'rgba(78,193,235,0.22)' : 'rgba(255,154,60,0.22)';
  const border   = isToilet ? '#4EC1EB' : '#FF9A3C';
  const label    = isToilet ? 'Toilet Area' : 'Feeding Area';

  document.getElementById('zones-container').innerHTML = `
    <div style="position:absolute;left:${z.left}%;top:${z.top}%;width:${z.width}%;height:${z.height}%;
      background:${fill};border:2px solid ${border};border-radius:4px;box-sizing:border-box;">
      <span style="position:absolute;top:5px;left:7px;font-size:10px;font-weight:700;color:${border};
        background:rgba(0,0,0,0.5);padding:2px 7px;border-radius:10px;white-space:nowrap;">${label}</span>
    </div>`;
}

// ─── Confirm ──────────────────────────────────────────────────────────────────

function confirmZone() {
  const label = pendingZone.type === 'toilet' ? 'Toilet Area' : 'Feeding Area';
  showToast(label + ' saved!');
  setTimeout(() => history.back(), 1300);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:120px;left:50%;transform:translateX(-50%);' +
    'background:#4CD087;color:#fff;padding:10px 22px;border-radius:20px;' +
    'font-size:14px;font-weight:600;z-index:999;pointer-events:none;' +
    'box-shadow:0 4px 12px rgba(76,208,135,.4);';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1300);
}
