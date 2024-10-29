const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


let imgJugador1 = new Image();
imgJugador1.src = "src/misc/luna2.jpg";

let imgJugador2 = new Image();
imgJugador2.src = "src/misc/rayo2.jpg";

let imgTablero = new Image();
imgTablero.src = "src/game/galaxia3.avif";







imgJugador1.onload = () => {
    imgJugador2.onload = () => {
        imgTablero.onload = () => {
            const game = new Game(ctx, canvas, imgJugador1, imgJugador2, 120);

            game.getTablero().setImgTablero(imgTablero);

            // Dibuja el tablero y las fichas inicialmente
            game.draw();

            // Eventos del ratón
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
    };
};


// Crear una instancia de la clase y establecer posición y duración
/* const contador1 = new ContadorDeTiempo(ctx, 60, canvas.width / 10, canvas.height / 10);
contador1.iniciar();
 */