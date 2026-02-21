/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Dominio: Plataforma de Transporte Público Inteligente
   ============================================ */

// ============================================
// TODO 1: Objeto de datos del dominio
// ============================================

const entityData = {
  name: 'SmartTransit',
  description:
    'Plataforma inteligente de transporte público que optimiza rutas, horarios y la experiencia del usuario mediante datos en tiempo real y en cualquier lugar .',
  identifier: 'STP-001',

  contact: {
    email: 'servicioalcliente @gmail..com',
    phone: '+57 3204429913',
    location: 'bogota'
  },

  items: [
    { name: 'Monitoreo en tiempo real', level: 95, category: 'Tecnología' },
    { name: 'Optimización de rutas', level: 90, category: 'Eficiencia' },
    { name: 'Pago digital integrado', level: 85, category: 'Finanzas' },
    { name: 'Accesibilidad universal', level: 88, category: 'Inclusión' },
    { name: 'Alertas inteligentes', level: 92, category: 'Seguridad' },
    { name: 'Análisis de datos', level: 80, category: 'Big Data' }
  ],

  links: [
    { platform: 'Website', url: 'https://smarttransit.com', icon: '🌐' },
    { platform: 'Twitter', url: 'https://twitter.com/smarttransit', icon: '🐦' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/smarttransit', icon: '💼' }
  ],

  stats: {
    totalRoutes: 120,
    activeVehicles: 350,
    dailyUsers: 50000,
    satisfaction: 4.7
  }
};

// ============================================
// TODO 2: Referencias al DOM
// ============================================

const entityName = document.getElementById('userName');
const entityTitle = document.getElementById('userTitle');
const entityLocation = document.getElementById('userLocation');
const entityDescription = document.getElementById('userBio');
const entityEmail = document.getElementById('userEmail');
const entityPhone = document.getElementById('userPhone');

const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const linksContainer = document.getElementById('socialLinks');

const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;

  entityName.textContent = name;
  entityTitle.textContent = 'Plataforma de Transporte Público Inteligente';
  entityLocation.textContent = `📍 ${location}`;
  entityDescription.textContent = description;
  entityEmail.textContent = email;
  entityPhone.textContent = phone;
};

// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================

const renderItems = (showAll = false) => {
  const { items } = entityData;
  const itemsToShow = showAll ? items : items.slice(0, 4);

  itemsList.innerHTML = itemsToShow
    .map(
      ({ name, level }) => `
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${name}</span>
          <span class="skill-level">${level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: ${level}%"></div>
        </div>
      </div>
    `
    )
    .join('');
};

// ============================================
// TODO 5: Renderizar enlaces
// ============================================

const renderLinks = () => {
  const { links } = entityData;

  linksContainer.innerHTML = links
    .map(
      ({ platform, url, icon }) => `
      <a href="${url}" target="_blank" rel="noopener">
        ${icon} ${platform}
      </a>
    `
    )
    .join('');
};

// ============================================
// TODO 6: Renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Rutas Totales', value: stats.totalRoutes },
    { label: 'Vehículos Activos', value: stats.activeVehicles },
    { label: 'Usuarios Diarios', value: stats.dailyUsers },
    { label: 'Satisfacción', value: stats.satisfaction }
  ];

  statsContainer.innerHTML = statsArray
    .map(
      stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `
    )
    .join('');
};

// ============================================
// TODO 7: Cambio de tema
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Copiar información
// ============================================

const copyInfo = () => {
  const { name, description, contact } = entityData;

  const infoText = `
${name}
${description}
Contacto: ${contact?.email ?? 'No disponible'}
`.trim();

  navigator.clipboard.writeText(infoText);
  alert('✅ Información copiada al portapapeles');
};

// ============================================
// TODO 9: Mostrar / ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

// ============================================
// TODO 10: Event listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar aplicación
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

init();