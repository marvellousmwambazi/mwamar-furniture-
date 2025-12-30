// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Simple cart counter
let cartCount = 0;
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartDisplay = document.querySelector('.cart-count');

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartDisplay.textContent = cartCount;
        alert('Added to cart!');
    });
});