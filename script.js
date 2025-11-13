// ========================================
// SCRIPT.JS - SITE NESSYCREA
// Site e-commerce de bougies artisanales
// ========================================

// ========== VARIABLES GLOBALES ==========
let cart = [];

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('🕯️ NessyCrea - Site initialisé');

  // Charger le panier depuis localStorage
  loadCartFromStorage();

  // Mettre à jour l'affichage du panier
  updateCartUI();

  // Initialiser les événements
  initEventListeners();

  // Initialiser les filtres produits
  initProductFilters();

  // Initialiser le menu mobile
  initMobileMenu();

  // Initialiser l'admin panel
  initAdminPanel();
});

// ========== GESTION DU PANIER ==========

// Ajouter un produit au panier
function addToCart(productId, productName, productPrice, productImage) {
  // Vérifier si le produit existe déjà
  const existingProduct = cart.find(item => item.id === productId);

  // Si pas d'image fournie, utiliser une image Unsplash par défaut
  if (!productImage || productImage.includes('data:image/svg') || productImage.includes('images/')) {
    productImage = 'https://images.unsplash.com/photo-1602874801006-47ff1e9c0b5f?w=500&q=80';
  }

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: 1
    });
  }

  // Sauvegarder dans localStorage
  saveCartToStorage();

  // Mettre à jour l'UI
  updateCartUI();

  // Afficher notification
  showToast(`${productName} ajouté au panier ✓`);

  // NE PAS ouvrir le drawer automatiquement
}

// Retirer un produit du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast('Produit retiré du panier');
}

// Mettre à jour la quantité d'un produit
function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);

  if (product) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      product.quantity = parseInt(newQuantity);
      saveCartToStorage();
      updateCartUI();
    }
  }
}

// Calculer le total du panier
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculer le nombre total d'articles
function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Mettre à jour l'UI du panier
function updateCartUI() {
  const cartCount = getCartItemCount();
  const cartTotal = getCartTotal();

  // Mettre à jour le compteur dans la navbar
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
  }

  // Mettre à jour le total
  const cartTotalElement = document.querySelector('.cart-total');
  if (cartTotalElement) {
    cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
  }

  // Mettre à jour la liste des produits dans le drawer
  updateCartDrawerContent();
}

