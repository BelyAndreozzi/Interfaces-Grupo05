// Asigna indices a cada item para la animacion escalonada.
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu li');
  
    menuItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  });