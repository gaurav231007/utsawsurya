const PRODUCTS = [
  {name:"Utsav Surya Royal Tri-Ply Pressure Cooker",category:"cookers",image:"images/pressure-cooker-premium-1.jpg",description:"A refined everyday pressure cooker presented for Indian home cooking.",features:["Everyday pressure-cooking format","Clear product presentation","Ask our team for size, availability and price"]},
  {name:"Utsav Surya Deluxe Hard Anodized Pressure Cooker",category:"cookers",image:"images/pressure-cooker-premium-2.jpg",description:"A practical pressure cooker for regular kitchen use.",features:["Everyday cooking format","Clean, durable-looking finish","Ask our team for size, availability and price"]},
  {name:"Utsav Surya Optima 3-Burner Glass Top Gas Stove",category:"stoves",image:"images/gas-stove-premium.jpg",description:"A contemporary three-burner gas stove for busy Indian kitchens.",features:["Three-burner layout","Glass-top presentation","Ask our team for availability and price"]},
  {name:"Utsav Surya Elite Granite Cookware Set",category:"cookware",image:"assets/images/cookware-set.jpg",description:"A coordinated cookware collection for everyday meals.",features:["Multi-piece everyday collection","Clean contemporary form","Ask about current configuration and availability"]},
  {name:"Utsav Surya Imperial Stainless Steel Kadhai",category:"cookware",image:"assets/images/kitchen-essentials.jpg",description:"A versatile everyday kadhai for frying, sautéing and family meals.",features:["Everyday Indian kitchen essential","Classic practical form","Ask our team for size and availability"]},
  {name:"Utsav Surya Multi-Purpose Idli & Steamer Set",category:"essentials",image:"assets/images/kitchen-essentials.jpg",description:"A practical steaming essential for breakfasts, snacks and family cooking.",features:["Multi-purpose kitchen use","Everyday cooking focused","Ask our team for current availability"]}
];

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
let currentCategory = "all";

function enquiryUrl(name) {
  const message = `Hello Utsav Surya, I would like to enquire about ${name}. Please share the product details, availability and current price.`;
  return `https://wa.me/919229219230?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const query = ($('#productSearch')?.value || '').trim().toLowerCase();
  const items = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && haystack.includes(query);
  });
  const grid = $('#productsGrid');
  if (!grid) return;
  grid.innerHTML = items.map(product => `
    <article class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" width="900" height="675"></div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="btn btn-dark quick-btn" type="button" data-index="${PRODUCTS.indexOf(product)}">View product</button>
          <a class="btn btn-outline" href="${enquiryUrl(product.name)}" target="_blank" rel="noopener noreferrer">Enquire</a>
        </div>
      </div>
    </article>`).join('') || '<p class="no-products">No products matched your search.</p>';
}

function openProduct(product) {
  const modal = $('#quickView');
  const content = $('#quickViewContent');
  if (!modal || !content) return;
  content.innerHTML = `
    <div class="quick-content">
      <div class="quick-image-wrap"><img src="${product.image}" alt="${product.name}" width="900" height="675"></div>
      <div>
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <ul class="spec-list">${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
        <div class="actions">
          <a class="btn btn-dark" href="${enquiryUrl(product.name)}" target="_blank" rel="noopener noreferrer">WhatsApp enquiry</a>
          <a class="btn btn-outline" href="tel:+919229219230">Call us</a>
        </div>
      </div>
    </div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = $('#quickView');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  $('#navToggle')?.addEventListener('click', () => {
    const nav = $('#navLinks');
    const button = $('#navToggle');
    const open = nav?.classList.toggle('open');
    button?.setAttribute('aria-expanded', String(Boolean(open)));
  });
  $$('.nav-links a').forEach(link => link.addEventListener('click', () => {
    $('#navLinks')?.classList.remove('open');
    $('#navToggle')?.setAttribute('aria-expanded', 'false');
  }));
  $$('.pill').forEach(button => button.addEventListener('click', () => {
    $$('.pill').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    currentCategory = button.dataset.category || 'all';
    renderProducts();
  }));
  $('#productsGrid')?.addEventListener('click', event => {
    const button = event.target.closest('.quick-btn');
    if (button) openProduct(PRODUCTS[Number(button.dataset.index)]);
  });
  $$('[data-close]').forEach(element => element.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  $('#dealerForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Hello Utsav Surya, I would like to make an enquiry. Name: ${data.get('name') || ''}. Business: ${data.get('company') || ''}. Phone: ${data.get('phone') || ''}. City: ${data.get('city') || ''}. Requirement: ${data.get('message') || ''}`;
    window.open(`https://wa.me/919229219230?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp enquiry…');
    event.currentTarget.reset();
  });
});