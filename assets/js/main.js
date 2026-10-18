const PRODUCTS = [
  {name:"Utsav Surya Stainless Steel Pressure Cooker",category:"cookers",image:"assets/images/pressure-cooker.jpg",description:"A polished stainless-steel pressure cooker photographed for the Utsav Surya kitchen collection.",features:["Stainless-steel construction","Everyday Indian cooking","Ask our team for size, availability and price"]},
  {name:"Utsav Surya 3-Burner Gas Stove",category:"stoves",image:"assets/images/gas-stove.jpg",description:"A practical three-burner gas stove presented in a clean commercial kitchen setting.",features:["Three-burner layout","Stable everyday cooking surface","Ask our team for availability and price"]},
  {name:"Utsav Surya Premium Cookware Set",category:"cookware",image:"assets/images/cookware-set.jpg",description:"A coordinated stainless-steel cookware collection for everyday Indian cooking.",features:["Multi-piece cookware collection","Stainless-steel finish","Ask about current configuration and availability"]},
  {name:"Utsav Surya Kadai & Pots",category:"cookware",image:"assets/images/kadai-pots.jpg",description:"Versatile kadai and pot formats for frying, sautéing, gravies and family meals.",features:["Deep kadai format","Everyday cooking range","Ask our team for sizes and availability"]},
  {name:"Utsav Surya Fry Pan & Tawa",category:"cookware",image:"assets/images/fry-pan-tawa.jpg",description:"Practical flat and pan cookware for rotis, dosas and quick everyday meals.",features:["Flat cooking surface","Fry-pan format","Ask our team for current sizes"]},
  {name:"Utsav Surya Combo Cookware Set",category:"cookware",image:"assets/images/combo-set.jpg",description:"A practical combination of cookware pieces designed around everyday kitchen needs.",features:["Coordinated cookware selection","Everyday Indian cooking","Ask our team for configuration and availability"]},
  {name:"Utsav Surya Kitchen Essentials",category:"essentials",image:"assets/images/kitchen-essentials.jpg",description:"Useful everyday kitchen tools and accessories presented in a professional product setting.",features:["Daily kitchen essentials","Practical tool collection","Ask our team for current availability"]},
  {name:"Utsav Surya Storage Solutions",category:"storage",image:"assets/images/storage-solutions.jpg",description:"Clean, practical storage containers for an organised kitchen and pantry.",features:["Everyday pantry storage","Stainless-steel look","Ask our team for sizes and availability"]}
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