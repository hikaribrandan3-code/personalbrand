const language = document.documentElement.lang === 'pt-BR' ? 'pt-BR' : document.documentElement.lang === 'es' ? 'es' : 'en';
const numberFormat = new Intl.NumberFormat(language);
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
const words = {
  en: { Views:'Views', Viewers:'Viewers', Shares:'Shares', Saves:'Saves', Reels:'Reels', Likes:'Likes', Comments:'Comments', Reposts:'Reposts', 'Video views':'Video views', 'Profile views':'Profile views', 'TikTok analytics export':'TikTok analytics export', followers:'followers', days:'days', viewReport:'View {days}-day report', viewTikTok:'View TikTok analytics export', viewViewers:'View viewers export', instagramSubtitle:'Instagram · Exported from Edits', tiktokSubtitle:'TikTok · Exported analytics', instagramNote:'Instagram {days}-day report. {rounding}The full source report remains available here.', roundedNote:'Rounded figures follow the report’s display. ', tiktokNote:'TikTok export reports video views, profile views, likes, comments, and shares. It does not provide a comparable unique-viewer total.', loadError:'Could not load verified analytics data.', fallback:'The data-driven platform switch is unavailable. The figures shown here are the Instagram 90-day report values.', reportingPeriod:'reporting period' },
  es: { Views:'Visualizaciones', Viewers:'Espectadores', Shares:'Compartidos', Saves:'Guardados', Reels:'Reels', Likes:'Me gusta', Comments:'Comentarios', Reposts:'Republicaciones', 'Video views':'Visualizaciones de videos', 'Profile views':'Visitas al perfil', 'TikTok analytics export':'Exportación de analíticas de TikTok', followers:'seguidores', days:'días', viewReport:'Ver informe de {days} días', viewTikTok:'Ver exportación de analíticas de TikTok', viewViewers:'Ver exportación de espectadores', instagramSubtitle:'Instagram · Exportado desde Edits', tiktokSubtitle:'TikTok · Analíticas exportadas', instagramNote:'Informe de Instagram de {days} días. {rounding}El informe original completo está disponible aquí.', roundedNote:'Las cifras redondeadas siguen el formato del informe. ', tiktokNote:'La exportación de TikTok informa visualizaciones de videos, visitas al perfil, Me gusta, comentarios y compartidos. No ofrece un total comparable de espectadores únicos.', loadError:'No se pudieron cargar las analíticas verificadas.', fallback:'El selector de plataformas no está disponible. Aquí se muestran los datos del informe de Instagram de 90 días.', reportingPeriod:'período del informe' },
  'pt-BR': { Views:'Visualizações', Viewers:'Pessoas alcançadas', Shares:'Compartilhamentos', Saves:'Salvamentos', Reels:'Reels', Likes:'Curtidas', Comments:'Comentários', Reposts:'Reposts', 'Video views':'Visualizações de vídeos', 'Profile views':'Visitas ao perfil', 'TikTok analytics export':'Exportação de dados do TikTok', followers:'seguidores', days:'dias', viewReport:'Ver relatório de {days} dias', viewTikTok:'Ver exportação de dados do TikTok', viewViewers:'Ver exportação de espectadores', instagramSubtitle:'Instagram · Exportado do Edits', tiktokSubtitle:'TikTok · Dados exportados', instagramNote:'Relatório do Instagram de {days} dias. {rounding}O relatório original completo está disponível aqui.', roundedNote:'Os valores arredondados seguem a apresentação do relatório. ', tiktokNote:'A exportação do TikTok informa visualizações de vídeos, visitas ao perfil, curtidas, comentários e compartilhamentos. Ela não fornece um total comparável de espectadores únicos.', loadError:'Não foi possível carregar os dados analíticos verificados.', fallback:'A troca dinâmica de plataforma não está disponível. Os números exibidos são do relatório de 90 dias do Instagram.', reportingPeriod:'período do relatório' },
};
const t = (key) => words[language][key] ?? key;

const definitions = {
  instagram: {
    primary: [['Reel views', 'Views'], ['Viewers', 'Viewers'], ['Shares', 'Shares'], ['Saves', 'Saves']],
    secondary: [['Reels', 'Reels'], ['Likes', 'Likes'], ['Comments', 'Comments'], ['Reposts', 'Reposts']],
    handle: '@builtbyhikari.ai', subtitle: (entry) => `${numberFormat.format(entry.followers)} ${t('followers')}`, mark: '◎',
  },
  tiktok: {
    primary: [['Video Views', 'Video views'], ['Profile Views', 'Profile views'], ['Likes', 'Likes'], ['Shares', 'Shares']],
    secondary: [['Comments', 'Comments']],
    handle: '@builtbyhikari.ai', subtitle: () => t('TikTok analytics export'), mark: '♪',
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
  const start = new Date(`${entry.startDate}T12:00:00Z`).toLocaleDateString(language, options);
  const end = new Date(`${entry.endDate}T12:00:00Z`).toLocaleDateString(language, { ...options, year: 'numeric' });
  return `${start} – ${end}`;
}

function renderMetrics() {
  const entry = currentEntry();
  if (!entry) return;
  const definition = definitions[state.platform];
  const rounded = entry.rounded ?? [];
  const metrics = definition.primary
    .filter(([key]) => Object.hasOwn(entry.metrics, key))
    .map(([key, label]) => ({ label: t(label), value: entry.metrics[key], exact: numberFormat.format(entry.metrics[key]), display: compact(entry.metrics[key], key, rounded.includes(key)) }));

  metricGrid.innerHTML = metrics.map(({ label, display, exact }) => `<div class="metric-card"><span class="metric-label">${label}</span><strong title="${exact}">${display}</strong></div>`).join('');
  secondaryRow.innerHTML = definition.secondary
    .filter(([key]) => Object.hasOwn(entry.metrics, key))
    .map(([key, label]) => `<span><strong>${compact(entry.metrics[key], key, rounded.includes(key))}</strong> ${t(label)}</span>`).join('');
  secondaryRow.classList.toggle('few-stats', definition.secondary.length < 2);

  document.querySelector('#account-handle').textContent = definition.handle;
  document.querySelector('#account-subtitle').textContent = definition.subtitle(entry);
  document.querySelector('#platform-mark').textContent = definition.mark;
  document.querySelector('#date-range').textContent = dateLabel(entry);
  document.querySelector('#period-length').textContent = `${entry.days} ${t('days')}`;
  document.querySelector('#report-link').textContent = (state.platform === 'instagram' ? t('viewReport').replace('{days}', entry.days) : t('viewTikTok')) + ' ↗';
  for (const link of [reportLink, sourceLink]) link.href = entry.source;
  sourceLink.hidden = state.platform === 'instagram';
  sourceLink.textContent = `${t('viewViewers')} ↗`;
  sourceLink.href = entry.viewerSource || entry.source;
  document.querySelector('#data-note').textContent = state.platform === 'instagram'
    ? t('instagramNote').replace('{days}', entry.days).replace('{rounding}', rounded.length ? t('roundedNote') : '')
    : t('tiktokNote');
  for (const link of [reportAudienceLink, mobileReport]) link.href = state.data.instagram['90'].source;
}

function currentEntry() {
  return state.data?.[state.platform]?.[state.period];
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
  periodTabs.setAttribute('aria-label', `${state.platform === 'instagram' ? 'Instagram' : 'TikTok'} ${t('reportingPeriod')}`);
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
    console.error(t('loadError'), error);
    document.querySelector('#data-note').textContent = t('fallback');
  });
