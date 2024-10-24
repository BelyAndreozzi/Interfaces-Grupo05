const cartButton = document.getElementById('cart-button');
const popover = document.getElementById('popoverCart');
const totalPriceElement = document.getElementById('total-price');

// Precios hardcodeados
const prices = [9.99, 12.99, 7.99];

function calculateTotal() {
    const total = prices.reduce((acc, price) => acc + price, 0).toFixed(2);
    totalPriceElement.textContent = total;
}

cartButton.addEventListener('click', () => {
    popover.style.display = popover.style.display === 'block' ? 'none' : 'block';
    if (popover.style.display === 'block') {
        calculateTotal(); 
    }
});

const favoritesButton = document.getElementById('favorites-button');
const favoritesPopover = document.getElementById('favorites-popover');

favoritesButton.addEventListener('click', () => {
    favoritesPopover.style.display = favoritesPopover.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!popover.contains(event.target) && !cartButton.contains(event.target)) {
        popover.style.display = 'none';
    }
    
    if (!favoritesPopover.contains(event.target) && !favoritesButton.contains(event.target)) {
        favoritesPopover.style.display = 'none';
    }
});