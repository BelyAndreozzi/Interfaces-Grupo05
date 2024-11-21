// Se generan dos números aleatorios (correspondiente a un personaje) y se suman para obtener el resultado final. Se cambian las imágenes según los 3 personajes. Después de 5 segundos, el loader "sube" desapareciendo. 

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById('loader');
    const loadingDiv = document.getElementById('box-loader-2');
    const estados = ['Cargando.', 'Cargando..', 'Cargando...'];
    let estadoIndex = 0;

    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const resultado = num1 + num2;

    const load1 = document.querySelector('.load-1');
    const load3 = document.querySelector('.load-3');
    const load5 = document.querySelector('.load-5');

    load1.src = `assets/${num1}${num1}-9.svg`;
    load1.alt = num1;
    load3.src = `assets/${num2}${num2}-9.svg`;
    load3.alt = num2;
    if (resultado === 10) {
        load5.src = 'assets/10-9.svg'; o
    } else {
        load5.src = `assets/${resultado}${resultado}-9.svg`;
    }
    load5.alt = resultado;

    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 5000);

    setInterval(() => {
        loadingDiv.textContent = estados[estadoIndex];
        estadoIndex = (estadoIndex + 1) % estados.length;
    }, 250);
});