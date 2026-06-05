// ─── Pet profiles ────────────────────────────────────────────────────────────

const PETS = [
  {
    id:             'luna',
    name:           'Luna',
    weight:         '5 kg',
    birthday:       '3/16/25',
    breed:          'Ragdoll',
    avatar:         'cb',
    neuteredStatus: 'Neutered',
    address:        '3 Bale Close Ifako, Gbagada',
    recentEvents: [
      { label: 'Body Trembling',   time: '11:00 11/12' },
      { label: 'Unsteady Walking', time: '11:00 11/12' },
    ],
  },
  {
    id:             'coco',
    name:           'Coco',
    weight:         '5 kg',
    birthday:       '3/16/25',
    breed:          'Persian',
    avatar:         'ca',
    neuteredStatus: 'Not neutered',
    address:        '3 Bale Close Ifako, Gbagada',
    recentEvents:   [],
  },
  {
    id:             'mike',
    name:           'Mike',
    weight:         '5 kg',
    birthday:       '3/16/25',
    breed:          'Scottish Fold',
    avatar:         'cc',
    neuteredStatus: 'Neutered',
    address:        '3 Bale Close Ifako, Gbagada',
    recentEvents:   [],
  },
];

// ─── Alert data ───────────────────────────────────────────────────────────────
// priority: 'urgent' → 대형 그라디언트 카드 (1순위)
//           'red'    → 빨간 바 카드 (2순위, urgent 없으면 대형 승격)
//           'orange' → 주황 바 카드 (승격 안 됨)

const ALERTS = [
  {
    id:       'luna-posture',
    name:     'Luna',
    alarm:    'Reduced activity and abnormal posture',
    time:     'Today · 10:32',
    date:     '2026-05-22',
    type:     'video',
    avatar:   'cb',
    priority: 'urgent',
  },
  {
    id:       'coco-posture',
    name:     'Coco',
    alarm:    'Abnormal posture',
    time:     'Yesterday · 21:10',
    date:     '2026-05-21',
    type:     'video',
    avatar:   'ca',
    priority: 'red',
  },
  {
    id:       'luna-litter',
    name:     'Luna',
    alarm:    'Abnormal Litter Box Frequency',
    time:     '12 Mar · 10:32',
    date:     '2026-03-12',
    type:     'chart',
    avatar:   'cb',
    priority: 'orange',
  },
  {
    id:       'mike-litter',
    name:     'Mike',
    alarm:    'Abnormal Litter Box Frequency',
    time:     '11 Mar · 10:32',
    date:     '2026-03-11',
    type:     'chart',
    avatar:   'cc',
    priority: 'orange',
  },
];

// ─── Alarm content maps ───────────────────────────────────────────────────────

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

const defaultSuggestions = [
  'Observe closely for the next 30–60 minutes',
  'Check the surrounding environment',
  'Review recent behaviour patterns',
];

// ─── Custom pets (added by user) ─────────────────────────────────────────────

function getCustomPets() {
  try { return JSON.parse(localStorage.getItem('customPets') || '[]'); }
  catch { return []; }
}

/** Save a new pet OR overwrite an existing one (matched by id) */
function saveOrUpdatePet(pet) {
  const list = getCustomPets().filter(p => p.id !== pet.id);
  list.push(pet);
  localStorage.setItem('customPets', JSON.stringify(list));
}

// Kept for backward-compat
function saveCustomPet(pet) { saveOrUpdatePet(pet); }

/** Returns static PETS merged with custom pets.
 *  Custom pets with the same id override the static version. */
function getAllPets() {
  const custom      = getCustomPets();
  const overrideIds = new Set(custom.map(p => p.id));
  const staticIds   = new Set(PETS.map(p => p.id));

  // Static list, replaced where an edited version exists
  const merged = PETS.map(p =>
    overrideIds.has(p.id) ? custom.find(c => c.id === p.id) : p
  );
  // Purely new pets (not overrides of any static pet)
  const newPets = custom.filter(p => !staticIds.has(p.id));
  return [...merged, ...newPets];
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

function getSeenIds() {
  return JSON.parse(localStorage.getItem('seenAlerts') || '[]');
}

function markSeen(id) {
  const seen = getSeenIds();
  if (!seen.includes(id)) {
    localStorage.setItem('seenAlerts', JSON.stringify([...seen, id]));
  }
}

function unmarkSeen(id) {
  localStorage.setItem(
    'seenAlerts',
    JSON.stringify(getSeenIds().filter(s => s !== id))
  );
}

function getIgnoredIds() {
  return JSON.parse(localStorage.getItem('ignoredAlerts') || '[]');
}

function markIgnored(id) {
  const ignored = getIgnoredIds();
  if (!ignored.includes(id)) {
    localStorage.setItem('ignoredAlerts', JSON.stringify([...ignored, id]));
  }
  markSeen(id); // ignored 카드는 항상 seen에도 포함
}

function unmarkIgnored(id) {
  localStorage.setItem(
    'ignoredAlerts',
    JSON.stringify(getIgnoredIds().filter(i => i !== id))
  );
  unmarkSeen(id); // seen에서도 같이 제거
}
