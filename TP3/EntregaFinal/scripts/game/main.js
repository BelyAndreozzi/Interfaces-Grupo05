document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const menuForm = document.getElementById('menu-form');
    const menuFormContainer = document.querySelector('.menu-form-container');

    //CHECKBOX
 /* 
    const lunaBox1 = document.querySelector('#lunaBox1');
    const lunaBox2 = document.querySelector('#lunaBox2');    
    const rayoBox1 = document.querySelector('#rayoBox1');
    const rayoBox2 = document.querySelector('#rayoBox2');


    let checkboxLuna1 = true;
    let checkboxLuna2 = false;
    let checkboxRayo1 = true;
    let checkboxRayo2 = false;


    lunaBox1.addEventListener('click', (e) => {
        checkboxLuna1 = true;
        checkboxLuna2 = false;
    });

    lunaBox2.addEventListener('click', (e) => {
        checkboxLayo1 = true;
        checkboxLuna2 = false;
    });

    rayoBox1.addEventListener('click', (e) => {
        checkboxRayo1 = true;
        checkboxRayo2 = false;
    });

    rayoBox2.addEventListener('click', (e) => {
        checkboxRayo1 = true;
        checkboxRayo2 = false;
    });

    */

    // Crear las imágenes y asignar sus fuentes
    const imgJugador1 = new Image();
    imgJugador1.src = "src/misc/luna2.jpg";

    const imgJugador2 = new Image();
    imgJugador2.src = "src/misc/rayo2.jpg";

    const imgTablero = new Image();
    imgTablero.src = "src/game/galaxia3.avif";
    



    // Cargar las imágenes y luego ejecutar el código del juego
    let imagesLoaded = 0;

    // Función para verificar si todas las imágenes se han cargado
    const checkImagesLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            console.log("Todas las imágenes se han cargado");

            // Enviar el formulario, ocultarlo y ejecutar el juego
            menuForm.addEventListener('submit', function (event) {
                event.preventDefault();

                // Se traen los datos ingresados en el formulario.

                const formData = new FormData(menuForm);

                const xEnLinea = formData.get('board-size'); // Tamaño del tablero
                const gameDuration = formData.get('game-duration'); // Duración de la partida
                const player1Name = formData.get('player1-name'); // Nombre del Jugador 1
                const player2Name = formData.get('player2-name'); // Nombre del Jugador 2
                


                menuFormContainer.style.display = 'none';

                iniciarJuego(xEnLinea, player1Name, player2Name, gameDuration);

                
            });
        }
    };

    function iniciarJuego(xEnLinea, player1Name, player2Name, gameDuration) {
        // Instanciar el juego y configurar el tablero
        const game = new Game(ctx, canvas, imgJugador1, imgJugador2, gameDuration, xEnLinea);
        game.getTablero().setImgTablero(imgTablero);

        // Dibujar el tablero y las fichas inicialmente
        game.draw();

        // Agregar eventos del ratón para las interacciones
        canvas.addEventListener('mousedown', (e) => {
            game.seleccionarFicha(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mousemove', (e) => {
            game.moverFicha(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mouseup', (e) => {
            game.soltarFicha(e.offsetX, e.offsetY);
        });
    }

    // Agregar eventos onload para las imágenes
    imgJugador1.onload = checkImagesLoaded;
    imgJugador2.onload = checkImagesLoaded;
    imgTablero.onload = checkImagesLoaded;
});











