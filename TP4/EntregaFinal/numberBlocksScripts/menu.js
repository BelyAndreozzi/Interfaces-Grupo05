document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu li');
  
    // Asigna indices a cada item para la animacion escalonada
    menuItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  });