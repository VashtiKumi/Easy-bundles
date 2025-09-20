document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('loaded');
        }, 600);
    }, 4000);
});

const serviceData = {
    airtime: {
        title: 'Airtime Top-up',
        packages: [
            { name: 'GH₵1 Airtime', price: 0.95, details: 'All Networks' },
            { name: 'GH₵2 Airtime', price: 1.90, details: 'All Networks' },
            { name: 'GH₵5 Airtime', price: 4.75, details: 'All Networks' },
            { name: 'GH₵10 Airtime', price: 9.50, details: 'All Networks' },
            { name: 'GH₵20 Airtime', price: 19.00, details: 'All Networks' },
            { name: 'GH₵50 Airtime', price: 47.50, details: 'All Networks' }
        ]
    },
    mtn: {
        title: 'MTN Data Bundles',
        packages: [
            { name: '1GB - 1 Day', price: 2.50, details: 'Valid for 24 hours' },
            { name: '2GB - 3 Days', price: 4.50, details: 'Valid for 3 days' },
            { name: '3GB - 7 Days', price: 6.50, details: 'Valid for 1 week' },
            { name: '5GB - 7 Days', price: 10.00, details: 'Valid for 1 week' },
            { name: '10GB - 30 Days', price: 18.00, details: 'Valid for 1 month' },
            { name: '20GB - 30 Days', price: 32.00, details: 'Valid for 1 month' },
            { name: '50GB - 30 Days', price: 75.00, details: 'Valid for 1 month' }
        ]
    },
    airteltigo: {
        title: 'AirtelTigo iShare',
        packages: [
            { name: '1GB - 1 Day', price: 2.20, details: 'iShare bundle' },
            { name: '2GB - 3 Days', price: 4.20, details: 'iShare bundle' },
            { name: '3GB - 7 Days', price: 6.00, details: 'iShare bundle' },
            { name: '5GB - 7 Days', price: 9.50, details: 'iShare bundle' },
            { name: '10GB - 30 Days', price: 17.00, details: 'iShare bundle' },
            { name: '20GB - 30 Days', price: 30.00, details: 'iShare bundle' }
        ]
    },
    bigtime: {
        title: 'AirtelTigo BigTime',
        packages: [
            { name: '500MB - 1 Day', price: 1.50, details: 'BigTime bundle' },
            { name: '1GB - 3 Days', price: 3.00, details: 'BigTime bundle' },
            { name: '2GB - 7 Days', price: 5.50, details: 'BigTime bundle' },
            { name: '5GB - 30 Days', price: 12.00, details: 'BigTime bundle' },
            { name: '10GB - 30 Days', price: 22.00, details: 'BigTime bundle' }
        ]
    },
    telecel: {
        title: 'Telecel Data Bundles',
        packages: [
            { name: '1GB - 1 Day', price: 2.30, details: 'Valid for 24 hours' },
            { name: '2GB - 3 Days', price: 4.30, details: 'Valid for 3 days' },
            { name: '3GB - 7 Days', price: 6.20, details: 'Valid for 1 week' },
            { name: '5GB - 7 Days', price: 9.80, details: 'Valid for 1 week' },
            { name: '10GB - 30 Days', price: 18.50, details: 'Valid for 1 month' }
        ]
    },
    results: {
        title: 'WAEC Results Checker',
        packages: [
            { name: 'WAEC Results Check', price: 15.00, details: 'Check your WAEC results' },
            { name: 'BECE Results Check', price: 12.00, details: 'Check your BECE results' },
            { name: 'WASSCE Results Check', price: 15.00, details: 'Check your WASSCE results' }
        ]
    },
    netflix: {
        title: 'Netflix Subscription',
        packages: [
            { name: 'Netflix 1 Month', price: 45.00, details: 'Premium subscription' },
            { name: 'Netflix 3 Months', price: 120.00, details: 'Premium subscription' },
            { name: 'Netflix 6 Months', price: 220.00, details: 'Premium subscription' }
        ]
    },
    amazon: {
        title: 'Amazon Prime',
        packages: [
            { name: 'Prime 1 Month', price: 35.00, details: 'Full Prime benefits' },
            { name: 'Prime 3 Months', price: 95.00, details: 'Full Prime benefits' },
            { name: 'Prime 6 Months', price: 180.00, details: 'Full Prime benefits' }
        ]
    }
};


let cart = [];
let cartTotal = 0;

const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');
const overlay = document.getElementById('overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCart = document.getElementById('close-cart');
const cartLink = document.querySelector('a[href="#cart"]');
const callbackBtn = document.getElementById('callback-request');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const service = card.dataset.service;
        openServiceModal(service);
    });
});

