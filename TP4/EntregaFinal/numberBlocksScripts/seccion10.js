//Utilizando Intersection Observer se activan las animaciones de la seccion cuando esta es visible. 
//Además, cuando el usuario clickea para ver el video, se remueve la imagen de miniatura que está sobre el mismo. 

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('section10');
    const videoContainer = document.querySelector('.s10reproductor');
    const character = document.getElementById('p3s10');
  
    const observerOptions = {
      root: null, 
      threshold: 0.5, 
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoContainer.classList.add('active');
          character.classList.add('active');
          setTimeout(() => {
            character.classList.add('moving');
          }, 2000); 
      
        }
      });
    }, observerOptions);

    observer.observe(section);
  
    const thumbnail = document.querySelector('.video-thumbnail');
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('hidden'); 
    });
});