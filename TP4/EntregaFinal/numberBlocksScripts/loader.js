document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById('loader');
    const loadingDiv = document.getElementById('box-loader-2');
    const estados = ['Cargando.', 'Cargando..', 'Cargando...'];
    let estadoIndex = 0;
  
    // Generar números aleatorios entre 1 y 5
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const resultado = num1 + num2;
  
    // Actualizar las imágenes y textos de los números
    const load1 = document.querySelector('.load-1');
    const load3 = document.querySelector('.load-3');
    const load5 = document.querySelector('.load-5');
  
    load1.src = `assets/${num1}${num1}-9.svg`; // Cambia la ruta si es necesario
    load1.alt = num1;
    load3.src = `assets/${num2}${num2}-9.svg`;
    load3.alt = num2;
    if (resultado === 10) {
        load5.src = 'assets/10-9.svg'; // Cambia la ruta si es necesario
    } else {
      load5.src = `assets/${resultado}${resultado}-9.svg`; // Cambia según el formato del archivo
      
    }
    load5.alt = resultado;
  
    // Animación de loader y ocultarlo después de 5 segundos
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 5000);
  
    // Animación del texto "Cargando..."
    setInterval(() => {
        loadingDiv.textContent = estados[estadoIndex];
        estadoIndex = (estadoIndex + 1) % estados.length;
    }, 250);
});