/* import { Tablero } from './Tablero.js';
import { Ficha } from './Ficha.js';

export */ class Game {
    constructor(ctx, canvas, imgJugador1, imgJugador2) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.tablero = new Tablero(ctx);
        this.imgJugador1 = imgJugador1;
        this.imgJugador2 = imgJugador2;
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.jugadorActual = 1;
        this.fichaSeleccionada = null;
        this.isMouseDown = false;

        // Crea fichas para ambos jugadores
        this.inicializarFichas();
    }

    inicializarFichas() {
        for (let i = 0; i < 10; i++) {
            this.fichasJugador1.push(new Ficha(100, 100 + (i * 30), this.ctx, 20, this.imgJugador1));
            this.fichasJugador2.push(new Ficha(900, 100 + (i * 30), this.ctx, 20, this.imgJugador2));
        }
    }

    // Dibuja el tablero y las fichas
    draw() {
        this.clearCanvas();
        this.tablero.draw();

        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.draw());
    }

    clearCanvas() {
        this.ctx.fillStyle = "#1C1F3E";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    seleccionarFicha(x, y) {
        let fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
        for (let ficha of fichas) {
            if (ficha.isPointInside(x, y)) {
                ficha.setResaltado(true);
                this.fichaSeleccionada = ficha;
                return;
            }
        }
    }

    moverFicha(x, y) {
        if (this.fichaSeleccionada) {
            this.fichaSeleccionada.setPosition(x, y);
            this.draw();
        }
    }

    soltarFicha(x, y) {
        if (this.fichaSeleccionada) {
            let columna = Math.floor((x - 150) / this.tablero.tamanoCelda);

            if (columna >= 0 && columna < this.tablero.columnas) {
                let fila = this.tablero.verificarColumna(columna);
                if (fila !== -1) {
                    this.tablero.colocarFicha(fila, columna, this.jugadorActual);
                    this.cambiarTurno();
                }
            }

            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;
            this.draw();
        }
    }

    cambiarTurno() {
        this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
    }

}
