// Se verifica si el usuario está a la altura de la sección para activar la animación de los personajes y el cambio cada 3 segundos de imagen dentro del carrusel.

const carrusel = document.querySelector('.carrusel5');
const images = [
  'url(assets/carrusel6-1.png)',
  'url(assets/carrusel6-2.png)',
  'url(assets/carrusel6-3.png)'
];
let currentIndex = 0;

setInterval(() => {
  carrusel.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}, 3000); 


window.addEventListener('scroll', () => {
    const section5 = document.querySelector('.section5');
    const personaje4 = document.querySelector('.s5personaje4');
    const personaje5 = document.querySelector('.s5personaje5');
    
    const sectionTop = section5.getBoundingClientRect().top;
    const windowHeight = window.innerHeight - 400;

    if (sectionTop < windowHeight && sectionTop > 0) {
      personaje4.classList.add('parallax-active');
      personaje5.classList.add('parallax-active');
    } else if (sectionTop < -500){
      personaje4.classList.remove('parallax-active');
      personaje5.classList.remove('parallax-active');
    }
  });