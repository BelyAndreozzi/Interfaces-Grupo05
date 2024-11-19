document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu li');
  
    // Asignar índices a cada ítem para la animación escalonada
    menuItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  });