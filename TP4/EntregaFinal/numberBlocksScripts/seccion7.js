const cards = document.querySelectorAll('.card');

function revealCards() {
  const windowHeight = window.innerHeight;
  
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < windowHeight) {
      setTimeout(() => {
        card.classList.add('appear');
      }, index * 300); // Retraso de 200 ms entre tarjetas
    }
  });
}

window.addEventListener('scroll', revealCards);