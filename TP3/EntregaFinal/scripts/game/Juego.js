class Game {
    constructor(ctx, canvas, imgJugador1, imgJugador2, tiempo, xEnLinea) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.tiempo = tiempo;
        this.xEnLinea = xEnLinea;
        this.tablero = new Tablero(ctx, xEnLinea, 70);
        this.imgJugador1 = imgJugador1;
        this.imgJugador2 = imgJugador2;
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.timer = new Timer(tiempo, ctx, this);
        this.jugadorActual = 1;
        this.fichaSeleccionada = null;
        this.isMouseDown = false;
        this.backgroundImage;

        // Crea fichas para ambos jugadores
        this.inicializarFichas();

    }



    inicializarFichas() {
        let fichasXJugador = (this.tablero.getColumnas() * this.tablero.getFilas() / 2);
        // Ajustes de posición para centrar las columnas de fichas en cada lado del tablero
        const canvasWidth = this.canvas.width;
        const tableroWidth = this.tablero.getColumnas() * this.tablero.getTamanoCelda();
        const startX = (canvasWidth - tableroWidth) / 2;
        // Posiciones de las fichas a la izquierda y derecha del tablero
        const posicionXJugador1 = startX - 90; // Ajusta para la distancia deseada desde el tablero
        const posicionXJugador2 = startX + tableroWidth + 90;

        // Distribuye las fichas de ambos jugadores verticalmente
        for (let i = 0; i < fichasXJugador; i++) {
            const posicionY = 150 + (i * 20);
            this.fichasJugador1.push(new Ficha(posicionXJugador1, posicionY, this.ctx, 30, this.imgJugador1));
            this.fichasJugador2.push(new Ficha(posicionXJugador2, posicionY, this.ctx, 30, this.imgJugador2));
        }
    }

    // Dibuja el tablero y las fichas
    draw() {
        this.crearFondo();
        this.clearCanvas();
        this.timer.drawTimer();
        this.tablero.draw();

        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.draw());

        this.drawTurn();
        this.drawZonaCaida();
        this.drawBotones(1160, 90, 20);

    }

    crearFondo(){
        // let backgroundImage = new Image ();
        // backgroundImage.src = "src/game/backgroundNight.jpg";
        let pattern = this.ctx.createPattern(this.backgroundImage, "no-repeat");
        this.ctx.fillStyle = pattern; 
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setBackgroundImage(img){
        this.backgroundImage = img;
    }
    

    clearCanvas() {

        this.crearFondo();
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    }

    drawZonaCaida() {
        // Calcula las coordenadas de la zona de caída según el tablero
        const zonaDeCaidaTop = this.tablero.getStartY() - 80;
        const zonaDeCaidaBottom = this.tablero.getStartY();
        const zonaDeCaidaLeft = this.tablero.getStartX();
        const zonaDeCaidaRight = this.tablero.getStartX() + this.tablero.columnas * this.tablero.tamanoCelda;

        const zonaDeCaidaWidth = zonaDeCaidaRight - zonaDeCaidaLeft;
        const zonaDeCaidaHeight = zonaDeCaidaBottom - zonaDeCaidaTop;

        // Dibuja el área de la zona de caída
        this.ctx.save();
        this.ctx.fillStyle = "rgba(1, 1, 1, 0.3)"; //
        this.ctx.fillRect(zonaDeCaidaLeft, zonaDeCaidaTop, zonaDeCaidaWidth, zonaDeCaidaHeight);
        this.ctx.restore();
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
            this.fichaSeleccionada.setPosition(x, y);
            this.draw();
        }
    }

    soltarFicha(x, y) {
        let ultimoJugador;

        if (this.fichaSeleccionada) {
            // Define las coordenadas de la zona de caída según el tablero
            const zonaDeCaidaTop = this.tablero.getStartY() - 80;
            const zonaDeCaidaBottom = this.tablero.getStartY();
            const zonaDeCaidaLeft = this.tablero.getStartX();
            const zonaDeCaidaRight = this.tablero.getStartX() + this.tablero.columnas * this.tablero.tamanoCelda;

            // Verifica si la ficha fue soltada dentro de la zona de caída
            if (y >= zonaDeCaidaTop && y <= zonaDeCaidaBottom && x >= zonaDeCaidaLeft && x <= zonaDeCaidaRight) {
                // Calcula la columna según la posición en x
                const columna = Math.floor((x - zonaDeCaidaLeft) / this.tablero.tamanoCelda);

                // Verifica si la columna está dentro del rango válido
                if (columna >= 0 && columna < this.tablero.columnas) {
                    // Obtiene la fila disponible en esa columna
                    const fila = this.tablero.verificarColumna(columna);

                    if (fila !== -1) { // Si hay espacio en la columna
                        // Calcula la posición objetivo en el canvas donde debe caer la ficha
                        const targetX = zonaDeCaidaLeft + columna * this.tablero.tamanoCelda + this.tablero.tamanoCelda / 2;
                        const targetY = this.tablero.startY + fila * this.tablero.tamanoCelda + this.tablero.tamanoCelda / 2;

                        // Llama a la animación de caída con gravedad
                        this.startFallingAnimation(targetX, targetY, () => {
                            // Esta función callback se ejecuta al finalizar la animación de caída
                            // Coloca la ficha en la matriz lógica del tablero
                            this.tablero.colocarFicha(fila, columna, this.jugadorActual);

                            // Marca la ficha como colocada
                            this.fichaSeleccionada.setColocado();


                            // Cambia el turno después de colocar la ficha
                            ultimoJugador = this.jugadorActual;
                            this.cambiarTurno();

                            // Redibuja el tablero para actualizar el estado
                            // this.draw();
                        });

                        // Libera la ficha seleccionada
                        this.fichaSeleccionada.setResaltado(false);
                        this.fichaSeleccionada = null;

                        /*   */
                    }
                }
                console.log("no soltada");
            } else {
                // Si no está en la zona de caida, devuelve la ficha a su posición original
                const fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
                /* const index =  */fichas.indexOf(this.fichaSeleccionada);
                this.fichaSeleccionada.setPosicionInicial();
            }
            
            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;
            
             
            this.draw();
            // Verifica si hay un ganador después de la colocación
            if (this.hayGanador(ultimoJugador)) {
                console.log("hay ganador");
                this.finalizarJuego();
                this.drawGanador(ultimoJugador);
            }
        }
    }



    startFallingAnimation(targetX, targetY, onComplete) {
        const ficha = this.fichaSeleccionada;

        if (ficha) {
            ficha.enCaida = true;
            ficha.targetY = targetY; // Coordenada Y del objetivo
            ficha.posX = targetX; // Coordenada X fija de la columna correspondiente
            ficha.velY = 0; // Velocidad inicial en Y

            const animate = () => {
                // Aplicación de gravedad en la velocidad
                ficha.velY += 0.5; // Aumenta el valor para más aceleración en Y
                ficha.posY += ficha.velY; // Actualiza la posición Y según la velocidad

                // Verificación para detener la animación al alcanzar `targetY`
                if (ficha.posY >= ficha.targetY) {
                    ficha.posY = ficha.targetY; // Asegura que llegue a la posición final exacta
                    ficha.enCaida = false;
                    ficha.setColocado(); // Marca la ficha como colocada
                    this.draw(); // Dibuja el estado final del tablero
                } else {
                    this.draw(); // Dibuja el estado actual del tablero
                    requestAnimationFrame(animate); // Sigue la animación
                }
            };

            requestAnimationFrame(animate);
            onComplete();
        }
    }



    //TODO Cambiarlo a algo mas eficiente 
    hayGanador(ultimoJugador) {
        let ff = this.tablero.getFilas();
        let cc = this.tablero.getColumnas();
        let mtxTablero = this.tablero.getTablero();
        // Comprobar horizontal
        for (let fila = 0; fila < ff; fila++) {
            for (let col = 0; col < cc - 3; col++) { // Solo necesitamos comprobar hasta la columna 3
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
            for (let fila = 0; fila < ff - 3; fila++) { // Solo necesitamos comprobar hasta la fila 2
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
        for (let fila = 3; fila < ff; fila++) { // Comenzar desde la fila 3
            for (let col = 0; col < cc - 3; col++) { // Solo hasta la columna 3
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
        for (let fila = 0; fila < ff - 3; fila++) { // Solo hasta la fila 2
            for (let col = 0; col < cc - 3; col++) { // Solo hasta la columna 3
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

    // hayGanador(ultimoJugador) {
    //     let filas = this.tablero.getFilas();
    //     let columnas = this.tablero.getColumnas();
    //     let mtxTablero = this.tablero.getTablero();
    
    //     // Comprobar horizontal
    //     for (let fila = 0; fila < filas; fila++) {
    //         for (let col = 0; col <= columnas - this.xEnLinea; col++) { 
    //             let cuenta = 0;
    //             for (let k = 0; k < this.xEnLinea; k++) {
    //                 if (mtxTablero[fila][col + k] === ultimoJugador) cuenta++;
    //                 else break;
    //             }
    //             if (cuenta === this.xEnLinea) return true;
    //         }
    //     }
    
    //     // Comprobar vertical
    //     for (let col = 0; col < columnas; col++) {
    //         for (let fila = 0; fila <= filas - this.xEnLinea; fila++) {
    //             let cuenta = 0;
    //             for (let k = 0; k < this.xEnLinea; k++) {
    //                 if (mtxTablero[fila + k][col] === ultimoJugador) cuenta++;
    //                 else break;
    //             }
    //             if (cuenta === this.xEnLinea) return true;
    //         }
    //     }
    
    //     // Comprobar diagonal (de abajo-izquierda a arriba-derecha)
    //     for (let fila = this.xEnLinea - 1; fila < filas; fila++) {
    //         for (let col = 0; col <= columnas - this.xEnLinea; col++) {
    //             let cuenta = 0;
    //             for (let k = 0; k < this.xEnLinea; k++) {
    //                 if (mtxTablero[fila - k][col + k] === ultimoJugador) cuenta++;
    //                 else break;
    //             }
    //             if (cuenta === this.xEnLinea) return true;
    //         }
    //     }
    
    //     // Comprobar diagonal (de arriba-izquierda a abajo-derecha)
    //     for (let fila = 0; fila <= filas - this.xEnLinea; fila++) {
    //         for (let col = 0; col <= columnas - this.xEnLinea; col++) {
    //             let cuenta = 0;
    //             for (let k = 0; k < this.xEnLinea; k++) {
    //                 if (mtxTablero[fila + k][col + k] === ultimoJugador) cuenta++;
    //                 else break;
    //             }
    //             if (cuenta === this.xEnLinea) return true;
    //         }
    //     }
    
    //     // Si no hay victoria
    //     return false;
    // }


    finalizarJuego() {
        console.log("finalizar juego")
        this.timer.setPausa(true);
        this.inhabilitarFichas();
    }

    drawGanador(ultimoJugador) {
        const turnoTexto = `Ganador jugador ${ultimoJugador}`;
        console.log(turnoTexto)
        
        // Estilo del texto
        this.ctx.font = "24px Play";       // Aumenta el tamaño de la fuente
        this.ctx.fillStyle = "#ffffff";      // Color del texto en blanco
        this.ctx.textAlign = "center";       // Centrado horizontal
        this.ctx.textBaseline = "top";       // Posicionado en la parte superior
        
        
        const posX = (this.canvas.width + (this.tablero.filas)) / 2;
        const posY = this.canvas.height - 100;  // Justo debajo del tablero
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
        console.log("drawGanador")
    }

    drawTurn() {
        const turnoTexto = `Turno del Jugador ${this.jugadorActual}`;
        
        // Estilo del texto
        this.ctx.font = "24px Play";       // Aumenta el tamaño de la fuente
        this.ctx.fillStyle = "#ffffff";      // Color del texto en blanco
        this.ctx.textAlign = "center";       // Centrado horizontal
        this.ctx.textBaseline = "top";       // Posicionado en la parte superior
        
        
        const posX = (this.canvas.width + (this.tablero.filas)) / 2;
        const posY = this.canvas.height - 75;  // Justo debajo del tablero
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
    }

    cambiarTurno() {
        this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
        this.drawTurn();
    }

    getTablero() {
        return this.tablero;
    }

    inhabilitarFichas() {
        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.setColocado());
    }

    /* drawGanador(ganador) {
        console.log("drawGanador", ganador);
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        console.log(centerX, centerY);

        // Fondo semitransparente
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // Fondo del cartel
        const boxWidth = 300;
        const boxHeight = 200;
        this.ctx.save();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
        this.ctx.restore(); 


        // Texto de ganador
        this.ctx.save();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${ganador} ha ganado!`, centerX, centerY - 40);
        this.ctx.restore();

        // Botón de reiniciar
        this.ctx.save();
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(centerX - 100, centerY + 10, 80, 40);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText('Reiniciar', centerX - 60, centerY + 35);
        this.ctx.restore();

        // Botón de volver al menú
        this.ctx.save();
        this.ctx.fillStyle = '#f44336';
        this.ctx.fillRect(centerX + 20, centerY + 10, 80, 40);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText('Menú', centerX + 60, centerY + 35);
        this.ctx.restore();

        // Guarda las coordenadas de los botones para detectar clics
        this.restartButton = { x: centerX - 100, y: centerY + 10, width: 80, height: 40 };
        this.menuButton = { x: centerX + 20, y: centerY + 10, width: 80, height: 40 };
    }

    handleVictoryClick(x, y) {
        if (this.isInsideButton(x, y, this.restartButton)) {
            this.reiniciarJuego();
        } else if (this.isInsideButton(x, y, this.menuButton)) {
            this.volverAlMenu();
        }
    }

    isInsideButton(x, y, button) {
        return x >= button.x && x <= button.x + button.width &&
               y >= button.y && y <= button.y + button.height;
    } */

    reiniciarJuego(x, y) {
        // Reiniciar lógica del juego aquí
        if(this.isPointerOnResetButton(x, y)){
            console.log("reiniciar juego"); 
            this.clearCanvas();
            this.tablero.clearTablero();
            this.fichasJugador1 = [];
            this.fichasJugador2 = [];
            this.timer.resetTimer();
            this.jugadorActual = 1;
            this.fichaSeleccionada = null;
            this.isMouseDown = false; 
    
            // Crea fichas para ambos jugadores
            this.inicializarFichas();
            this.draw();
        }

    }

    volverAlMenu() {
        // Lógica para volver al menú de configuración aquí
    }

    drawBotones(x, y, radius) {
        const buttonColor = "#ff5733";

        // Dibuja el boton de reinciar y el boton de menú

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();


        this.ctx.beginPath();
        this.ctx.arc(x - 50, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = buttonColor;
        this.ctx.fill();
        this.ctx.closePath();

    }

    isPointerOnResetButton(x, y) {
        let posX = 1160;
        let posY = 90;
        let radius = 20;
        let _x = posX - x;
        let _y = posY - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < radius;
        return resultado;
    }

    isPointerOnMenuButton(x, y) {
        let posX = 1110;
        let posY = 90;
        let radius = 20;
        let _x = posX - x;
        let _y = posY - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < radius;
        return resultado;

    }

}
