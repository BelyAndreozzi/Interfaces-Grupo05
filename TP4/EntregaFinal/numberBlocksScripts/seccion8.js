// Con el evento mousemove detecta si el usuario esta moviendo el cursor. 
// Calcula el centro de la ventana, obtiene la posicion del cursor y con esos valores calcula la profundidad del movimiento.
// Aplica una transformacion al elemento en base a la profundidad, dandole tambien un ligero zoom.
(function () {
    document.addEventListener("mousemove", parallax);
  
    function parallax(e) {
      const elem = document.querySelector("#parallaxS8");
      const windowWidth = window.innerWidth / 2;
      const windowHeight = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
  
      const depthX = (mouseX - windowWidth) * -0.04;
      const depthY = (mouseY - windowHeight) * -0.04;
  
      elem.style.transform = `translate(${depthX}px, ${depthY}px) translate(-50%, -50%) scale(1.1)`;
    }
})();