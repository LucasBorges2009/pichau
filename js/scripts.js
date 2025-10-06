
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "MSI GeForce RTX 5060 Ventus 2X OC (8GB GDDR7/PCI Express 5.0/2535MHz/28000MHz)",
        price: 2229.99,
        image: "image/placa.jpg"
    },
    {
        id: 2,
        name: "Placa Mãe Gigabyte B550M AORUS Elite, Chipset B550, AMD AM4, mATX, DDR4",
        price: 949.99,
        image: "image/placamae.jpg"
    },
    {
        id: 3,
        name: "Mouse Gamer X11 Attack Shark Tri Mode 22000dpi Branco USB Bluetooth",
        price: 209.99,
        image: "image/mouse1.webp"
    },
    {
        id: 4,
        name: "Teclado Magnetico Attack Shark X68 He Branco Switch Magnetico",
        price: 469.99,
        image: "image/teclado2.webp"
    },
    {
        id: 5,
        name: "Memória HyperX Fury Beast (1 de 16GB) DIMM DDR4 3200Mhz Preto",
        price: 589.99,
        image: "image/memoriaram2.webp"
    },
    {
        id: 6,
        name: "Processador AMD RYZEN 5 5500X3D, 3 GHz (4 GHz Max.), Threads 12",
        price: 999.99,
        image: "image/processador.webp"
    },
    {
        id: 7,
        name: "Monitor Gamer LG UltraGear 27', FHD, 180Hz, 1ms, IPS, DP e HDMI, HDR10",
        price: 899.99,
        image: "image/monitor.webp"
    },
    {
        id: 8,
        name: "Cadeira Gamer ThunderX3 TGC12, Até 120kg, com Almofadas, Reclinável, Preto",
        price: 1099.99,
        image: "image/cadeira.webp"
    },
    {
        id: 9,
        name: "Mouse Pad Grande 90x40 Desk Pad Dragão Chinês Japonês",
        price: 49.99,
        image: "image/mousepad.webp"
    },
    {
        id: 10,
        name: "Headset Gamer Redragon Zeus X, RGB, USB, Preto e Vermelho",
        price: 269.99,
        image: "image/headset2.webp"
    },
    {
        id: 11,
        name: "Gabinete Gamer Rise Mode, M-ATX, Partes Externas Temperadas",
        price: 214.99,
        image: "image/gabinete.webp"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});