const numberFormat = new Intl.NumberFormat('en-US');
const analyticsPath = '/analytics/analytics.json';
const platformButtons = [...document.querySelectorAll('[data-platform]')];
const periodButtons = [...document.querySelectorAll('[data-period]')];
const periodTabs = document.querySelector('#period-tabs');
const metricGrid = document.querySelector('#primary-metrics');
const secondaryRow = document.querySelector('#secondary-metrics');
const reportLink = document.querySelector('#report-link');
const sourceLink = document.querySelector('#source-link');
const reportAudienceLink = document.querySelector('.report-audience-link');
const mobileReport = document.querySelector('.mobile-report');
const state = { platform: 'instagram', period: '90', data: null };

const definitions = {
  instagram: {
    primary: [['Reel views', 'Views'], ['Viewers', 'Viewers'], ['Shares', 'Shares'], ['Saves', 'Saves']],
    secondary: [['Reels', 'Reels'], ['Likes', 'Likes'], ['Comments', 'Comments'], ['Reposts', 'Reposts']],
    handle: '@builtbyhikari.ai', subtitle: (entry) => `${numberFormat.format(entry.followers)} followers`, mark: '◎',
  },
  tiktok: {
    primary: [['Video Views', 'Video views'], ['Profile Views', 'Profile views'], ['Likes', 'Likes'], ['Shares', 'Shares']],
    secondary: [['Comments', 'Comments']],
    handle: '@builtbyhikari.ai', subtitle: () => 'TikTok analytics export', mark: '♪',
  },
};

function compact(value, label, rounded = false) {
  if (rounded && value >= 1000) {
    const decimals = value % 1000 === 0 ? 0 : 1;
    return `${(value / 1000).toFixed(decimals)}K`;
  }
  return numberFormat.format(value);
}

function dateLabel(entry) {
  const options = { month: 'short', day: 'numeric', timeZone: 'UTC' };
  const start = new Date(`${entry.startDate}T12:00:00Z`).toLocaleDateString('en-US', options);
  const end = new Date(`${entry.endDate}T12:00:00Z`).toLocaleDateString('en-US', { ...options, year: 'numeric' });
  return `${start} – ${end}`;
}

function currentEntry() {
  return state.data?.[state.platform]?.[state.period];
}

function renderMetrics() {
  const entry = currentEntry();
  if (!entry) return;
  const definition = definitions[state.platform];
  const rounded = entry.rounded ?? [];
  const metrics = definition.primary
    .filter(([key]) => Object.hasOwn(entry.metrics, key))
    .map(([key, label]) => ({ label, value: entry.metrics[key], exact: numberFormat.format(entry.metrics[key]), display: compact(entry.metrics[key], key, rounded.includes(key)) }));

  metricGrid.innerHTML = metrics.map(({ label, display, exact }) => `<div class="metric-card"><span class="metric-label">${label}</span><strong title="${exact}">${display}</strong></div>`).join('');
  secondaryRow.innerHTML = definition.secondary
    .filter(([key]) => Object.hasOwn(entry.metrics, key))
    .map(([key, label]) => `<span><strong>${compact(entry.metrics[key], key, rounded.includes(key))}</strong> ${label}</span>`).join('');
  secondaryRow.classList.toggle('few-stats', definition.secondary.length < 2);

  document.querySelector('#account-handle').textContent = definition.handle;
  document.querySelector('#account-subtitle').textContent = definition.subtitle(entry);
  document.querySelector('#platform-mark').textContent = definition.mark;
  document.querySelector('#date-range').textContent = dateLabel(entry);
  document.querySelector('#period-length').textContent = `${entry.days} days`;
  document.querySelector('#report-link').textContent = state.platform === 'instagram' ? `View ${entry.days}-day report ↗` : 'View TikTok analytics export ↗';
  for (const link of [reportLink, sourceLink]) {
    link.href = entry.source;
  }
  sourceLink.hidden = state.platform === 'instagram';
  sourceLink.textContent = 'View viewers export ↗';
  sourceLink.href = entry.viewerSource || entry.source;
  document.querySelector('#data-note').textContent = state.platform === 'instagram'
    ? `Instagram ${entry.days}-day report. ${rounded.length ? 'Rounded figures follow the report’s display.' : ''} The full source report remains available here.`
    : 'TikTok export reports video views, profile views, likes, comments, and shares. It does not provide a comparable unique-viewer total.';
  for (const link of [reportAudienceLink, mobileReport]) link.href = state.data.instagram['90'].source;
}

function renderControls() {
  for (const button of platformButtons) {
    const selected = button.dataset.platform === state.platform;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  const available = Object.keys(state.data[state.platform]);
  for (const button of periodButtons) {
    const active = available.includes(button.dataset.period);
    button.hidden = !active;
    button.classList.toggle('selected', button.dataset.period === state.period);
    button.setAttribute('aria-pressed', String(button.dataset.period === state.period));
  }
  periodTabs.setAttribute('aria-label', `${state.platform === 'instagram' ? 'Instagram' : 'TikTok'} reporting period`);
  renderMetrics();
}

platformButtons.forEach((button) => button.addEventListener('click', () => {
  state.platform = button.dataset.platform;
  const available = Object.keys(state.data[state.platform]);
  state.period = available.includes(state.period) ? state.period : available[available.length - 1];
  renderControls();
}));

periodButtons.forEach((button) => button.addEventListener('click', () => {
  if (!button.hidden) {
    state.period = button.dataset.period;
    renderControls();
  }
}));

fetch(analyticsPath)
  .then((response) => {
    if (!response.ok) throw new Error(`Analytics data returned ${response.status}`);
    return response.json();
  })
  .then((data) => {
    state.data = data;
    renderControls();
  })
  .catch((error) => {
    console.error('Could not load verified analytics data.', error);
    document.querySelector('#data-note').textContent = 'The data-driven platform switch is unavailable. The figures shown here are the Instagram 90-day report values.';
  });
