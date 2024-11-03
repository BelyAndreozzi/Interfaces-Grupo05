class Game {
    constructor(ctx, canvas, imgJugador1, imgJugador2, tiempo, xEnLinea, habilitado) {
        this.nombre = "juego";
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
        this.habilitado = habilitado;
        this.homeMenu;
        this.flechaRestart;
        // Crea fichas para ambos jugadores
        this.inicializarFichas();
        this.fichasTotales = this.fichasJugador1.length + this.fichasJugador2.length;
        this.fichasSoltadas = 0;
    }



    inicializarFichas() {
        const fichasXJugador = (this.tablero.getColumnas() * this.tablero.getFilas()) / 2;
        const canvasWidth = this.canvas.width;
        const tableroWidth = this.tablero.getColumnas() * this.tablero.getTamanoCelda();
        const startX = (canvasWidth - tableroWidth) / 2;

        // Distancia desde el tablero y entre columnas de fichas
        const distFromBoard = 70;
        const columnSpacing = 60;
        const posicionXJugador1Base = startX - distFromBoard;
        const posicionXJugador2Base = startX + tableroWidth + distFromBoard;

        // Determina el número de columnas laterales y ajusta el espacio vertical según el número de fichas
        let numColumns = 1;
        let espacioVertical = 30;
        let posicionYInicial = 100; // Posición Y inicial ajustada para más espacio

        if (fichasXJugador > 21) {
            numColumns = 2;
            posicionYInicial = 150; // Posición Y inicial para más de 21 fichas
        }
        if (fichasXJugador > 36) {
            numColumns = 3;
        }

        // Distribución de fichas en las columnas
        for (let i = 0; i < fichasXJugador; i++) {
            const columnaActual = i % numColumns;
            const posicionXJugador1 = posicionXJugador1Base - (columnaActual * columnSpacing);
            const posicionXJugador2 = posicionXJugador2Base + (columnaActual * columnSpacing);
            const posicionY = posicionYInicial + (Math.floor(i / numColumns) * espacioVertical);

            this.fichasJugador1.push(new Ficha(posicionXJugador1, posicionY, this.ctx, 30, this.imgJugador1));
            this.fichasJugador2.push(new Ficha(posicionXJugador2, posicionY, this.ctx, 30, this.imgJugador2));
        }
    }
    // Dibuja el tablero, fichas, timer, zona de caida y botones.
    draw() {
        this.clearCanvas();
        this.crearFondo();
        this.timer.drawTimer();
        this.tablero.draw();
        this.tablero.drawZonaCaida();


        this.fichasJugador1.forEach(ficha => ficha.draw(this.jugadorActual, 1));
        this.fichasJugador2.forEach(ficha => ficha.draw(this.jugadorActual, 2));

        this.drawBoton(1130, 30, 22, this.homeMenu);
        this.drawBoton(1180, 30, 22, this.flechaRestart);

    }

    crearFondo() {
        let pattern = this.ctx.createPattern(this.backgroundImage, "no-repeat");
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setBackgroundImage(img) {
        this.backgroundImage = img;
    }

    setFlechaRestart(img) {
        this.flechaRestart = img;
    }

    setHomeMenu(img) {
        this.homeMenu = img;
    }

    clearCanvas() {
        this.crearFondo();
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
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

    isFichasSeleccionadas(x, y) {
        let fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
        for (let ficha of fichas) {
            if (ficha.isPointInside(x, y) && !ficha.isColocado()) {
                return true;
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
        let columna;
        let fila;
        let ultimoJugador;


        if (this.fichaSeleccionada) {
            // Define las coordenadas de la zona de caída según el tablero
            const zonaDeCaidaTop = this.tablero.getTopZC();
            const zonaDeCaidaBottom = this.tablero.getBottomZC();
            const zonaDeCaidaLeft = this.tablero.getLeftZC();
            const zonaDeCaidaRight = this.tablero.getRightZC();

            // Verifica si la ficha fue soltada dentro de la zona de caída
            if (y >= zonaDeCaidaTop && y <= zonaDeCaidaBottom && x >= zonaDeCaidaLeft && x <= zonaDeCaidaRight) {
                // Calcula la columna según la posición en x
                columna = Math.floor((x - zonaDeCaidaLeft) / this.tablero.tamanoCelda);

                // Verifica si la columna está dentro del rango válido
                if (columna >= 0 && columna < this.tablero.columnas) {
                    // Obtiene la fila disponible en esa columna
                    fila = this.tablero.verificarColumna(columna);

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
                            this.fichasSoltadas++;
                        });

                        // Verifica si hay un ganador después de la colocación
                        if (this.hayGanador(ultimoJugador, columna, fila)) {
                            this.finalizarJuego();
                            setTimeout(() => {
                                this.drawGanador(ultimoJugador);
                            }, 1000);
                        }


                        if (this.fichasSoltadas === this.fichasTotales) {
                            this.finalizarJuego(),
                                setTimeout(() =>
                                    this.drawEmpate()
                                    , 1000);
                        }
                    }
                }
            } else {
                // Si no está en la zona de caida, devuelve la ficha a su posición original
                const fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
                fichas.indexOf(this.fichaSeleccionada);
                this.fichaSeleccionada.setPosicionInicial();
            }

            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;

            this.draw();
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



    hayGanador(jugador, columna, fila) {
        return (
            this.verificarHorizontal(jugador, fila, columna) ||
            this.verificarVertical(jugador, fila, columna) ||
            this.verificarDiagonalPrincipal(jugador, fila, columna) ||
            this.verificarDiagonalSecundaria(jugador, fila, columna)
        );
    }

    verificarHorizontal(jugador, fila, columna) {
        let conteo = 1;

        // Izquierda
        for (let c = columna - 1; c >= 0 && this.tablero.tablero[fila][c] === jugador; c--) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        // Derecha
        for (let c = columna + 1; c < this.tablero.columnas && this.tablero.tablero[fila][c] === jugador; c++) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        return false;
    }

    verificarVertical(jugador, fila, columna) {
        let conteo = 1;

        // Abajo
        for (let f = fila + 1; f < this.tablero.filas && this.tablero.tablero[f][columna] === jugador; f++) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        return false;
    }

    verificarDiagonalPrincipal(jugador, fila, columna) {
        let conteo = 1;

        // Arriba-Izquierda
        for (let f = fila - 1, c = columna - 1; f >= 0 && c >= 0 && this.tablero.tablero[f][c] === jugador; f--, c--) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        // Abajo-Derecha
        for (let f = fila + 1, c = columna + 1; f < this.tablero.filas && c < this.tablero.columnas && this.tablero.tablero[f][c] === jugador; f++, c++) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        return false;
    }

    verificarDiagonalSecundaria(jugador, fila, columna) {
        let conteo = 1;

        // Arriba-Derecha
        for (let f = fila - 1, c = columna + 1; f >= 0 && c < this.tablero.columnas && this.tablero.tablero[f][c] === jugador; f--, c++) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        // Abajo-Izquierda
        for (let f = fila + 1, c = columna - 1; f < this.tablero.filas && c >= 0 && this.tablero.tablero[f][c] === jugador; f++, c--) {
            conteo++;
            if (conteo >= this.xEnLinea) return true;
        }

        return false;
    }


    finalizarJuego() {
        this.timer.setPausa(true);
        this.inhabilitarFichas();
    }

    drawEmpate() {
        // Aplica opacidad al contexto
        this.ctx.save();
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillStyle = "#000000";  // Fondo negro con opacidad
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();  // Restaura alpha para los siguientes elementos

        // Texto de victoria
        this.ctx.font = "36px Play";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`¡Empate!`, this.canvas.width / 2, this.canvas.height / 2);


        // Botones 
        this.drawBoton(1130, 30, 22, this.homeMenu);
        this.drawBoton(1180, 30, 22, this.flechaRestart);
    };


    drawGanador(jugador) {
        // Aplica opacidad al contexto
        this.ctx.save();
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillStyle = "#000000";  // Fondo negro con opacidad
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();  // Restaura alpha para los siguientes elementos

        // Configuración de la imagen central de victoria
        const imagenGanador = new Image();
        if (jugador === 1) {
            imagenGanador.src = "src/game/luna2recortado.png";  // Reemplaza con la ruta de tu imagen
        } else {
            imagenGanador.src = "src/game/rayo2recortado.png";  // Reemplaza con la ruta de tu imagen
        }
        imagenGanador.onload = () => {
            const imgWidth = imagenGanador.naturalWidth / 2;
            const imgHeight = imagenGanador.naturalHeight / 2;

            const imgX = (this.canvas.width - imgWidth) / 2;
            const imgY = (this.canvas.height - imgHeight) / 2 - 50;


            this.ctx.drawImage(imagenGanador, imgX, imgY, imgWidth, imgHeight);

            // Texto de victoria
            this.ctx.font = "36px Play";
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.textAlign = "center";
            if (jugador === 1) {
                this.ctx.fillText(`¡Ganó Luna!`, this.canvas.width / 2, imgY + imgHeight + 50);
            } else {
                this.ctx.fillText(`¡Ganó Rayo!`, this.canvas.width / 2, imgY + imgHeight + 50);
            }

            // Botones 
            this.drawBoton(1130, 30, 22, this.homeMenu);
            this.drawBoton(1180, 30, 22, this.flechaRestart);
        };
    }

    cambiarTurno() {
        this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
    }

    getTablero() {
        return this.tablero;
    }

    inhabilitarFichas() {
        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.setColocado());
    }

    reiniciarJuego(x, y) {
        // Reiniciar lógica del juego aquí
        if (this.isPointerOnResetButton(x, y)) {
            this.clearCanvas();
            this.tablero.clearTablero();
            this.fichasJugador1 = [];
            this.fichasJugador2 = [];
            this.timer.resetTimer();
            this.timer.pausa = false;
            this.timer.empate = false;
            this.jugadorActual = 1;
            this.fichaSeleccionada = null;
            this.isMouseDown = false;
            this.fichasSoltadas = 0;

            // Crea fichas para ambos jugadores
            this.inicializarFichas();
            this.draw();
        }

    }

    volverAlMenu(x, y) {
        if (this.isPointerOnMenuButton(x, y)) {
            this.timer.borrarIntervalo();
            this.isHabilitado = false;
            this.fichasSoltadas = 0;
            loadMain();
        }
    }

    // Dibuja el boton de reinciar y el boton de menú
    drawBoton(x, y, radius, img) {
        let color = "rgb(250, 252, 117)"
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.drawImage(img, x - 17, y - 18, 35, 35);
        this.ctx.closePath();

    }

    isPointerOnResetButton(x, y) {
        let posX = 1180;
        let posY = 30;
        let radius = 20;
        let _x = posX - x;
        let _y = posY - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < radius;
        return resultado;
    }

    isPointerOnMenuButton(x, y) {
        let posX = 1130;
        let posY = 30;
        let radius = 20;
        let _x = posX - x;
        let _y = posY - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < radius;
        return resultado;

    }


    isHabilitado() {
        return this.habilitado;
    }
    setHabilitado(habilitado) {
        this.habilitado = habilitado;
    }

}
