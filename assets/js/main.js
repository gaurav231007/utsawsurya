const PRODUCTS = [
  {name:"Utsav Surya Stainless Steel Pressure Cooker",category:"cookers",image:"images/pressure-cooker-premium.svg",description:"A polished everyday pressure cooker for fast, dependable Indian cooking.",features:["Everyday pressure-cooking format","Clean Utsav Surya presentation","Ask our team for size, availability and price"]},
  {name:"Utsav Surya 3-Burner Gas Stove",category:"stoves",image:"images/gas-stove-premium.svg",description:"A practical three-burner gas stove designed for busy Indian kitchens.",features:["Three-burner layout","Modern black-top presentation","Ask our team for availability and price"]},
  {name:"Utsav Surya Premium Kadai",category:"cookware",image:"images/kadai-premium.svg",description:"A versatile kadai for frying, sautéing and everyday family meals.",features:["Everyday Indian kitchen essential","Deep kadai format","Ask our team for size and availability"]},
  {name:"Utsav Surya Fry Pan",category:"cookware",image:"images/fry-pan-premium.svg",description:"A practical non-stick style fry pan for quick everyday meals.",features:["Everyday pan format","Easy-to-use cooking surface","Ask our team for current sizes"]},
  {name:"Utsav Surya Sauce Pan",category:"cookware",image:"images/sauce-pan-premium.svg",description:"A compact multi-purpose saucepan for sauces, gravies and daily cooking.",features:["Multi-purpose kitchen use","Easy everyday handling","Ask our team for size and availability"]},
  {name:"Utsav Surya Complete Cookware Set",category:"cookware",image:"images/cookware-set-premium.svg",description:"A coordinated cookware collection covering everyday Indian cooking needs.",features:["Multi-piece everyday collection","Matching cookware presentation","Ask about current configuration and availability"]},
  {name:"Utsav Surya Flat Tawa",category:"cookware",image:"images/tawa-premium.svg",description:"A broad flat tawa made for rotis, dosas and quick everyday cooking.",features:["Flat cooking surface","Roti and dosa focused","Ask our team for current sizes"]},
  {name:"Utsav Surya Kitchen Essentials",category:"essentials",image:"images/kitchen-essentials-premium.svg",description:"Useful everyday tools and accessories for a smarter Indian kitchen.",features:["Daily kitchen essentials","Practical tool collection","Ask our team for current availability"]},
  {name:"Utsav Surya Storage & Dabbas",category:"storage",image:"images/storage-dabbas-premium.svg",description:"Clean, practical storage containers for an organised kitchen and pantry.",features:["Everyday pantry storage","Coordinated stainless-steel look","Ask our team for sizes and availability"]}
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