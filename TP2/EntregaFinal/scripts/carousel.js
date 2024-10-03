const items = document.querySelectorAll('.carousel-item');
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
        item.classList.remove('active');
        if (index === currentIndex + 1) { // El ítem central es el segundo
            item.classList.add('active');
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

