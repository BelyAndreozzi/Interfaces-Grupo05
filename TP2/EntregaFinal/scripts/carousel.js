/* // Get the carousel and carousel items
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
updateCarousel(); */

// Obtener el carrusel y los elementos del carrusel
const carousel = document.querySelector('.carousel');
let carouselItems = Array.from(document.querySelectorAll('.carousel-item'));

// Seleccionar los botones
const nextButton = document.querySelector('.arrow.right');
const prevButton = document.querySelector('.arrow.left');

// Definir la cantidad de elementos visibles
const visibleItems = 3;
let currentIndex = visibleItems; // Iniciar en el primer ítem real
const realItemsCount = carouselItems.length; // Cantidad de ítems reales (sin clones)

// Duplicar los primeros y últimos elementos para crear el efecto infinito
const itemsToClone = visibleItems; // Duplicar el número de elementos visibles
for (let i = 0; i < itemsToClone; i++) {
    const firstClone = carouselItems[i].cloneNode(true);
    const lastClone = carouselItems[carouselItems.length - 1 - i].cloneNode(true);
    carousel.appendChild(firstClone); // Agregar clones al final
    carousel.insertBefore(lastClone, carousel.firstChild); // Agregar clones al inicio
}

// Actualizar la lista de elementos del carrusel después de duplicar
carouselItems = Array.from(document.querySelectorAll('.carousel-item'));

// Función para actualizar el carrusel
function updateCarousel(transition = true) {
    // Activar o desactivar transición
    if (!transition) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }

    // Calcular el desplazamiento
    const offset = -currentIndex * (100 / visibleItems);
    carousel.style.transform = `translateX(${offset}%)`;

    // Calcular el índice central dentro de los elementos visibles
    const centralItemIndex = currentIndex % realItemsCount;

    // Actualizar clases de todos los elementos para resaltar el central
    carouselItems.forEach((item, index) => {
        item.classList.remove('central');
        const relativeIndex = (index - currentIndex + carouselItems.length) % carouselItems.length;
        if (relativeIndex === Math.floor(visibleItems / 2)) {
            item.classList.add('central');
        }
    });
}

// Función para ajustar la transición
function resetTransition() {
    carousel.style.transition = 'none';
    updateCarousel(false);
    setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
}

// Avanzar al siguiente ítem
function nextItem() {
    currentIndex++;
    updateCarousel();

    // Si llegamos al final de los elementos reales, saltar al inicio
    if (currentIndex >= realItemsCount + visibleItems) {
        setTimeout(() => {
            currentIndex = visibleItems; // Regresar al primer ítem real
            resetTransition();
        }, 500); // El tiempo debe coincidir con la duración de la transición
    }
}

// Retroceder al ítem anterior
function prevItem() {
    currentIndex--;
    updateCarousel();

    // Si llegamos al inicio de los elementos reales, saltar al final real
    if (currentIndex < 0) {
        setTimeout(() => {
            currentIndex = realItemsCount - 1; // Regresar al último ítem real
            resetTransition();
        }, 500); // El tiempo debe coincidir con la duración de la transición
    }
}

// Agregar eventos a los botones
nextButton.addEventListener('click', nextItem);
prevButton.addEventListener('click', prevItem);

// Inicializar el carrusel
updateCarousel();

