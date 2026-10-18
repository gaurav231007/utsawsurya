const PRODUCTS = [
  {name:"Utsav Surya Stainless Steel Pressure Cooker",category:"cookers",image:"images/file_000000003b8c82119da80c057f10cb5b.png",description:"A polished stainless-steel pressure cooker presented for dependable everyday Indian cooking.",features:["Stainless-steel finish","Everyday Indian cooking","Ask our team for size, availability and current price"]},
  {name:"Utsav Surya 3-Burner Gas Stove",category:"stoves",image:"images/file_000000003b148211b8d56aa499dc8443.png",description:"A practical three-burner gas stove with a clean black finish for everyday Indian kitchens.",features:["Three-burner layout","Stable cooking surface","Ask our team for availability and current price"]},
  {name:"Utsav Surya Non-Stick Cookware Collection",category:"cookware",image:"images/file_0000000078b48211a298a18928789dfd.png",description:"A coordinated black non-stick cookware range for frying, sautéing and everyday family meals.",features:["Non-stick cookware formats","Practical everyday range","Ask about sizes and availability"]},
  {name:"Utsav Surya Stainless Steel Cookware Collection",category:"cookware",image:"images/file_00000000bd7c8211ab2956ac17ddc00c.png",description:"Classic stainless-steel cookware with multiple formats for dependable everyday Indian cooking.",features:["Stainless-steel construction","Multiple cookware formats","Ask about current configuration"]},
  {name:"Utsav Surya Mixed Cookware Collection",category:"cookware",image:"images/file_0000000091888211b5e76f90f55d0920.png",description:"A complete mixed cookware collection bringing everyday pots, pans and pressure-cooking formats together.",features:["Coordinated collection","Multiple cooking formats","Ask our team for configuration and availability"]},
  {name:"Utsav Surya Red Non-Stick Cookware Set",category:"cookware",image:"images/file_00000000280c8211b859170a7e42416d.png",description:"A bold red non-stick cookware collection with coordinated pieces for the modern Indian kitchen.",features:["Red non-stick finish","Coordinated set","Ask about sizes and availability"]},
  {name:"Utsav Surya Storage & Dabbas",category:"storage",image:"images/file_00000000549482119dc37304baa357e1.png",description:"Practical pantry storage and dabbas for a cleaner, more organised kitchen.",features:["Pantry storage solutions","Everyday household use","Ask our team for sizes and availability"]}
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
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" fetchpriority="low" width="1200" height="800"></div>
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
      <div class="quick-image-wrap"><img src="${product.image}" alt="${product.name}" decoding="async" width="1200" height="800"></div>
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