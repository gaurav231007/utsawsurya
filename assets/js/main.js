/**
 * Utsaw Surya — Interactive Web Application Logic
 * Premium Indian Kitchenware
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProducts();
  initQuickViewModal();
  initDealerCalculator();
  initForms();
  initFAQ();
});

/* ----------------------------------------------------
   1. PRODUCTS DATA & INTERACTIVE CATALOG
---------------------------------------------------- */
const PRODUCTS = [
  {
    id: 'pc-classic-3l',
    name: 'Surya Royal Tri-Ply Pressure Cooker (3L)',
    category: 'cookers',
    categoryName: 'Pressure Cookers',
    price: '₹2,499',
    wholesalePrice: 1650,
    mrp: '₹3,299',
    badge: 'Bestseller',
    image: 'assets/images/hero-cooker.jpg',
    shortDesc: 'Heavy-gauge tri-ply stainless steel pressure cooker with induction & gas compatibility.',
    specs: [
      { label: 'Capacity', value: '3 Litres' },
      { label: 'Body Material', value: '3-Layer Tri-Ply Stainless Steel (18/8)' },
      { label: 'Bottom', value: 'Heavy Duty Induction Base' },
      { label: 'Safety Valve', value: 'Precision Weight Valve & Gasket Release' },
      { label: 'Warranty', value: '5 Years Manufacturer Guarantee' }
    ],
    features: ['Uniform heat distribution preventing hotspots', 'Cool-touch bakelite handles with gold trim', 'ISI Certified for maximum safety']
  },
  {
    id: 'pc-deluxe-5l',
    name: 'Surya Deluxe Hard Anodized Pressure Cooker (5L)',
    category: 'cookers',
    categoryName: 'Pressure Cookers',
    price: '₹3,199',
    wholesalePrice: 2100,
    mrp: '₹4,199',
    badge: 'Popular',
    image: 'assets/images/hero-cooker.jpg',
    shortDesc: 'Ultra-durable hard anodized pressure cooker built for fast Indian family meals.',
    specs: [
      { label: 'Capacity', value: '5 Litres' },
      { label: 'Body Material', value: 'Hard Anodized Aluminum (Non-toxic)' },
      { label: 'Lid Type', value: 'Inner Lid Locking System' },
      { label: 'Safety', value: 'Fusible Metallic Safety Plug' },
      { label: 'Warranty', value: '5 Years Warranty' }
    ],
    features: ['Scratch-resistant black anodized finish', 'Energy-efficient rapid heat retention', 'Ideal for rice, lentils, meats, and curries']
  },
  {
    id: 'gs-toughened-3b',
    name: 'Surya Optima 3-Burner Glass Top Gas Stove',
    category: 'stoves',
    categoryName: 'Gas Stoves',
    price: '₹4,899',
    wholesalePrice: 3200,
    mrp: '₹6,499',
    badge: 'New Launch',
    image: 'assets/images/gas-stove.jpg',
    shortDesc: 'Toughened glass top stove featuring heavy brass burners and anti-skid rubber legs.',
    specs: [
      { label: 'Burner Material', value: '100% Forged Brass' },
      { label: 'Top Surface', value: '7mm Toughened Shatterproof Glass' },
      { label: 'Knobs', value: 'Ergonomic Heat-Resistant Copper Alloy' },
      { label: 'Ignition', value: 'Manual High-Efficiency Blue Flame' },
      { label: 'Warranty', value: '2 Years Comprehensive Warranty' }
    ],
    features: ['Rust-proof stainless steel drip tray', 'Tri-pin burners for flame concentration', 'Easy-to-clean stain-proof surface']
  },
  {
    id: 'cw-nonstick-set',
    name: 'Surya Elite Granite Cookware Set (3 Pcs)',
    category: 'cookware',
    categoryName: 'Cookware Sets',
    price: '₹3,799',
    wholesalePrice: 2500,
    mrp: '₹5,299',
    badge: 'Premium Set',
    image: 'assets/images/cookware-set.jpg',
    shortDesc: 'Granite non-stick kadhai with glass lid, fry pan, and flat dosa tawa.',
    specs: [
      { label: 'Items Included', value: 'Kadhai with Lid (24cm), Fry Pan (24cm), Tawa (28cm)' },
      { label: 'Coating', value: '5-Layer German Technology Granite Non-Stick' },
      { label: 'PFOA Free', value: '100% Non-Toxic & Food Grade' },
      { label: 'Handle', value: 'Soft-touch Wooden Texture Bakelite' },
      { label: 'Warranty', value: '3 Years Warranty' }
    ],
    features: ['Requires up to 80% less cooking oil', 'Metal spoon friendly coating', 'Diswasher safe & effortless clean']
  },
  {
    id: 'ke-tri-kadhai',
    name: 'Surya Imperial Stainless Steel Kadhai (2.5L)',
    category: 'cookware',
    categoryName: 'Cookware Sets',
    price: '₹1,899',
    wholesalePrice: 1250,
    mrp: '₹2,599',
    badge: 'Essential',
    image: 'assets/images/cookware-set.jpg',
    shortDesc: 'Heavy bottom stainless steel kadhai with tempered glass steam-vented lid.',
    specs: [
      { label: 'Capacity', value: '2.5 Litres' },
      { label: 'Diameter', value: '26 cm' },
      { label: 'Base', value: 'Encapsulated Sandwich Aluminum Core Base' },
      { label: 'Warranty', value: '3 Years Warranty' }
    ],
    features: ['Thick base prevents food scorching', 'Sturdy riveted stainless steel handles', 'Gas & Induction stove top ready']
  },
  {
    id: 'ke-idli-maker',
    name: 'Surya Multi-Purpose Idli & Steamer Set',
    category: 'essentials',
    categoryName: 'Kitchen Essentials',
    price: '₹1,599',
    wholesalePrice: 1050,
    mrp: '₹2,199',
    badge: 'Top Rated',
    image: 'assets/images/kitchen-essentials.jpg',
    shortDesc: '4-Plate stainless steel idli maker with steamer pot for momos, dhokla, and vegetables.',
    specs: [
      { label: 'Plates', value: '4 Idli Plates (16 Idlis Total)' },
      { label: 'Material', value: 'Heavy Gauge Premium Stainless Steel' },
      { label: 'Multi-use', value: 'Steamer basket included' },
      { label: 'Warranty', value: '2 Years Warranty' }
    ],
    features: ['Whistle indicator for optimal steam timing', 'Mirror polish high luster exterior', 'Rust proof & hygienic food grade']
  }
];

