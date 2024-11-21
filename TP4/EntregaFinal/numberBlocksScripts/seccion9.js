// Se verifica si el usuario está a la altura de la sección para activar la animación de los textos y la imagen correspondiente: dependiendo su altura va sacando y agregando clases a los textos y las imagenes.

document.addEventListener('scroll', () => {
  const texts = document.querySelectorAll('.s9-ind-text');
  const images = document.querySelectorAll('.s9-image');

  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75; 

  function removeClass() {
    texts.forEach(text => text.classList.remove('text-active'));
    images.forEach(image => image.classList.remove('img-active'));
  }

  texts.forEach((text, index) => {
    const rect = text.getBoundingClientRect();
    const textMidpoint = rect.top + rect.height / 2;

    if (textMidpoint < triggerPoint && textMidpoint > 0) {
      removeClass();
      text.classList.add('text-active');
      images[index].classList.add('img-active');
    }
  });
});