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
    
    // Calcula la posicion de la seccion en el viewport
    const sectionTop = section5.getBoundingClientRect().top;
    const windowHeight = window.innerHeight - 400;
  
    // Activa la animacion cuando la seccion este visible
    if (sectionTop < windowHeight && sectionTop > 0) {
      personaje4.classList.add('parallax-active');
      personaje5.classList.add('parallax-active');
    } else if (sectionTop < -500){
      personaje4.classList.remove('parallax-active');
      personaje5.classList.remove('parallax-active');
    }
  });