closeModal.addEventListener('click', closeServiceModal);
overlay.addEventListener('click', closeServiceModal);
closeCart.addEventListener('click', closeCartSidebar);
cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCartSidebar();
});

checkoutBtn.addEventListener('click', proceedToCheckout);
callbackBtn.addEventListener('click', requestCallback);

function openServiceModal(service) {
    const data = serviceData[service];
    if (!data) return;
    
    modalTitle.textContent = data.title;
    modalBody.innerHTML = createPackageGrid(data.packages, service);
    
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const packageItems = modalBody.querySelectorAll('.package-item');
    packageItems.forEach(item => {
        item.addEventListener('click', () => selectPackage(item));
    });
}

function closeServiceModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function createPackageGrid(packages, service) {
    return `
        <div class="package-grid">
            ${packages.map((pkg, index) => `
                <div class="package-item" data-service="${service}" data-index="${index}">
                    <div class="package-header">
                        <div class="package-name">${pkg.name}</div>
                        <div class="package-price">GH₵${pkg.price.toFixed(2)}</div>
                    </div>
                    <div class="package-details">${pkg.details}</div>
                    <div class="package-form" id="form-${service}-${index}">
                        <div class="form-group">
                            <label for="phone-${service}-${index}">Phone Number:</label>
                            <input type="tel" id="phone-${service}-${index}" placeholder="0XX XXX XXXX" required>
                        </div>
                        ${service === 'results' ? `
                            <div class="form-group">
                                <label for="index-${service}-${index}">Index Number:</label>
                                <input type="text" id="index-${service}-${index}" placeholder="Enter your index number" required>
                            </div>
                        ` : ''}
                        <button class="add-to-cart-btn" onclick="addToCart('${service}', ${index})">
                            Add to Cart - GH₵${pkg.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function selectPackage(item) {
    // Remove selection from other items
    const allItems = item.parentElement.querySelectorAll('.package-item');
    allItems.forEach(i => {
        i.classList.remove('selected');
        i.querySelector('.package-form').classList.remove('active');
    });
    
    // Select current item
    item.classList.add('selected');
    item.querySelector('.package-form').classList.add('active');
}

// Cart Functions
function addToCart(service, packageIndex) {
    const data = serviceData[service];
    const pkg = data.packages[packageIndex];
    const phoneInput = document.getElementById(`phone-${service}-${packageIndex}`);
    const indexInput = document.getElementById(`index-${service}-${packageIndex}`);
    
    if (!phoneInput.value) {
        alert('Please enter a phone number');
        return;
    }
    
    if (service === 'results' && !indexInput.value) {
        alert('Please enter your index number');
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        service: service,
        package: pkg,
        phone: phoneInput.value,
        indexNumber: indexInput ? indexInput.value : null,
        serviceTitle: data.title
    };
    
    cart.push(cartItem);
    updateCartUI();
    closeServiceModal();
    
    // Show success message
    showNotification('Item added to cart successfully!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartTotal = cart.reduce((total, item) => total + item.package.price, 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.package.name}</h4>
                    <p>${item.serviceTitle}</p>
                    <p>Phone: ${item.phone}</p>
                    ${item.indexNumber ? `<p>Index: ${item.indexNumber}</p>` : ''}
                </div>
                <div style="display: flex; align-items: center;">
                    <div class="cart-item-price">GH₵${item.package.price.toFixed(2)}</div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

function openCartSidebar() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    
    // Simulate checkout process
    showNotification('Redirecting to payment gateway...');
    
    setTimeout(() => {
        // In a real implementation, this would redirect to a payment processor
        alert(`Checkout Summary:\n\nTotal Items: ${cart.length}\nTotal Amount: GH₵${cartTotal.toFixed(2)}\n\nThis is a demo. In a real implementation, you would be redirected to a secure payment gateway.`);
        
        // Clear cart after successful "payment"
        cart = [];
        updateCartUI();
        closeCartSidebar();
        showNotification('Thank you for your purchase! Your order is being processed.');
    }, 2000);
}

function requestCallback() {
    const phone = prompt('Please enter your phone number for callback:');
    if (phone) {
        showNotification('Callback requested! We will call you within 5 minutes.');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Phone number formatting
document.addEventListener('input', function(e) {
    if (e.target.type === 'tel') {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        }
        
        e.target.value = value;
    }
});

// Initialize cart UI
updateCartUI();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        // Toggle mobile menu - implement as needed
        console.log('Mobile menu clicked');
    });
}