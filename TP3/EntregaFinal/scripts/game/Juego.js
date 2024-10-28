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
        // Ajustes de posición para centrar las columnas de fichas en cada lado del tablero
        const canvasWidth = 1205;
        const tableroWidth = this.tablero.getColumnas() * this.tablero.getTamanoCelda();
        const startX = (canvasWidth - tableroWidth) / 2;
        // Posiciones de las fichas a la izquierda y derecha del tablero
        const posicionXJugador1 = startX - 50; // Ajusta para la distancia deseada desde el tablero
        const posicionXJugador2 = startX + tableroWidth + 50;
    
        // Distribuye las fichas de ambos jugadores verticalmente
        for (let i = 0; i < 10; i++) {
            const posicionY = 150 + (i * 40);
            this.fichasJugador1.push(new Ficha(posicionXJugador1, posicionY, this.ctx, 40, this.imgJugador1));
            this.fichasJugador2.push(new Ficha(posicionXJugador2, posicionY, this.ctx, 40, this.imgJugador2));
        }
    }

    // inicializarFichas() {
    //     for (let i = 0; i < 10; i++) {
    //         this.fichasJugador1.push(new Ficha(100, 100 + (i * 30), this.ctx, 22, this.imgJugador1));
    //         this.fichasJugador2.push(new Ficha(900, 100 + (i * 30), this.ctx, 22, this.imgJugador2));
    //     }
    // }

    // Dibuja el tablero y las fichas
    draw() {
        this.clearCanvas();
        this.tablero.draw();

        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.draw());

        this.drawTurn();
    }

    clearCanvas() {
        this.ctx.fillStyle = "#1C1F3E";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    seleccionarFicha(x, y) {
        let fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
        for (let ficha of fichas) {
            if (ficha.isPointInside(x, y) && !ficha.isColocado()) {
                ficha.setResaltado(true);
                this.fichaSeleccionada = ficha;
                return;
            }
        }
    }

    moverFicha(x, y) {
        if (this.fichaSeleccionada && !this.fichaSeleccionada.isColocado()) {
            console.log(this.fichaSeleccionada.isColocado());
            this.fichaSeleccionada.setPosition(x, y);
            this.draw();
        }
    }

    soltarFicha(x, y) {
        let ultimoJugador;
        if (this.fichaSeleccionada) {
            const zonaDeCaidaTop = this.tablero.getStartY() - 40;
            console.log(this.tablero.getStartY())
            const zonaDeCaidaBottom = this.tablero.getStartY();
            const zonaDeCaidaLeft = this.tablero.getStartX();
            const zonaDeCaidaRight = this.tablero.getStartX() + this.tablero.columnas * this.tablero.tamanoCelda;

            // const zonaDeCaidaTop = 20;
            // const zonaDeCaidaBottom = 50;
            // const zonaDeCaidaLeft = 150;
            // const zonaDeCaidaRight = zonaDeCaidaLeft + this.tablero.columnas * this.tablero.tamanoCelda;

            if (y >= zonaDeCaidaTop && y <= zonaDeCaidaBottom && x >= zonaDeCaidaLeft && x <= zonaDeCaidaRight) {
                let columna = Math.floor((x - zonaDeCaidaLeft) / this.tablero.tamanoCelda);

                if (columna >= 0 && columna < this.tablero.columnas) {
                    let fila = this.tablero.verificarColumna(columna);
                    if (fila !== -1) {
                        // Coloca la ficha en la celda más baja de la columna
                        this.tablero.colocarFicha(fila, columna, this.jugadorActual);

                        // Calcula la posición en el canvas donde debe caer la ficha
                        const posX = zonaDeCaidaLeft + columna * this.tablero.tamanoCelda + this.tablero.tamanoCelda / 2;
                        const posY = this.tablero.startY + fila * this.tablero.tamanoCelda + this.tablero.tamanoCelda / 2;

                        // Actualiza la posición de la ficha para que se dibuje en la celda correspondiente
                        this.fichaSeleccionada.setPosition(posX, posY);
                        this.fichaSeleccionada.setColocado();

                        
                        ultimoJugador = this.jugadorActual;
                        // Cambia de turno
                        this.cambiarTurno();
                    }
                }
            } else {
                // Si no está en la zona de caida, devuelve la ficha a su posición original
                const fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
                const index = fichas.indexOf(this.fichaSeleccionada);
                this.fichaSeleccionada.setPosicionInicial();
            }
            
            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;
            this.draw();

            
            
            if(this.hayGanador(ultimoJugador)){
                this.drawGanador(ultimoJugador);
                this.finalizarJuego();
            }
            ///////
        }
    }

    //TODO Cambiarlo a algo mas eficiente 
    hayGanador(ultimoJugador) {
        let ff = this.tablero.getFilas();
        let cc = this.tablero.getColumnas();
        let mtxTablero = this.tablero.getTablero();
        console.log(ff);
        console.log("COL" + cc);
        console.log(ultimoJugador);
        // Comprobar horizontal
        for (let fila = 0; fila < ff; fila++) {
            for (let col = 0; col < cc-3; col++) { // Solo necesitamos comprobar hasta la columna 3
                console.log(mtxTablero[fila][col]);
                if (
                    mtxTablero[fila][col] === ultimoJugador &&
                    mtxTablero[fila][col + 1] === ultimoJugador &&
                    mtxTablero[fila][col + 2] === ultimoJugador &&
                    mtxTablero[fila][col + 3] === ultimoJugador
                ) {
                    return true;
                }
            }
        }
    
        // Comprobar vertical
        for (let col = 0; col < cc; col++) {
            for (let fila = 0; fila < ff -3; fila++) { // Solo necesitamos comprobar hasta la fila 2
                if (
                    mtxTablero[fila][col] === ultimoJugador &&
                    mtxTablero[fila + 1][col] === ultimoJugador &&
                    mtxTablero[fila + 2][col] === ultimoJugador &&
                    mtxTablero[fila + 3][col] === ultimoJugador
                ) {
                    return true;
                }
            }
        }
    
        // Comprobar diagonal (de abajo-izquierda a arriba-derecha)
        for (let fila = 0; fila < ff; fila++) { // Comenzar desde la fila 3
            for (let col = 0; col < cc -3; col++) { // Solo hasta la columna 3
                if (
                    mtxTablero[fila][col] === ultimoJugador &&
                    mtxTablero[fila - 1][col + 1] === ultimoJugador &&
                    mtxTablero[fila - 2][col + 2] === ultimoJugador &&
                    mtxTablero[fila - 3][col + 3] === ultimoJugador
                ) {
                    return true;
                }
            }
        }
    
        // Comprobar diagonal (de arriba-izquierda a abajo-derecha)
        for (let fila = 0; fila < ff; fila++) { // Solo hasta la fila 2
            for (let col = 0; col < cc-3; col++) { // Solo hasta la columna 3
                if (
                    mtxTablero[fila][col] === ultimoJugador &&
                    mtxTablero[fila + 1][col + 1] === ultimoJugador &&
                    mtxTablero[fila + 2][col + 2] === ultimoJugador &&
                    mtxTablero[fila + 3][col + 3] === ultimoJugador
                ) {
                    return true;
                }
            }
        }

    
        // Si no hay victoria
        return false;
    }


    finalizarJuego(){
        if (this.hayGanador()){
            
        }
    }

    drawGanador(ultimoJugador) {
        const turnoTexto = `Ganador Jugador ${ultimoJugador}`;
        
        // Estilo del texto
        this.ctx.font = "24px Play";       // Aumenta el tamaño de la fuente
        this.ctx.fillStyle = "#ffffff";      // Color del texto en blanco
        this.ctx.textAlign = "center";       // Centrado horizontal
        this.ctx.textBaseline = "top";       // Posicionado en la parte superior


        const posX = 350;
        const posY = 70 + this.tablero.filas * this.tablero.tamanoCelda + 30;  // Justo debajo del tablero
        
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
    }

    drawTurn() {
        const turnoTexto = `Turno del Jugador ${this.jugadorActual}`;
        
        // Estilo del texto
        this.ctx.font = "24px Play";       // Aumenta el tamaño de la fuente
        this.ctx.fillStyle = "#ffffff";      // Color del texto en blanco
        this.ctx.textAlign = "center";       // Centrado horizontal
        this.ctx.textBaseline = "top";       // Posicionado en la parte superior


        const posX = 350;
        const posY = 50 + this.tablero.filas * this.tablero.tamanoCelda + 30;  // Justo debajo del tablero
        
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
    }

    cambiarTurno() {
        this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
        this.drawTurn();
    }

}
