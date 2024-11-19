/* document.addEventListener('scroll', () => {
  const contentContainer = document.querySelector('.s9-content-container');
  const texts = document.querySelectorAll('.s9-ind-text');
  const img = document.querySelector('.s9-img-container');

  const images = [
    'url(assets/00-9.svg)',
    'url(assets/11-9.svg)',
    'url(assets/22-9.svg)',
    'url(assets/33-9.svg)',
    'url(assets/44-9.svg)',
    'url(assets/55-9.svg)',
    'url(assets/66-9.svg)',
    'url(assets/77-9.svg)',
    'url(assets/88-9.svg)',
    'url(assets/99-9.svg)',
    'url(assets/10-9.svg)'
  ];

  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75; // 3/4 desde la parte inferior

  function removeClass() {
    texts.forEach(text => text.classList.remove('text-active'));
    img.classList.remove('img-active');
  }

  texts.forEach((text, index) => {
    const rect = text.getBoundingClientRect();
    const textMidpoint = rect.top + rect.height / 2; // Punto medio del texto

    if (textMidpoint < triggerPoint && textMidpoint > 0) {
      removeClass();
      text.classList.add('text-active');
      img.style.backgroundImage = images[index];
      img.classList.add('img-active');
    }
  });
});
 */

//////////////

let isThrottling = false;

document.addEventListener('scroll', () => {
  if (isThrottling) return;

  isThrottling = true;

  setTimeout(() => {
    handleScroll();
    isThrottling = false;
  }, 100); // Ajusta este valor según la velocidad de tu scroll (100ms es un buen punto de partida)
});

function handleScroll() {
  const texts = document.querySelectorAll('.s9-ind-text');
  const img = document.querySelector('.s9-img-container');

  const images = [
    'url(assets/00-9.svg)',
    'url(assets/11-9.svg)',
    'url(assets/22-9.svg)',
    'url(assets/33-9.svg)',
    'url(assets/44-9.svg)',
    'url(assets/55-9.svg)',
    'url(assets/66-9.svg)',
    'url(assets/77-9.svg)',
    'url(assets/88-9.svg)',
    'url(assets/99-9.svg)',
    'url(assets/10-9.svg)'
  ];

  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.75;

  function removeClass() {
    texts.forEach(text => text.classList.remove('text-active'));
    img.classList.remove('img-active');
  }

  texts.forEach((text, index) => {
    const rect = text.getBoundingClientRect();
    const textMidpoint = rect.top + rect.height / 2;

    if (textMidpoint < triggerPoint && textMidpoint > 0) {
      removeClass();
      text.classList.add('text-active');
      img.style.backgroundImage = images[index];
      img.classList.add('img-active');
    }
  });
}
