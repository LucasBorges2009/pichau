// Produtos
const products = [
    { id: 1, name: "MSI GeForce RTX 5060 Ventus 2X OC (8GB GDDR7/PCI Express 5.0/2535MHz/28000MHz)", price: 2229.99, image: "image/placa.jpg" },
    { id: 2, name: "Placa Mãe Gigabyte B550M AORUS Elite, Chipset B550, AMD AM4, mATX, DDR4", price: 949.99, image: "image/placamae.jpg" },
    { id: 3, name: "Mouse Gamer X11 Attack Shark Tri Mode 22000dpi Branco USB Bluetooth", price: 209.99, image: "image/mouse1.webp" },
    { id: 4, name: "Teclado Magnetico Attack Shark X68 He Branco Switch Magnetico", price: 469.99, image: "image/teclado2.webp" },
    { id: 5, name: "Memória HyperX Fury Beast (1 de 16GB) DIMM DDR4 3200Mhz Preto", price: 589.99, image: "image/memoriaram2.webp" },
    { id: 6, name: "Processador AMD RYZEN 5 5500X3D, 3 GHz (4 GHz Max.), Threads 12", price: 999.99, image: "image/processador.webp" },
    { id: 7, name: "Monitor Gamer LG UltraGear 27', FHD, 180Hz, 1ms, IPS, DP e HDMI, HDR10", price: 899.99, image: "image/monitor.webp" },
    { id: 8, name: "Cadeira Gamer ThunderX3 TGC12, Até 120kg, com Almofadas, Reclinável, Preto", price: 1099.99, image: "image/cadeira.webp" },
    { id: 9, name: "Mouse Pad Grande 90x40 Desk Pad Dragão Chinês Japonês", price: 49.99, image: "image/mousepad.webp" },
    { id: 10, name: "Headset Gamer Redragon Zeus X, RGB, USB, Preto e Vermelho", price: 269.99, image: "image/headset2.webp" },
    { id: 11, name: "Gabinete Gamer Rise Mode, M-ATX, Partes Externas Temperadas", price: 214.99, image: "image/gabinete.webp" }
  ];
  
  let cart = [];
  
  // DOM
  const productsGrid = document.getElementById('products-grid');
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');
  const overlay = document.getElementById('overlay');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const themeToggle = document.getElementById('theme-toggle');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Inicializar
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
  });
  
  // Render produtos
  function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">R$ ${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      });
    });
  }
  
  // Adicionar ao carrinho
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCart();
  }
  
  // Atualizar carrinho
  function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = '';
  
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
      cartTotal.textContent = '0.00';
      return;
    }
  
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
          <button class="cart-item-remove" data-id="${item.id}">Remover</button>
        </div>
      `;
      cartItems.appendChild(div);
    });
  
    cartTotal.textContent = total.toFixed(2);
  
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        removeFromCart(id);
      });
    });
  }
  
  // Remover do carrinho
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }
  
  // Abrir/Fechar carrinho
  cartIcon.addEventListener('click', () => {
    cartSidebar.style.right = '0';
    overlay.classList.add('active');
  });
  
  closeCart.addEventListener('click', closeCartSidebar);
  overlay.addEventListener('click', closeCartSidebar);
  
  function closeCartSidebar() {
    cartSidebar.style.right = '-400px';
    overlay.classList.remove('active');
  }
  
  // Toggle tema (opcional)
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
  });
  
  // Finalizar compra
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert(`Compra finalizada! Total: R$ ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}`);
    cart = [];
    updateCart();
    closeCartSidebar();
  });
  