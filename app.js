/**
 * AURA & CO. — Haute Horlogerie & High Luxury Atelier
 * Master Application Engine
 */

(function () {
  'use strict';

  // --- State Initialization & LocalStorage ---
  const state = {
    currency: localStorage.getItem('aura_currency') || 'USD',
    cart: JSON.parse(localStorage.getItem('aura_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('aura_wishlist') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    maxPrice: 10000,
    sortBy: 'featured',
    viewMode: 'grid',
    appliedPromo: null,
    selectedProductForModal: null
  };

  // --- Sound Synthesizer for Luxury Micro-interactions (Pure Web Audio API) ---
  function playLuxuryChime(type = 'chime') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'add') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'wishlist') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'success') {
        // Subtle harp chord
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.04, ctx.currentTime + (i * 0.08));
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          o.start(ctx.currentTime + (i * 0.08));
          o.stop(ctx.currentTime + 0.8);
        });
      }
    } catch (e) {
      // Audio not allowed before user gesture or unavailable, gracefully ignore
    }
  }

  // --- Currency Helpers ---
  function formatCurrency(amountUSD) {
    const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
    const converted = amountUSD * curr.rate;
    
    // Formatting with thousands separator
    const formattedNumber = Math.round(converted).toLocaleString('en-US');
    return `${curr.symbol} ${formattedNumber}`;
  }

  function saveState() {
    localStorage.setItem('aura_cart', JSON.stringify(state.cart));
    localStorage.setItem('aura_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('aura_currency', state.currency);
  }

  // --- Toast Notifications ---
  function showToast(title, message, iconType = 'check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${iconType === 'heart' 
            ? '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>'
            : '<polyline points="20 6 9 17 4 12"></polyline>'}
        </svg>
      </div>
      <div class="toast-msg">
        <h6>${title}</h6>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-remove');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // --- DOM Elements ---
  const elements = {
    productsGrid: document.getElementById('products-grid'),
    currencySelect: document.getElementById('global-currency-select'),
    categoryPills: document.querySelectorAll('.cat-pill'),
    searchInput: document.getElementById('product-search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    priceSlider: document.getElementById('price-range-slider'),
    priceDisplayVal: document.getElementById('price-display-val'),
    sortSelect: document.getElementById('product-sort-select'),
    viewModeBtns: document.querySelectorAll('.view-mode-btn'),
    
    // Badges & Counters
    cartCountBadge: document.getElementById('cart-count-badge'),
    wishlistCountBadge: document.getElementById('wishlist-count-badge'),
    
    // Cart Drawer
    cartDrawer: document.getElementById('cart-drawer'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartShippingVal: document.getElementById('cart-shipping-val'),
    cartTotalVal: document.getElementById('cart-total-val'),
    freeShippingProgress: document.getElementById('free-shipping-progress'),
    freeShippingNote: document.getElementById('free-shipping-note'),
    cartTriggerBtn: document.getElementById('cart-trigger-btn'),
    cartCloseBtn: document.getElementById('cart-close-btn'),
    cartCheckoutBtn: document.getElementById('cart-checkout-btn'),
    promoInput: document.getElementById('promo-code-input'),
    promoApplyBtn: document.getElementById('apply-promo-btn'),
    promoActiveTag: document.getElementById('promo-active-tag'),
    
    // Wishlist Drawer
    wishlistDrawer: document.getElementById('wishlist-drawer'),
    wishlistItemsList: document.getElementById('wishlist-items-list'),
    wishlistTriggerBtn: document.getElementById('wishlist-trigger-btn'),
    wishlistCloseBtn: document.getElementById('wishlist-close-btn'),
    
    // Modals & Backdrops
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    quickviewModal: document.getElementById('quickview-modal'),
    quickviewCloseBtn: document.getElementById('quickview-close-btn'),
    quickviewContent: document.getElementById('quickview-content'),
    
    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutCloseBtn: document.getElementById('checkout-close-btn'),
    stepOneNextBtn: document.getElementById('checkout-step1-next'),
    stepTwoBackBtn: document.getElementById('checkout-step2-back'),
    placeOrderBtn: document.getElementById('place-order-btn'),
    finishOrderBtn: document.getElementById('finish-order-btn'),
    printReceiptBtn: document.getElementById('print-receipt-btn'),
    
    // Header
    siteHeader: document.getElementById('site-header')
  };

  // --- Sticky Header Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      elements.siteHeader?.classList.add('scrolled');
    } else {
      elements.siteHeader?.classList.remove('scrolled');
    }
  });

  // --- Filter & Sorting Engine ---
  function getFilteredProducts() {
    return PRODUCTS.filter(product => {
      // Category filter
      if (state.activeCategory !== 'all' && product.category !== state.activeCategory) {
        return false;
      }
      // Price slider filter
      if (product.priceUSD > state.maxPrice) {
        return false;
      }
      // Search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (state.sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (state.sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (state.sortBy === 'rating') return b.rating - a.rating;
      if (state.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // featured default
    });
  }

  // --- Product Card Render ---
  function renderProducts() {
    if (!elements.productsGrid) return;
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = `
        <div class="empty-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No creations found matching your criteria</h3>
          <p>Try refining your search keyword or expanding your budget range.</p>
          <button class="btn btn-outline" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('reset-filters-btn')?.addEventListener('click', resetFilters);
      return;
    }

    elements.productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="card-media">
            ${product.badge ? `<span class="badge-tag badge-${product.badgeType}">${product.badge}</span>` : ''}
            
            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                    data-id="${product.id}" 
                    title="${isWishlisted ? 'Remove from Private Collection' : 'Save to Private Collection'}"
                    aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img class="card-media-img primary" src="${product.primaryImage}" alt="${product.name}" loading="lazy" />
            <img class="card-media-img secondary" src="${product.secondaryImage}" alt="${product.name} alternate view" loading="lazy" />

            <div class="card-quick-actions">
              <button class="quick-view-btn" data-id="${product.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Quick View
              </button>
              <button class="quick-add-btn" data-id="${product.id}" title="Acquire Immediately" aria-label="Add to Bag">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="card-content">
            <span class="card-category">${product.categoryName}</span>
            <h3 class="card-title">${product.name}</h3>

            <div class="card-rating">
              <div class="stars">★★★★★</div>
              <span>${product.rating.toFixed(2)}</span>
              <span class="rating-count">(${product.reviewsCount} reviews)</span>
            </div>

            <div class="card-footer">
              <div class="price-display">
                <span class="current-price">${formatCurrency(product.priceUSD)}</span>
                ${product.originalPriceUSD ? `<span class="original-price">${formatCurrency(product.originalPriceUSD)}</span>` : ''}
              </div>

              ${product.colors && product.colors.length > 1 ? `
                <div class="card-swatches">
                  ${product.colors.map(c => `
                    <span class="swatch-dot ${c.active ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}"></span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachCardEventListeners();
  }

  function resetFilters() {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.maxPrice = 10000;
    state.sortBy = 'featured';

    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.searchClearBtn) elements.searchClearBtn.classList.remove('visible');
    if (elements.priceSlider) {
      elements.priceSlider.value = 10000;
      elements.priceDisplayVal.textContent = formatCurrency(10000);
    }
    if (elements.sortSelect) elements.sortSelect.value = 'featured';

    elements.categoryPills.forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'all');
    });

    renderProducts();
  }

  function attachCardEventListeners() {
    // Quick view triggers
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openQuickViewModal(id);
      });
    });

    // Quick add triggers
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          addToCart(product, 1, product.colors ? product.colors[0].name : 'Signature');
          playLuxuryChime('add');
        }
      });
    });

    // Wishlist triggers
    document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        toggleWishlist(id);
      });
    });
  }

  // --- Cart State & Drawer Operations ---
  function addToCart(product, quantity = 1, variant = 'Signature') {
    const existingIndex = state.cart.findIndex(item => item.id === product.id && item.variant === variant);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        categoryName: product.categoryName,
        priceUSD: product.priceUSD,
        quantity: quantity,
        variant: variant,
        image: product.primaryImage
      });
    }

    saveState();
    updateBadges();
    renderCart();
    openCartDrawer();
    showToast('Acquisition Added', `${product.name} placed in your shopping bag.`);
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveState();
    updateBadges();
    renderCart();
  }

  function updateCartQuantity(index, delta) {
    const item = state.cart[index];
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(index);
      return;
    }

    saveState();
    updateBadges();
    renderCart();
  }

  function renderCart() {
    if (!elements.cartItemsList) return;

    if (state.cart.length === 0) {
      elements.cartItemsList.innerHTML = `
        <div class="empty-cart-view">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4>Your Shopping Bag is Empty</h4>
          <p>Explore our curated collections to acquire timeless masterpieces.</p>
          <button class="btn btn-outline" id="cart-start-shopping">Explore Creations</button>
        </div>
      `;
      document.getElementById('cart-start-shopping')?.addEventListener('click', closeAllDrawers);

      elements.cartSubtotal.textContent = formatCurrency(0);
      elements.cartShippingVal.textContent = 'Free Concierge';
      elements.cartTotalVal.textContent = formatCurrency(0);
      elements.freeShippingProgress.style.width = '0%';
      elements.freeShippingNote.textContent = 'Complimentary white-glove courier shipping on orders over $3,000';
      if (elements.cartCheckoutBtn) elements.cartCheckoutBtn.disabled = true;
      return;
    }

    if (elements.cartCheckoutBtn) elements.cartCheckoutBtn.disabled = false;

    // Render items
    elements.cartItemsList.innerHTML = state.cart.map((item, idx) => {
      const lineTotal = item.priceUSD * item.quantity;
      return `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h5 class="cart-item-title">${item.name}</h5>
            <div class="cart-item-meta">${item.variant}</div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button class="qty-btn dec-btn" data-idx="${idx}">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn inc-btn" data-idx="${idx}">+</button>
              </div>
              <span class="cart-item-price">${formatCurrency(lineTotal)}</span>
              <button class="remove-item-btn" data-idx="${idx}" title="Remove Item">✕</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach row listeners
    elements.cartItemsList.querySelectorAll('.dec-btn').forEach(btn => {
      btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.idx, 10), -1));
    });
    elements.cartItemsList.querySelectorAll('.inc-btn').forEach(btn => {
      btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.idx, 10), 1));
    });
    elements.cartItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.idx, 10)));
    });

    // Calculate totals
    const rawSubtotal = state.cart.reduce((sum, it) => sum + (it.priceUSD * it.quantity), 0);
    let discount = 0;

    if (state.appliedPromo) {
      if (state.appliedPromo.type === 'percent') {
        discount = rawSubtotal * (state.appliedPromo.value / 100);
      } else if (state.appliedPromo.type === 'fixed') {
        discount = Math.min(rawSubtotal, state.appliedPromo.value);
      }
    }

    const freeShippingThreshold = 3000;
    const progressPercent = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));
    elements.freeShippingProgress.style.width = `${progressPercent}%`;

    if (rawSubtotal >= freeShippingThreshold || (state.appliedPromo && state.appliedPromo.type === 'shipping')) {
      elements.freeShippingNote.innerHTML = '<strong style="color: #86efac;">✓ You have unlocked Complimentary White-Glove Courier Delivery!</strong>';
      elements.cartShippingVal.textContent = 'Complimentary';
    } else {
      const remaining = freeShippingThreshold - rawSubtotal;
      elements.freeShippingNote.textContent = `Add ${formatCurrency(remaining)} more for complimentary white-glove delivery.`;
      elements.cartShippingVal.textContent = formatCurrency(120);
    }

    const shippingCost = (rawSubtotal >= freeShippingThreshold || (state.appliedPromo && state.appliedPromo.type === 'shipping')) ? 0 : 120;
    const finalTotal = Math.max(0, rawSubtotal - discount + shippingCost);

    elements.cartSubtotal.textContent = formatCurrency(rawSubtotal);
    elements.cartTotalVal.textContent = formatCurrency(finalTotal);
  }

  // --- Promo Code Engine ---
  function applyPromoCode() {
    const code = elements.promoInput?.value.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      state.appliedPromo = { ...PROMO_CODES[code], code: code };
      elements.promoActiveTag.style.display = 'flex';
      elements.promoActiveTag.innerHTML = `
        <span>✓ Privilege Applied: ${state.appliedPromo.description}</span>
        <button id="remove-promo-btn" style="color: inherit; cursor: pointer;">✕</button>
      `;
      document.getElementById('remove-promo-btn')?.addEventListener('click', removePromoCode);
      elements.promoInput.value = '';
      showToast('Privilege Code Applied', state.appliedPromo.description);
      playLuxuryChime('add');
      renderCart();
    } else {
      showToast('Invalid Invitation Code', 'Please verify your collector privilege code.');
    }
  }

  function removePromoCode() {
    state.appliedPromo = null;
    elements.promoActiveTag.style.display = 'none';
    renderCart();
  }

  // --- Wishlist Management ---
  function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast('Removed from Salon', `${product ? product.name : 'Piece'} removed from your wishlist.`, 'heart');
    } else {
      state.wishlist.push(productId);
      showToast('Saved to Private Collection', `${product ? product.name : 'Piece'} added to your wishlist.`, 'heart');
      playLuxuryChime('wishlist');
    }

    saveState();
    updateBadges();
    renderProducts();
    renderWishlist();
  }

  function renderWishlist() {
    if (!elements.wishlistItemsList) return;

    const wishlistProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
      elements.wishlistItemsList.innerHTML = `
        <div class="empty-cart-view">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h4>Your Private Collection is Empty</h4>
          <p>Select the heart icon on any masterpiece to reserve it in your personal vault.</p>
        </div>
      `;
      return;
    }

    elements.wishlistItemsList.innerHTML = wishlistProducts.map(p => `
      <div class="cart-item-row">
        <img src="${p.primaryImage}" alt="${p.name}" class="cart-item-thumb" />
        <div class="cart-item-info">
          <h5 class="cart-item-title">${p.name}</h5>
          <div class="cart-item-meta">${p.categoryName}</div>
          <div class="cart-item-controls">
            <span class="cart-item-price">${formatCurrency(p.priceUSD)}</span>
            <button class="btn btn-primary move-to-bag-btn" data-id="${p.id}" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">
              Acquire
            </button>
            <button class="remove-item-btn remove-wishlist-btn" data-id="${p.id}">✕</button>
          </div>
        </div>
      </div>
    `).join('');

    elements.wishlistItemsList.querySelectorAll('.move-to-bag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = PRODUCTS.find(prod => prod.id === btn.dataset.id);
        if (p) {
          addToCart(p, 1);
          toggleWishlist(p.id);
        }
      });
    });

    elements.wishlistItemsList.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleWishlist(btn.dataset.id));
    });
  }

  // --- Badge Counters ---
  function updateBadges() {
    const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (elements.cartCountBadge) {
      elements.cartCountBadge.textContent = totalCartCount;
      elements.cartCountBadge.classList.add('pulse');
      setTimeout(() => elements.cartCountBadge.classList.remove('pulse'), 400);
    }

    if (elements.wishlistCountBadge) {
      elements.wishlistCountBadge.textContent = state.wishlist.length;
      elements.wishlistCountBadge.classList.add('pulse');
      setTimeout(() => elements.wishlistCountBadge.classList.remove('pulse'), 400);
    }
  }

  // --- Drawers & Modals Visibility ---
  function openCartDrawer() {
    closeAllDrawers();
    elements.drawerBackdrop?.classList.add('active');
    elements.cartDrawer?.classList.add('active');
    renderCart();
  }

  function openWishlistDrawer() {
    closeAllDrawers();
    elements.drawerBackdrop?.classList.add('active');
    elements.wishlistDrawer?.classList.add('active');
    renderWishlist();
  }

  function closeAllDrawers() {
    elements.drawerBackdrop?.classList.remove('active');
    elements.cartDrawer?.classList.remove('active');
    elements.wishlistDrawer?.classList.remove('active');
  }

  // --- Quick View Modal Engine ---
  function openQuickViewModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !elements.quickviewContent) return;

    state.selectedProductForModal = product;
    let activeColor = product.colors ? product.colors[0].name : 'Default';
    let activeQuantity = 1;

    elements.quickviewContent.innerHTML = `
      <div class="quickview-layout">
        <div class="quickview-gallery">
          <div class="main-preview-wrap">
            <img src="${product.primaryImage}" alt="${product.name}" id="qv-main-image" class="main-preview-img" />
          </div>
          <div class="gallery-thumbs">
            ${product.gallery.map((img, i) => `
              <div class="thumb-item ${i === 0 ? 'active' : ''}" data-src="${img}">
                <img src="${img}" alt="Thumbnail ${i + 1}" />
              </div>
            `).join('')}
          </div>
        </div>

        <div class="quickview-info">
          <span class="qv-category">${product.categoryName}</span>
          <h2 class="qv-title">${product.name}</h2>
          
          <div class="qv-price-row">
            <span class="qv-price">${formatCurrency(product.priceUSD)}</span>
            ${product.originalPriceUSD ? `<span class="original-price">${formatCurrency(product.originalPriceUSD)}</span>` : ''}
          </div>

          <p class="qv-desc">${product.description}</p>

          <table class="qv-specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <td>${key}</td>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          ${product.colors && product.colors.length > 1 ? `
            <div style="margin-bottom: 1.4rem;">
              <span class="form-label" style="display:block; margin-bottom: 0.5rem;">Material / Hue: <strong id="qv-color-label">${activeColor}</strong></span>
              <div class="card-swatches" style="gap: 0.65rem;">
                ${product.colors.map(c => `
                  <span class="swatch-dot qv-swatch ${c.active ? 'active' : ''}" data-color="${c.name}" style="background-color: ${c.hex}; width: 22px; height: 22px;"></span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="qv-cta-group">
            <div class="qty-stepper" style="height: 44px;">
              <button class="qty-btn" id="qv-dec-btn" style="width: 36px; height: 44px;">−</button>
              <span class="qty-display" id="qv-qty-val" style="width: 36px;">1</span>
              <button class="qty-btn" id="qv-inc-btn" style="width: 36px; height: 44px;">+</button>
            </div>

            <button class="btn btn-primary" id="qv-add-cart-btn" style="flex: 1; height: 44px;">
              Acquire Piece
            </button>
          </div>
        </div>
      </div>
    `;

    // Modal gallery click listener
    elements.quickviewContent.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const src = thumb.dataset.src;
        const mainImg = document.getElementById('qv-main-image');
        if (mainImg) mainImg.src = src;
        elements.quickviewContent.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Swatches click
    elements.quickviewContent.querySelectorAll('.qv-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        elements.quickviewContent.querySelectorAll('.qv-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        activeColor = swatch.dataset.color;
        const lbl = document.getElementById('qv-color-label');
        if (lbl) lbl.textContent = activeColor;
      });
    });

    // Modal Qty
    const qtyVal = document.getElementById('qv-qty-val');
    document.getElementById('qv-dec-btn')?.addEventListener('click', () => {
      if (activeQuantity > 1) {
        activeQuantity--;
        if (qtyVal) qtyVal.textContent = activeQuantity;
      }
    });
    document.getElementById('qv-inc-btn')?.addEventListener('click', () => {
      activeQuantity++;
      if (qtyVal) qtyVal.textContent = activeQuantity;
    });

    // Modal Add To Cart
    document.getElementById('qv-add-cart-btn')?.addEventListener('click', () => {
      addToCart(product, activeQuantity, activeColor);
      playLuxuryChime('add');
      closeQuickViewModal();
    });

    elements.quickviewModal?.classList.add('active');
  }

  function closeQuickViewModal() {
    elements.quickviewModal?.classList.remove('active');
  }

  // --- Interactive Checkout Modal Engine ---
  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    closeAllDrawers();
    goToCheckoutStep(1);
    elements.checkoutModal?.classList.add('active');
  }

  function closeCheckoutModal() {
    elements.checkoutModal?.classList.remove('active');
  }

  function goToCheckoutStep(step) {
    const step1El = document.getElementById('checkout-step-1');
    const step2El = document.getElementById('checkout-step-2');
    const step3El = document.getElementById('checkout-step-3');

    const ind1 = document.getElementById('step-ind-1');
    const ind2 = document.getElementById('step-ind-2');
    const ind3 = document.getElementById('step-ind-3');

    if (step === 1) {
      if (step1El) step1El.style.display = 'block';
      if (step2El) step2El.style.display = 'none';
      if (step3El) step3El.style.display = 'none';

      ind1?.classList.add('active');
      ind1?.classList.remove('completed');
      ind2?.classList.remove('active', 'completed');
      ind3?.classList.remove('active', 'completed');
    } else if (step === 2) {
      if (step1El) step1El.style.display = 'none';
      if (step2El) step2El.style.display = 'block';
      if (step3El) step3El.style.display = 'none';

      ind1?.classList.add('completed');
      ind2?.classList.add('active');
      ind3?.classList.remove('active', 'completed');

      // Update virtual card total amount
      const rawSubtotal = state.cart.reduce((sum, it) => sum + (it.priceUSD * it.quantity), 0);
      const totalDisplay = document.getElementById('checkout-pay-total');
      if (totalDisplay) totalDisplay.textContent = formatCurrency(rawSubtotal);
    } else if (step === 3) {
      if (step1El) step1El.style.display = 'none';
      if (step2El) step2El.style.display = 'none';
      if (step3El) step3El.style.display = 'block';

      ind1?.classList.add('completed');
      ind2?.classList.add('completed');
      ind3?.classList.add('active');

      renderConfirmationReceipt();
    }
  }

  function renderConfirmationReceipt() {
    const receiptBox = document.getElementById('order-receipt-box');
    const orderRef = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const rawSubtotal = state.cart.reduce((sum, it) => sum + (it.priceUSD * it.quantity), 0);
    const clientName = document.getElementById('client-full-name')?.value || 'Valued Patron';
    const clientEmail = document.getElementById('client-email')?.value || 'concierge@client.com';

    if (receiptBox) {
      receiptBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.8rem; margin-bottom: 1rem;">
          <div>
            <strong style="color: var(--gold-300); font-size: 1.1rem;">AURA & CO. ATELIER</strong><br>
            <span style="color: var(--text-muted); font-size: 0.75rem;">Certificate of Acquisition</span>
          </div>
          <div style="text-align: right;">
            <strong style="color: #fff;">#${orderRef}</strong><br>
            <span style="color: var(--text-muted); font-size: 0.75rem;">${dateStr}</span>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <p style="color: var(--text-secondary); margin-bottom: 0.2rem;"><strong>Client:</strong> ${clientName}</p>
          <p style="color: var(--text-secondary);"><strong>Contact:</strong> ${clientEmail}</p>
          <p style="color: var(--text-secondary);"><strong>White-Glove Courier:</strong> Secured & Insured Transit</p>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0.8rem;">
          ${state.cart.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
              <span>${item.quantity}x ${item.name} (${item.variant})</span>
              <strong style="color: var(--gold-300);">${formatCurrency(item.priceUSD * item.quantity)}</strong>
            </div>
          `).join('')}
        </div>

        <div style="border-top: 1px solid var(--border-medium); margin-top: 1rem; padding-top: 0.8rem; display: flex; justify-content: space-between; font-size: 1.05rem;">
          <strong>Total Transferred:</strong>
          <strong style="color: var(--gold-300); font-family: var(--font-serif); font-size: 1.3rem;">${formatCurrency(rawSubtotal)}</strong>
        </div>
      `;
    }

    // Clear cart upon successful order
    state.cart = [];
    saveState();
    updateBadges();
    playLuxuryChime('success');
  }

  // --- Live 3D Virtual Card Sync ---
  function setupLiveCardPreview() {
    const numberInput = document.getElementById('card-input-number');
    const nameInput = document.getElementById('card-input-name');
    const expInput = document.getElementById('card-input-exp');

    const cardNumDisplay = document.getElementById('virtual-card-number');
    const cardNameDisplay = document.getElementById('virtual-card-name');
    const cardExpDisplay = document.getElementById('virtual-card-exp');

    numberInput?.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = val;
      if (cardNumDisplay) {
        cardNumDisplay.textContent = val || '•••• •••• •••• ••••';
      }
    });

    nameInput?.addEventListener('input', (e) => {
      if (cardNameDisplay) {
        cardNameDisplay.textContent = e.target.value.toUpperCase() || 'HONORED PATRON';
      }
    });

    expInput?.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      if (cardExpDisplay) {
        cardExpDisplay.textContent = val || 'MM/YY';
      }
    });
  }

  // --- Atelier Craftsmanship Interactive Tabs ---
  function setupAtelierSteps() {
    const stepItems = document.querySelectorAll('.atelier-step-item');
    const mainImg = document.getElementById('atelier-active-img');
    const sealStep = document.getElementById('atelier-seal-step');

    stepItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        stepItems.forEach(s => s.classList.remove('active'));
        item.classList.add('active');

        const stepData = CRAFTSMANSHIP_STEPS[index];
        if (stepData) {
          if (mainImg) mainImg.src = stepData.image;
          if (sealStep) sealStep.textContent = stepData.step;
        }
      });
    });
  }

  // --- FAQ Accordion Engine ---
  function setupFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // --- Event Listeners Setup ---
  function initEventListeners() {
    // Currency Switcher
    elements.currencySelect?.addEventListener('change', (e) => {
      state.currency = e.target.value;
      saveState();
      renderProducts();
      renderCart();
      if (elements.priceSlider) {
        elements.priceDisplayVal.textContent = formatCurrency(state.maxPrice);
      }
      showToast('Currency Updated', `Prices recalculated in ${CURRENCIES[state.currency].label}`);
    });

    // Category Tabs
    elements.categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        elements.categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.dataset.category;
        renderProducts();
      });
    });

    // Live Search
    elements.searchInput?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      elements.searchClearBtn?.classList.toggle('visible', state.searchQuery.length > 0);
      renderProducts();
    });

    elements.searchClearBtn?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      state.searchQuery = '';
      elements.searchClearBtn?.classList.remove('visible');
      renderProducts();
    });

    // Price Slider
    elements.priceSlider?.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      if (elements.priceDisplayVal) {
        elements.priceDisplayVal.textContent = formatCurrency(state.maxPrice);
      }
      renderProducts();
    });

    // Sort Dropdown
    elements.sortSelect?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });

    // View Mode Toggle
    elements.viewModeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.viewModeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.view;
        state.viewMode = mode;
        elements.productsGrid?.classList.toggle('list-view', mode === 'list');
      });
    });

    // Cart Drawer Triggers
    elements.cartTriggerBtn?.addEventListener('click', openCartDrawer);
    elements.cartCloseBtn?.addEventListener('click', closeAllDrawers);

    // Wishlist Drawer Triggers
    elements.wishlistTriggerBtn?.addEventListener('click', openWishlistDrawer);
    elements.wishlistCloseBtn?.addEventListener('click', closeAllDrawers);

    // Backdrop Click
    elements.drawerBackdrop?.addEventListener('click', closeAllDrawers);

    // Promo Code
    elements.promoApplyBtn?.addEventListener('click', applyPromoCode);
    elements.promoInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyPromoCode();
      }
    });

    // Quick View Close
    elements.quickviewCloseBtn?.addEventListener('click', closeQuickViewModal);
    elements.quickviewModal?.addEventListener('click', (e) => {
      if (e.target === elements.quickviewModal) closeQuickViewModal();
    });

    // Checkout Modal Flow
    elements.cartCheckoutBtn?.addEventListener('click', openCheckoutModal);
    elements.checkoutCloseBtn?.addEventListener('click', closeCheckoutModal);

    elements.stepOneNextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('client-full-name');
      const emailInput = document.getElementById('client-email');
      if (!nameInput?.value.trim() || !emailInput?.value.trim()) {
        showToast('Required Information', 'Please provide your full name and delivery contact.');
        return;
      }
      goToCheckoutStep(2);
    });

    elements.stepTwoBackBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      goToCheckoutStep(1);
    });

    elements.placeOrderBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      goToCheckoutStep(3);
    });

    elements.finishOrderBtn?.addEventListener('click', () => {
      closeCheckoutModal();
      renderCart();
    });

    elements.printReceiptBtn?.addEventListener('click', () => {
      window.print();
    });

    // Newsletter Subscribe Simulation
    document.getElementById('newsletter-submit-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email-input');
      if (emailInput && emailInput.value.includes('@')) {
        showToast('Privilege Confirmed', 'Welcome to the AURA & CO. Private Salon Gazette.');
        emailInput.value = '';
        playLuxuryChime('add');
      } else {
        showToast('Invalid Email', 'Please enter a valid email address.');
      }
    });

    // Mobile Hamburger Toggle
    document.getElementById('mobile-toggle-btn')?.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (nav) {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = '#0e1017';
        nav.style.padding = '1.5rem 2rem';
        nav.style.borderBottom = '1px solid var(--border-medium)';
      }
    });
  }

  // --- Bootstrap Engine ---
  function init() {
    // Set currency selector initial value
    if (elements.currencySelect) {
      elements.currencySelect.value = state.currency;
    }

    if (elements.priceDisplayVal) {
      elements.priceDisplayVal.textContent = formatCurrency(state.maxPrice);
    }

    renderProducts();
    renderCart();
    updateBadges();
    initEventListeners();
    setupLiveCardPreview();
    setupAtelierSteps();
    setupFAQAccordion();
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
