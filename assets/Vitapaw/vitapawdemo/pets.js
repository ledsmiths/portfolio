// ─── Helpers ──────────────────────────────────────────────────────────────────

function petAvatarSVG(avatarId, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 72 72">
    <use href="#${avatarId}" width="72" height="72"/>
  </svg>`;
}

function goPetInfo(id) {
  window.location.href = 'pet-info.html?id=' + id;
}

// ─── Card builders ────────────────────────────────────────────────────────────

/** Expanded priority card — shown for the first pet that has recent events. */
function buildPriorityCard(pet) {
  const eventsHTML = pet.recentEvents.map((e, i) => `
    <div class="pet-event-row" ${i === 0 ? 'style="border-top:none;padding-top:0;"' : ''}>
      <span class="pet-event-name">${e.label}</span>
      <span class="pet-event-duration">${e.time}</span>
    </div>`
  ).join('');

  return `
    <div class="pet-priority-card" onclick="goPetInfo('${pet.id}')" style="cursor:pointer;">
      <div class="pet-card-top">
        <div class="pet-avatar-sm">${petAvatarSVG(pet.avatar, 36)}</div>
        <span class="pet-card-name">${pet.name}</span>
      </div>
      <div class="pet-stats-block">
        <div class="pet-stats-row">
          <div class="pet-stat">
            <div class="pet-stat-label">Weight</div>
            <div class="pet-stat-value">${pet.weight}</div>
          </div>
          <div class="pet-stat">
            <div class="pet-stat-label">Birthday</div>
            <div class="pet-stat-value">${pet.birthday}</div>
          </div>
          <div class="pet-stat">
            <div class="pet-stat-label">Breed</div>
            <div class="pet-stat-value">${pet.breed}</div>
          </div>
        </div>
      </div>
      <div class="pet-section-divider"></div>
      <div class="pet-recent-label">Recent alert <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF9A3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
      ${eventsHTML}
    </div>`;
}

/** Compact card — for pets without recent events. */
function buildCompactCard(pet) {
  return `
    <div class="pet-compact-card" onclick="goPetInfo('${pet.id}')">
      <div class="pet-compact-info">
        <div class="pet-compact-name">${pet.name}</div>
        <div class="pet-compact-meta">Weight: ${pet.weight} &nbsp;&nbsp; Birthday: ${pet.birthday}</div>
      </div>
      <div class="pet-avatar-lg">${petAvatarSVG(pet.avatar, 52)}</div>
    </div>`;
}

// ─── Render ───────────────────────────────────────────────────────────────────

function renderPets(query = '') {
  const q = query.trim().toLowerCase();

  // Filter by search query (includes user-added pets)
  const allPets = getAllPets();
  const filtered = q
    ? allPets.filter(p => p.name.toLowerCase().includes(q))
    : [...allPets];

  // Sort: pets with recent events float to the top
  filtered.sort((a, b) => {
    const aHas = a.recentEvents.length > 0 ? 0 : 1;
    const bHas = b.recentEvents.length > 0 ? 0 : 1;
    return aHas - bHas;
  });

  const list = document.getElementById('pets-list');

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:#bbb;font-size:13px;padding:32px 0;">No pets found.</p>';
    return;
  }

  list.innerHTML = filtered.map((pet, i) =>
    i === 0 && pet.recentEvents.length > 0
      ? buildPriorityCard(pet)
      : buildCompactCard(pet)
  ).join('');
}

function filterPets(query) {
  renderPets(query);
}

document.addEventListener('DOMContentLoaded', () => renderPets());
