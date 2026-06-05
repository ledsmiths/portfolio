// ─── Navigation ──────────────────────────────────────────────────────────────

function goDetail(id) {
  window.location.href = 'detail.html?id=' + id;
}

function goMonitor() {
  window.location.href = 'monitor.html';
}

// ─── Tab switching ────────────────────────────────────────────────────────────

let currentTab = 'new';

function switchTab(tab) {
  const newContent  = document.getElementById('new-content');
  const seenContent = document.getElementById('seen-content');
  const tabNew      = document.getElementById('tab-new');
  const tabSeen     = document.getElementById('tab-seen');

  currentTab = tab;

  if (tab === 'new') {
    newContent.style.display  = 'block';
    seenContent.style.display = 'none';
    tabNew.className  = 'tab active';
    tabSeen.className = 'tab';
  } else {
    newContent.style.display  = 'none';
    seenContent.style.display = 'block';
    tabNew.className  = 'tab';
    tabSeen.className = 'tab active';
  }
}

function switchToAdjacentTab(direction) {
  if (direction === 'left' && currentTab === 'new') switchTab('seen');
  if (direction === 'right' && currentTab === 'seen') switchTab('new');
}

function enableTabSwipe() {
  const swipeTargets = [
    document.querySelector('.tabs'),
    document.querySelector('.scroll-content')
  ].filter(Boolean);
  let suppressClickUntil = 0;

  document.addEventListener('click', (event) => {
    if (Date.now() > suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

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
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

      suppressClickUntil = Date.now() + 350;
      switchToAdjacentTab(dx < 0 ? 'left' : 'right');
    });

    target.addEventListener('pointercancel', () => {
      tracking = false;
    });
  });
}

// ─── Card builders ────────────────────────────────────────────────────────────

function avatarSVG(avatarId, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 72 72">
    <use href="#${avatarId}" width="72" height="72"/>
  </svg>`;
}

function buildUrgentCard(alert) {
  return `
    <div class="urgent-card" onclick="goDetail('${alert.id}')">
      <div class="urgent-top">
        <div class="urgent-pet-avatar">${avatarSVG(alert.avatar, 72)}</div>
        <div>
          <div class="uname">${alert.name}</div>
          <div class="udesc">${alert.alarm}</div>
          <div class="utime">${alert.time}</div>
        </div>
      </div>
      <div class="urgent-footer">
        <span>Attention required</span>
        <div class="chevron-circle">
          <svg width="14" height="14">
            <use href="#icon-chevron-right" width="14" height="14" stroke="#fff"/>
          </svg>
        </div>
      </div>
    </div>`;
}

function buildAlertCard(alert, isIgnored = false) {
  const barClass    = alert.priority === 'red' ? 'bar-red' : 'bar-orange';
  const ignoredTag  = isIgnored
    ? '<span class="ignored-tag">Ignored</span>'
    : '';
  return `
    <div class="alert-card" onclick="goDetail('${alert.id}')">
      <div class="alert-bar-wrap">
        <div class="alert-bar-inner ${barClass}"></div>
      </div>
      <div class="alert-inner">
        <div class="alert-info">
          <div class="alert-name">${alert.name}</div>
          <div class="alert-desc">${alert.alarm}</div>
          <div class="alert-time">${alert.time}</div>
          ${ignoredTag}
        </div>
        <div class="alert-pet">${avatarSVG(alert.avatar, 38)}</div>
        <svg width="16" height="16">
          <use href="#icon-chevron-right" width="16" height="16" stroke="#cbdffa"/>
        </svg>
      </div>
    </div>`;
}

// ─── Render lists ─────────────────────────────────────────────────────────────

function renderLists() {
  const seenIds  = getSeenIds();
  const newAlerts  = ALERTS.filter(a => !seenIds.includes(a.id));
  const seenAlerts = ALERTS.filter(a =>  seenIds.includes(a.id));

  // ── New tab ──
  // Urgent card = original urgent if unseen; else first red if unseen; else none
  let urgentAlert   = newAlerts.find(a => a.priority === 'urgent')
                   || newAlerts.find(a => a.priority === 'red')
                   || null;
  let regularAlerts = urgentAlert
                   ? newAlerts.filter(a => a.id !== urgentAlert.id)
                   : newAlerts;

  let newHTML = '';
  if (urgentAlert)          newHTML += buildUrgentCard(urgentAlert);
  regularAlerts.forEach(a => { newHTML += buildAlertCard(a); });

  document.getElementById('new-list').innerHTML = newHTML
    || '<p style="text-align:center;color:#bbb;font-size:13px;padding:32px 0;">All caught up!</p>';

  // ── Seen tab ──
  const ignoredIds = getIgnoredIds();
  let seenHTML = '';
  seenAlerts.forEach(a => {
    seenHTML += buildAlertCard(a, ignoredIds.includes(a.id));
  });

  document.getElementById('seen-list').innerHTML = seenHTML
    || '<p style="text-align:center;color:#bbb;font-size:13px;padding:32px 0;">No seen alerts yet.</p>';
}

document.addEventListener('DOMContentLoaded', () => {
  renderLists();
  enableTabSwipe();
});