function initProducts() {
  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('productSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  if (!grid) return;

  function renderProducts(items) {
    if (items.length === 0) {
      grid.innerHTML = `
        <div class="no-products">
          <p>No products found matching your search.</p>
          <button class="btn outline btn-sm" id="resetFilterBtn">Show All Products</button>
        </div>`;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          if (categoryFilter) categoryFilter.value = 'all';
          updateTabs('all');
          renderProducts(PRODUCTS);
        });
      }
      return;
    }

    grid.innerHTML = items.map(p => `
      <article class="product-card" data-category="${p.category}">
        <div class="card-img-wrap">
          <img loading="lazy" src="${p.image}" alt="${p.name}">
          ${p.badge ? `<span class="badge-tag">${p.badge}</span>` : ''}
        </div>
        <div class="product-body">
          <span class="category-pill">${p.categoryName}</span>
          <h3>${p.name}</h3>
          <p class="desc">${p.shortDesc}</p>
          <div class="price-row">
            <span class="price-current">${p.price}</span>
            <span class="price-mrp">${p.mrp}</span>
            <span class="price-save">Save ${calcDiscount(p.price, p.mrp)}%</span>
          </div>
          <div class="card-cta">
            <button class="btn primary quick-view-btn" data-id="${p.id}">Quick View</button>
            <a class="btn outline" href="https://wa.me/919229219230?text=Hello%20Utsaw%20Surya%20Team%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener">Inquire WhatsApp</a>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to Quick View buttons
    grid.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openQuickViewModal(id);
      });
    });
  }

  function filterItems() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const cat = categoryFilter?.value || 'all';

    const filtered = PRODUCTS.filter(p => {
      const matchesCat = cat === 'all' || p.category === cat;
      const matchesSearch = p.name.toLowerCase().includes(query) || p.shortDesc.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });

    renderProducts(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterItems);
  if (categoryFilter) categoryFilter.addEventListener('change', filterItems);

  // Tab filter buttons
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      if (categoryFilter) categoryFilter.value = cat;
      filterItems();
    });
  });

  function updateTabs(activeCat) {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === activeCat) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initial render
  renderProducts(PRODUCTS);
}

function calcDiscount(priceStr, mrpStr) {
  const p = parseInt(priceStr.replace(/[^0-9]/g, ''));
  const m = parseInt(mrpStr.replace(/[^0-9]/g, ''));
  if (!p || !m) return 0;
  return Math.round(((m - p) / m) * 100);
}

/* ----------------------------------------------------
   2. QUICK VIEW MODAL
---------------------------------------------------- */
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeModalBtn');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeQuickViewModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeQuickViewModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeQuickViewModal();
    }
  });
}

function openQuickViewModal(productId) {
  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('modalContentBody');
  if (!modal || !body) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  body.innerHTML = `
    <div class="modal-grid">
      <div class="modal-media">
        <img src="${product.image}" alt="${product.name}" class="modal-img">
        ${product.badge ? `<span class="badge-tag">${product.badge}</span>` : ''}
      </div>
      <div class="modal-info">
        <span class="category-pill">${product.categoryName}</span>
        <h2>${product.name}</h2>
        <div class="price-row modal-price">
          <span class="price-current">${product.price}</span>
          <span class="price-mrp">${product.mrp}</span>
          <span class="price-save">Save ${calcDiscount(product.price, product.mrp)}%</span>
        </div>
        <p class="modal-desc">${product.shortDesc}</p>
        
        <div class="modal-specs">
          <h4>Key Specifications</h4>
          <ul>
            ${product.specs.map(s => `<li><strong>${s.label}:</strong> ${s.value}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-features">
          <h4>Highlights</h4>
          <ul>
            ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-actions">
          <a class="btn primary btn-lg" href="https://wa.me/919229219230?text=Hello%20Utsaw%20Surya%20Team%2C%20I%20want%20to%20place%20an%20order/enquiry%20for%20${encodeURIComponent(product.name)}%20(${product.price})" target="_blank" rel="noopener">
            💬 Order / Inquire on WhatsApp
          </a>
          <a class="btn outline btn-lg" href="#dealers" onclick="closeQuickViewModal()">
            Become a Dealer
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ----------------------------------------------------
   3. INTERACTIVE DEALER MARGIN & ROI CALCULATOR
---------------------------------------------------- */
function initDealerCalculator() {
  const unitsSlider = document.getElementById('calcUnits');
  const unitsValue = document.getElementById('calcUnitsValue');
  const avgPriceInput = document.getElementById('calcPrice');
  const marginSlider = document.getElementById('calcMargin');
  const marginValue = document.getElementById('calcMarginValue');

  const resOrderVal = document.getElementById('resOrderVal');
  const resRevenue = document.getElementById('resRevenue');
  const resProfit = document.getElementById('resProfit');
  const resRoi = document.getElementById('resRoi');

  if (!unitsSlider || !resProfit) return;

  function calculate() {
    const units = parseInt(unitsSlider.value) || 100;
    const wholesalePrice = parseFloat(avgPriceInput.value) || 1500;
    const marginPct = parseInt(marginSlider.value) || 30;

    unitsValue.textContent = units.toLocaleString('en-IN') + ' units';
    marginValue.textContent = marginPct + '%';

    const totalWholesaleInvestment = units * wholesalePrice;
    const totalRetailRevenue = totalWholesaleInvestment * (1 + marginPct / 100);
    const monthlyProfit = totalRetailRevenue - totalWholesaleInvestment;
    const annualProfit = monthlyProfit * 12;

    resOrderVal.textContent = '₹' + Math.round(totalWholesaleInvestment).toLocaleString('en-IN');
    resRevenue.textContent = '₹' + Math.round(totalRetailRevenue).toLocaleString('en-IN');
    resProfit.textContent = '₹' + Math.round(monthlyProfit).toLocaleString('en-IN');
    resRoi.textContent = '₹' + Math.round(annualProfit).toLocaleString('en-IN');
  }

  unitsSlider.addEventListener('input', calculate);
  avgPriceInput.addEventListener('input', calculate);
  marginSlider.addEventListener('input', calculate);

  calculate();
}

/* ----------------------------------------------------
   4. NAVIGATION & MOBILE DRAWER
---------------------------------------------------- */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const header = document.querySelector('.site-header');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.innerHTML = open ? '✕' : '☰';
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ----------------------------------------------------
   5. FORM HANDLERS & TOAST NOTIFICATIONS
---------------------------------------------------- */
function initForms() {
  const dealerForm = document.getElementById('dealerForm');
  if (dealerForm) {
    dealerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(dealerForm);
      const name = formData.get('name') || 'Valued Dealer';
      const company = formData.get('company') || 'N/A';
      const phone = formData.get('phone') || '';
      const city = formData.get('city') || 'Motihari';
      const message = formData.get('message') || '';

      showToast(`Thank you ${name}! Your dealer inquiry for ${company} has been recorded.`);

      // Optional auto WhatsApp redirect for dealer
      const waMsg = `Hello Utsaw Surya Team, I would like to register as a Dealer / Distributor.\n\nName: ${name}\nCompany: ${company}\nCity: ${city}\nPhone: ${phone}\nMessage: ${message}`;
      setTimeout(() => {
        window.open(`https://wa.me/919229219230?text=${encodeURIComponent(waMsg)}`, '_blank');
      }, 1200);

      dealerForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail')?.value;
      showToast(`Subscribed successfully with ${email}! Welcome to Utsaw Surya updates.`);
      newsletterForm.reset();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toastContainer');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastContainer';
    toast.className = 'toast-container';
    document.body.appendChild(toast);
  }

  const item = document.createElement('div');
  item.className = 'toast-item';
  item.innerHTML = `<span>✓</span> <div>${message}</div>`;
  toast.appendChild(item);

  setTimeout(() => {
    item.classList.add('show');
  }, 10);

  setTimeout(() => {
    item.classList.remove('show');
    setTimeout(() => item.remove(), 300);
  }, 4000);
}

/* ----------------------------------------------------
   6. FAQ ACCORDION
---------------------------------------------------- */
function initFAQ() {
  const detailsList = document.querySelectorAll('.faq details');
  detailsList.forEach(det => {
    det.addEventListener('toggle', () => {
      if (det.open) {
        detailsList.forEach(other => {
          if (other !== det && other.open) other.open = false;
        });
      }
    });
  });
}
