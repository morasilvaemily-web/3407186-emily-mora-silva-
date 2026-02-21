/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos de tu dominio
// ============================================

const entityData = {
  name: 'Intelligent Public Transportation Platform',
  description: 'An intelligent public transportation system that allows route management, vehicle monitoring and real-time information.',
  identifier: 'IPTP-001',

  contact: {
    email: 'contact@transportplatform.com',
    phone: '3204429913',
    location: 'Bogotá, Colombia'
  },

  items: [
    { name: 'Route Management', level: 90 },
    { name: 'Vehicle Tracking', level: 85 },
    { name: 'User Accessibility', level: 80 },
    { name: 'Real-time Data', level: 88 },
    { name: 'Security System', level: 75 }
  ],

  stats: {
    total: 120,
    active: 98,
    rating: 4.6,
    custom: 24
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================

const entityName = document.getElementById('entity-name');
const entityDescription = document.getElementById('entity-description');
const itemsList = document.getElementById('items-list');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const { name, description } = entityData;

  if (entityName) entityName.textContent = name;
  if (entityDescription) entityDescription.innerHTML = `<p>${description}</p>`;
};

// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================

const renderItems = (showAll = false) => {
  const { items } = entityData;
  if (!itemsList) return;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  itemsList.innerHTML = itemsToShow
    .map(({ name, level }) => `
      <div class="item">
        <div class="item-name">${name}</div>
        <div class="item-level">
          <span>${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `)
    .join('');
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================

const renderStats = () => {
  if (!statsContainer) return;

  const { stats } = entityData;

  const statsArray = [
    { label: 'Total', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Custom', value: stats.custom }
  ];

  statsContainer.innerHTML = statsArray
    .map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `)
    .join('');
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  if (themeToggle) themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================

const copyInfo = () => {
  const { name, description, contact } = entityData;

  const infoText = `
${name}
${description}
Contact: ${contact.email}
  `.trim();

  navigator.clipboard.writeText(infoText);
  showToast('Information copied successfully');
};

// Función auxiliar para mostrar notificaciones toast
const showToast = message => {
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  if (toggleItemsBtn) {
    toggleItemsBtn.textContent = showingAllItems ? 'Show less' : 'Show more';
  }
};

// ============================================
// TODO 10: Event Listeners
// ============================================

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (copyBtn) copyBtn.addEventListener('click', copyInfo);
if (toggleItemsBtn) toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

// Ejecuta init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
