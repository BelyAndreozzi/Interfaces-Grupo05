/* // Selección de elementos
const imgContainer = document.getElementById('s9-image');
const textBlocks = document.querySelectorAll('.s9-ind-text');

// Función para cambiar la imagen según el bloque visible
function updateImageOnScroll() {
  let closestBlock = null;
  let minDistance = window.innerHeight; // Altura de la ventana para calcular la distancia más corta

  textBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const distanceToCenter = Math.abs(rect.top - window.innerHeight / 2);

    // Verifica si el bloque actual está más cercano al centro de la pantalla
    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      closestBlock = block;
    }
  });

  // Cambia la imagen si se encuentra un bloque visible más cercano
  if (closestBlock) {
    const newImgSrc = closestBlock.getAttribute('data-img');
    if (imgContainer.src !== newImgSrc) {
      imgContainer.src = newImgSrc;
    }
  }
}

// Escucha el evento de scroll para actualizar la imagen
window.addEventListener('scroll', updateImageOnScroll);
 */


///////////////////////////////////////////////////////////////////////
/* // Selección de elementos
const imgContainer = document.getElementById('s9-image');
const textBlocks = document.querySelectorAll('.s9-ind-text');

// Función para cambiar la imagen cuando el bloque de texto está centrado en la pantalla
function updateImageOnScroll() {
  let closestBlock = null;
  let minDistance = window.innerHeight;

  textBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const blockCenter = rect.top + rect.height / 2; // Centro vertical del bloque
    const distanceToCenter = Math.abs(blockCenter - window.innerHeight / 2);

    // Verifica si el centro del bloque actual está más cercano al centro de la pantalla
    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      closestBlock = block;
    }
  });

  // Cambia la imagen si se encuentra un bloque visible más cercano al centro
  if (closestBlock) {
    const newImgSrc = closestBlock.getAttribute('data-img');
    if (imgContainer.src !== newImgSrc) {
      imgContainer.src = newImgSrc;
    }
  }
}

// Escucha el evento de scroll para actualizar la imagen
window.addEventListener('scroll', updateImageOnScroll); */
///////////////////////////////
// Selección de elementos
const imgContainer = document.getElementById('s9-image');
const textBlocks = document.querySelectorAll('.s9-ind-text');

// Función para cambiar la imagen con un retraso
function updateImageOnScroll() {
  let closestBlock = null;
  let minDistance = window.innerHeight;
  const transitionThreshold = 0.4; // Umbral para el cambio de imagen (40%)

  textBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const blockCenter = rect.top + rect.height / 2; // Centro vertical del bloque
    const distanceToCenter = Math.abs(blockCenter - window.innerHeight / 2);
    
    // Verifica si el bloque ha pasado más allá del umbral para el cambio
    if (distanceToCenter < minDistance && rect.top < window.innerHeight * transitionThreshold) {
      minDistance = distanceToCenter;
      closestBlock = block;
    }
  });

  // Función para obtener solo la ruta relativa de una URL
function getRelativePath(url) {
  const a = document.createElement('a');
  a.href = url;
  return a.pathname;
}

  // Cambia la imagen si se encuentra un bloque visible más cercano al centro
  if (closestBlock) {
    const newImgSrc = closestBlock.getAttribute('data-img');
    /* if (imgContainer.src !== newImgSrc) {
      imgContainer.src = newImgSrc;
    } */
  
     // Comparar las rutas relativas de las imágenes
     const currentImgSrc = getRelativePath(imgContainer.src);
     const newImgRelativeSrc = getRelativePath(newImgSrc);
 
     // Evitar cambios si la imagen ya es la misma
     if (currentImgSrc !== newImgRelativeSrc) {
        console.log("cambiando imagen");
        // Iniciar la transición de la imagen
        isTransitioning = true;
        imgContainer.style.opacity = '0'; // Desvanecer la imagen actual
        imgContainer.style.transform = 'scale(0.95)'; // Reducir un poco la escala
  
        // Usar setTimeout para esperar la transición antes de cambiar la imagen
        setTimeout(() => {
          imgContainer.src = newImgSrc; // Cambiar la imagen
          imgContainer.style.opacity = '1'; // Restaurar opacidad
          imgContainer.style.transform = 'scale(1)'; // Restaurar la escala
          lastChangedImage = newImgSrc; // Actualizar la última imagen cambiada
          isTransitioning = false; // Liberar el bloqueo de transición
        }, 600); // Tiempo debe coincidir con la duración de la transición CSS
      }
  }
}

// Escucha el evento de scroll para actualizar la imagen
window.addEventListener('scroll', updateImageOnScroll);

//////////////////////////////////////////////////////

