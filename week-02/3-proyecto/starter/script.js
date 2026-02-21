// ===============================
// TRANSPORTE PÚBLICO INTELIGENTE
// SEMANA 02 - SCRIPT FUNCIONAL
// ===============================

let items = [];
let editingItemId = null;

const STORAGE_KEY = 'smartTransportRoutes';

const CATEGORIES = {
  urbana: { name: 'Urbana', emoji: '🚌' },
  intermunicipal: { name: 'Intermunicipal', emoji: '🚍' },
  expresa: { name: 'Expresa', emoji: '⚡' },
  especial: { name: 'Especial', emoji: '⭐' },
};

const PRIORITIES = {
  high: { name: 'Alta' },
  medium: { name: 'Media' },
  low: { name: 'Baja' },
};

// -------------------------------
// LocalStorage
// -------------------------------
const loadItems = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

const saveItems = data =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// -------------------------------
// CRUD
// -------------------------------
const createItem = data => {
  const newItem = {
    id: Date.now(),
    name: data.name,
    description: data.description,
    category: data.category,
    priority: data.priority,
    active: true,
    createdAt: new Date().toISOString(),
  };

  items = [...items, newItem];
  saveItems(items);
};

const toggleItem = id => {
  items = items.map(item =>
    item.id === id ? { ...item, active: !item.active } : item
  );
  saveItems(items);
};

const deleteItem = id => {
  items = items.filter(item => item.id !== id);
  saveItems(items);
};

// -------------------------------
// Render
// -------------------------------
const renderItems = list => {
  const container = document.getElementById('item-list');
  const empty = document.getElementById('empty-state');

  if (list.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  container.innerHTML = list.map(item => `
    <div class="item ${item.active ? '' : 'inactive'}" data-id="${item.id}">
      <input type="checkbox" ${item.active ? 'checked' : ''} class="toggle">

      <div>
        <h3>${item.name}</h3>
        <p>${item.description ?? ''}</p>
        <small>
          ${CATEGORIES[item.category].emoji}
          ${CATEGORIES[item.category].name} |
          ${PRIORITIES[item.priority].name}
        </small>
      </div>

      <button class="delete">🗑️</button>
    </div>
  `).join('');
};

const renderStats = () => {
  const total = items.length;
  const active = items.filter(i => i.active).length;
  const inactive = total - active;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-active').textContent = active;
  document.getElementById('stat-inactive').textContent = inactive;
};

// -------------------------------
// Eventos
// -------------------------------
const attachEvents = () => {
  document.getElementById('item-form').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('item-name').value.trim();
    if (!name) return alert('El nombre es obligatorio');

    createItem({
      name,
      description: document.getElementById('item-description').value.trim(),
      category: document.getElementById('item-category').value,
      priority: document.getElementById('item-priority').value,
    });

    e.target.reset();
    renderItems(items);
    renderStats();
  });

  document.getElementById('item-list').addEventListener('click', e => {
    const itemEl = e.target.closest('.item');
    if (!itemEl) return;

    const id = Number(itemEl.dataset.id);

    if (e.target.classList.contains('toggle')) {
      toggleItem(id);
    }

    if (e.target.classList.contains('delete')) {
      deleteItem(id);
    }

    renderItems(items);
    renderStats();
  });

  document.getElementById('clear-inactive').addEventListener('click', () => {
    items = items.filter(item => item.active);
    saveItems(items);
    renderItems(items);
    renderStats();
  });
};

// -------------------------------
// INIT
// -------------------------------
const init = () => {
  items = loadItems();
  renderItems(items);
  renderStats();
  attachEvents();
  console.log('✅ Transporte Inteligente listo');
};

document.addEventListener('DOMContentLoaded', init);