// Mettre à jour le contenu du drawer
function updateCartDrawerContent() {
  const cartItemsContainer = document.querySelector('.cart-items');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Votre panier est vide</p>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-price">${item.price.toFixed(2)}€</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
          <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
          <button class="quantity-btn plus" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">×</button>
    </div>
  `).join('');
}

// Vider le panier
function clearCart() {
  if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Panier vidé');
  }
}

// ========== LOCALSTORAGE ==========

// Sauvegarder le panier dans localStorage
function saveCartToStorage() {
  localStorage.setItem('nessycrea_cart', JSON.stringify(cart));
}

// Charger le panier depuis localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem('nessycrea_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// ========== DRAWER PANIER - CORRECTION BUG ==========

// Force la fermeture du drawer au chargement initial
window.addEventListener('DOMContentLoaded', function () {
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.remove('open');
    console.log('✅ Drawer panier fermé au chargement');
  }
});

// Force la fermeture du drawer à chaque navigation/refresh
window.addEventListener('pageshow', function () {
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.remove('open');
    console.log('✅ Drawer panier fermé après navigation');
  }
});

// Fonction pour ouvrir le drawer
function openCartDrawer() {
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.add('open');
    console.log('🛒 Drawer panier ouvert');
  }
}

// Fonction pour fermer le drawer
function closeCartDrawer() {
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.remove('open');
    console.log('✅ Drawer panier fermé');
  }
}

// Event listener : Ouvre le drawer UNIQUEMENT au clic sur l'icône panier
function initEventListeners() {
  const panierBtn = document.querySelector('.panier-btn');
  if (panierBtn) {
    panierBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openCartDrawer();
    });
  }

  // Event listeners : Ferme le drawer avec les boutons de fermeture
  document.querySelectorAll('.close-cart').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      closeCartDrawer();
    });
  });

  // Fermer le drawer en cliquant sur l'overlay
  const cartOverlay = document.querySelector('.cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
      closeCartDrawer();
    });
  }
}

// ========== FILTRES PRODUITS ==========

function initProductFilters() {
  // Filtres par type
  const typeFilters = document.querySelectorAll('.filter-type');
  typeFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      filterProducts('type', filterValue);

      // Active state
      typeFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Filtres par prix
  const priceFilters = document.querySelectorAll('.filter-price');
  priceFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      filterProducts('price', filterValue);

      // Active state
      priceFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Filtres par taille
  const sizeFilters = document.querySelectorAll('.filter-size');
  sizeFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      filterProducts('size', filterValue);

      // Active state
      sizeFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function filterProducts(filterType, filterValue) {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const productData = product.dataset[filterType];

    if (filterValue === 'all' || productData === filterValue) {
      product.style.display = 'block';
      product.style.animation = 'fadeIn 0.5s ease';
    } else {
      product.style.display = 'none';
    }
  });
}

// ========== MENU MOBILE ==========

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    // Fermer au clic sur un lien
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }
}

// ========== MODAL PRODUIT ==========

function openProductModal(productId) {
  const modal = document.querySelector('.product-modal');
  const modalContent = document.querySelector('.modal-product-content');

  if (!modal || !modalContent) return;

  // Récupérer les données du produit
  const productCard = document.querySelector(`[data-product-id="${productId}"]`);
  if (!productCard) return;

  const productName = productCard.querySelector('.product-name').textContent;
  const productPrice = productCard.querySelector('.product-price').textContent;
  const productImage = productCard.querySelector('.product-image').src;
  const productDescription = productCard.dataset.description || 'Bougie artisanale en cire de soja naturelle';

  // Remplir le modal
  modalContent.innerHTML = `
    <button class="close-modal" onclick="closeProductModal()">×</button>
    <div class="modal-image-container">
      <img src="${productImage}" alt="${productName}">
    </div>
    <div class="modal-details">
      <h2>${productName}</h2>
      <p class="modal-price">${productPrice}</p>
      <p class="modal-description">${productDescription}</p>
      <div class="modal-actions">
        <button class="btn-primary" onclick="addToCart('${productId}', '${productName}', '${productPrice.replace('€', '')}', '${productImage}'); closeProductModal();">
          Ajouter au panier
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeProductModal() {
  const modal = document.querySelector('.product-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// ========== NOTIFICATIONS TOAST ==========

function showToast(message, duration = 3000) {
  // Créer l'élément toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // Ajouter au DOM
  document.body.appendChild(toast);

  // Afficher avec animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Retirer après la durée
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ========== ADMIN PANEL ==========

function initAdminPanel() {
  const loginForm = document.querySelector('#admin-login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.querySelector('#admin-email').value;
      const password = document.querySelector('#admin-password').value;

      // Authentification basique (à remplacer par vraie auth)
      if (email === 'admin@nessycrea.fr' && password === 'admin123') {
        localStorage.setItem('nessycrea_admin', 'true');
        window.location.href = 'admin-dashboard.html';
      } else {
        showToast('Identifiants incorrects ❌');
      }
    });
  }
}

// Déconnexion admin
function logoutAdmin() {
  localStorage.removeItem('nessycrea_admin');
  window.location.href = 'index.html';
}

// ========== FORMULAIRE CONTACT ==========

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('#contact-name').value;
    const email = document.querySelector('#contact-email').value;
    const message = document.querySelector('#contact-message').value;

    // Simulation d'envoi
    console.log('📧 Message envoyé:', { name, email, message });

    showToast('Message envoyé avec succès ! ✓');

    // Reset form
    contactForm.reset();
  });
}

// ========== SMOOTH SCROLL ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== ANIMATIONS AU SCROLL ==========

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observer tous les éléments animables
document.querySelectorAll('.fade-in, .slide-up, .product-card, .testimonial-card').forEach(el => {
  observer.observe(el);
});

// ========== UTILITAIRES ==========

// Formater le prix
function formatPrice(price) {
  return parseFloat(price).toFixed(2) + '€';
}

// Valider email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Debounce pour optimiser les performances
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========== FIN DU SCRIPT ==========

console.log('✅ Script NessyCrea chargé avec succès');
console.log('🛒 Panier initialisé:', cart.length, 'articles');
console.log('🔒 Bug drawer panier corrigé - drawer fermé par défaut');
