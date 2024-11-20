document.addEventListener('scroll', () => {
  /* const contentContainer = document.querySelector('.s9-content-container'); */
  const texts = document.querySelectorAll('.s9-ind-text');
  const images = document.querySelectorAll('.s9-image');

  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75; // 3/4 desde la parte inferior

  function removeClass() {
    texts.forEach(text => text.classList.remove('text-active'));
    images.forEach(image => image.classList.remove('img-active'));
  }

  texts.forEach((text, index) => {
    const rect = text.getBoundingClientRect();
    const textMidpoint = rect.top + rect.height / 2; // Punto medio del texto

    if (textMidpoint < triggerPoint && textMidpoint > 0) {
      removeClass();
      text.classList.add('text-active');
      images[index].classList.add('img-active');
    }
  });
});


/* document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.s9-image');
  const texts = document.querySelectorAll('.s9-ind-text');
  const section = document.querySelector('#section9');

  function handleScroll() {
    const sectionTop = section.offsetTop;
    const scrollPosition = window.scrollY - sectionTop;
    const sectionHeight = section.offsetHeight;
    const itemHeight = sectionHeight / images.length;

    images.forEach((image, index) => {
      const start = index * itemHeight;
      const end = start + itemHeight;

      const isActive = scrollPosition >= start && scrollPosition < end;
      image.classList.toggle('img-active', isActive);
    });

    texts.forEach((text, index) => {
      const start = index * itemHeight;
      const end = start + itemHeight;

      const isActive = scrollPosition >= start && scrollPosition < end;
      text.classList.toggle('text-active', isActive);
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Actualiza al cargar la página
});

 */

/* const texts = document.querySelectorAll('.s9-ind-text');
const s9images = document.querySelectorAll('.s9-image');
const s9section = document.querySelector('#section9');

window.addEventListener('scroll', () => {
  const height = 413; // Altura de cada sección de texto/imagen

  const sectionTop = s9section.getBoundingClientRect().top + window.scrollY; // Distancia de la sección al inicio de la página
  const heightChange = (window.scrollY - sectionTop) +600; // Distancia desplazada dentro de la sección


  // Remover todas las clases activas
  const removeClass = () => {
    texts.forEach(text => text.classList.remove('text-active'));
    s9images.forEach(image => image.classList.remove('img-active'));
  };

  // Determinar el índice actual basado en el desplazamiento
  const index = Math.floor(heightChange / height);
  console.log(index);


  // Asegurarse de que el índice esté dentro del rango válido
  if (index >= 0 && index < texts.length) {
    removeClass();
    s9images[index].classList.add('img-active');
    texts[index].classList.add('text-active');
  } else {
    removeClass(); // Si el índice está fuera del rango, quitar todas las clases activas
  }
});  */

/* document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.s9-image');
  const texts = document.querySelectorAll('.s9-ind-text');
  const section = document.querySelector('#section9'); // Contenedor de la sección específica

  function handleScroll() {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY; // Inicio de la sección
    const scrollPosition = window.scrollY - sectionTop; // Posición de desplazamiento relativa a la sección

    images.forEach((image, index) => {
      const offsetTop = image.offsetTop;
      const nextImage = images[index + 1];

      if (nextImage) {
        const nextOffsetTop = nextImage.offsetTop;
        const isVisible = scrollPosition >= offsetTop && scrollPosition < nextOffsetTop;
        image.classList.toggle('img-active', isVisible);
      } else {
        const isVisible = scrollPosition >= offsetTop;
        image.classList.toggle('img-active', isVisible);
      }
    });

    texts.forEach((text, index) => {
      const offsetTop = text.offsetTop;
      const nextText = texts[index + 1];

      if (nextText) {
        const nextOffsetTop = nextText.offsetTop;
        const isVisible = scrollPosition >= offsetTop && scrollPosition < nextOffsetTop;
        text.classList.toggle('text-active', isVisible);
      } else {
        const isVisible = scrollPosition >= offsetTop;
        text.classList.toggle('text-active', isVisible);
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Asegura que la visibilidad se actualice al cargar la página.
}); */

/* document.addEventListener('scroll', () => {
  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75;

  function removeClass() {
    texts.forEach(text => text.classList.remove('text-active'));
    images.forEach(image => image.classList.remove('img-active'));
  }



  
}) */