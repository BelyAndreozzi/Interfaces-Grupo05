/* const items = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let currentIndex = 0;
const visibleItems = 3;
let totalItems = items.length; // Guardamos el número de ítems originales

// Clonamos los primeros y últimos elementos para crear la ilusión de continuidad
const firstClone = [...items].slice(0, visibleItems).map(item => item.cloneNode(true));
const lastClone = [...items].slice(-visibleItems).map(item => item.cloneNode(true));

// Añadir los clones al principio y al final del carrusel
firstClone.forEach(clone => carousel.appendChild(clone));
lastClone.forEach(clone => carousel.insertBefore(clone, items[0]));

// Actualizamos el número total de ítems después de los clones
totalItems = document.querySelectorAll('.carousel-item').length;

// Reposicionar el carrusel al inicio (después de los clones del final)
carousel.style.transform = `translateX(${-100 / visibleItems}%)`; 
currentIndex = visibleItems; // Iniciamos en el primer ítem real

// Función para actualizar el carrusel
function updateCarousel() {
    carousel.style.transition = 'transform 0.5s ease-in-out'; 
    const offset = -currentIndex * (100 / visibleItems); 
    carousel.style.transform = `translateX(${offset}%)`;
    console.log(currentIndex)
    console.log(totalItems)

    // Cuando llegamos al final o al principio, hacemos que salte sin transición
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = 'none'; // Desactivar la transición
            currentIndex = totalItems - visibleItems * 2; // Salta al final real
            carousel.style.transform = `translateX(${-(100 / visibleItems) * currentIndex}%)`;
        }, 500); // Espera a que termine la transición
    } else if (currentIndex === totalItems - visibleItems) {
        setTimeout(() => {
            carousel.style.transition = 'none'; // Desactivar la transición
            currentIndex = visibleItems; // Salta al inicio real
            carousel.style.transform = `translateX(${-(100 / visibleItems) * currentIndex}%)`;
        }, 500); // Espera a que termine la transición
    }


    items.forEach((item, index) => {
        item.classList.remove('central');
        if (index >= visibleItems && index < totalItems - visibleItems && index === currentIndex + Math.floor(visibleItems / 2)) { 
            item.classList.add('central');
            console.log(item);
        }
    })
}

// Evento clic en la flecha izquierda
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
});

// Evento clic en la flecha derecha
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
    }
    updateCarousel();
});

// Inicia el carrusel
updateCarousel();

 */

// Get the carousel and carousel items
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
console.log('carouselItems:', carouselItems);
// Select the buttons
const nextButton = document.querySelector('.arrow.right');
const prevButton = document.querySelector('.arrow.left');

// Add event listeners to the buttons
nextButton.addEventListener('click', nextItem);
prevButton.addEventListener('click', prevItem);

// Set the number of visible items
const visibleItems = 3;

// Set the current index
let currentIndex = 0;
let centralIndex = 1;

function updateCarousel() {
    console.log('currentIndex:', currentIndex);

    // Calculate the offset
    const offset = -currentIndex * (100 / visibleItems);

    // Set the transform property of the carousel
    carousel.style.transform = `translateX(${offset}%)`;

    // Calculate the central item index
    const centralItemIndex = currentIndex + Math.floor(visibleItems / 2);

    // Add the 'central' class to the central item
    carouselItems.forEach((item, index) => {
        item.classList.remove('central');
        if (index === centralItemIndex) {
            item.classList.add('central');
        }
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevItem() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}


// Initialize the carousel
updateCarousel();
