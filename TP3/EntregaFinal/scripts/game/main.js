/* import { Game } from 'Juego.js'; */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let imgJugador1 = new Image();
imgJugador1.src = "src/misc/luna2.jpg";
let imgJugador2 = new Image();
imgJugador2.src = "src/misc/rayo2.jpg";

imgJugador1.onload = () => {
    imgJugador2.onload = () => {
        const game = new Game(ctx, canvas, imgJugador1, imgJugador2);

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
    };
};
