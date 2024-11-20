document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('section10');
    const videoContainer = document.querySelector('.s10reproductor');
    const character = document.getElementById('p3s10');
  
    // Configuracion del Intersection Observer
    const observerOptions = {
      root: null, // Viewport
      threshold: 0.5, // Activa cuando el 50% de la seccion es visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Activa las animaciones cuando la seccion es visible
          videoContainer.classList.add('active');
          character.classList.add('active');
          setTimeout(() => {
            character.classList.add('moving');
          }, 2000); 
      
        }
      });
    }, observerOptions);

    
    // Observa la seccion
    observer.observe(section);
  
    // Logica para la miniatura del video
    const thumbnail = document.querySelector('.video-thumbnail');
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('hidden'); 
    });
  });