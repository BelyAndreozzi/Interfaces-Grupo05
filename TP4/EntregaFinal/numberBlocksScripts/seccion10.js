document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('section10');
    const videoContainer = document.querySelector('.s10reproductor');
    const character = document.getElementById('p3s10');
  
    // Configuración del Intersection Observer
    const observerOptions = {
      root: null, // Viewport
      threshold: 0.5, // Activa cuando el 50% de la sección es visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Activa las animaciones cuando la sección es visible
          videoContainer.classList.add('active');
          character.classList.add('active');
          setTimeout(() => {
            character.classList.add('moving');
          }, 2000); // Retraso de 200 ms entre tarjetas
      
        }
      });
    }, observerOptions);

    
    // Observa la sección
    observer.observe(section);
  
    // Lógica para la miniatura del video
    const thumbnail = document.querySelector('.video-thumbnail');
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('hidden'); // Oculta la miniatura
    });
  });