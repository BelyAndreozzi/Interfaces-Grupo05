//Detecta si el top de la card esta dentro de la altura de la ventana, revela cada una de las cards de forma escalonada, 
//con un retraso de 200ms entre ellas.
const cards = document.querySelectorAll('.card');

function revealCards() {
  const windowHeight = window.innerHeight;
  
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < windowHeight) {
      setTimeout(() => {
        card.classList.add('appear');
      }, index * 300); 
    }
  });
}

window.addEventListener('scroll', revealCards);