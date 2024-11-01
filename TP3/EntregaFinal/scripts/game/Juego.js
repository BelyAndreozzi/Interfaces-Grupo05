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
        this.flechaBack = null;
        this.flechaRestart = null;
        this.crearImagenesBotones();
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
        this.clearCanvas();
        this.crearFondo();
        this.timer.drawTimer();
        this.tablero.draw();
        this.tablero.drawZonaCaida();

        /* [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.draw(this.jugadorActual)); */
        this.fichasJugador1.forEach(ficha => ficha.draw(this.jugadorActual, 1));
        this.fichasJugador2.forEach(ficha => ficha.draw(this.jugadorActual, 2));


/*         const flechaBack = new Image();
        flechaBack.src = "src/game/backmenu.png";
    
        const flechaRestart = new Image();
        flechaRestart.src = "src/game/reset.png"; */

        this.drawBoton(1130, 30, 20, this.flechaBack, "white");    
        this.drawBoton(1180, 30, 20, this.flechaRestart, "black");   

    }

    crearImagenesBotones() {
        let flechaBack = new Image();
        flechaBack.src = "src/game/backmenu.png";
    
        let flechaRestart = new Image();
        flechaRestart.src = "src/game/reset.png";

        this.flechaBack = flechaBack;
        this.flechaRestart = flechaRestart
    }

    crearFondo(){
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

                            
                        });

                    }
                }
                console.log("no soltada");
            } else {
                // Si no está en la zona de caida, devuelve la ficha a su posición original
                const fichas = this.jugadorActual === 1 ? this.fichasJugador1 : this.fichasJugador2;
                fichas.indexOf(this.fichaSeleccionada);
                this.fichaSeleccionada.setPosicionInicial();
            }
            
            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;
            
             
            this.draw();
            // Verifica si hay un ganador después de la colocación
            if (this.hayGanador(ultimoJugador, columna, fila)) {
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
        console.log("finalizar juego")
        this.timer.setPausa(true);
        this.inhabilitarFichas();
    }

    drawGanador(ultimoJugador) {
        const turnoTexto = `Ganador jugador ${ultimoJugador}`;
        console.log(turnoTexto)
        
        // Estilo del texto
        this.ctx.font = "24px Play";       
        this.ctx.fillStyle = "#ffffff";      
        this.ctx.textAlign = "center";       
        
        
        const posX = (this.canvas.width + (this.tablero.filas)) / 2;
        const posY = this.canvas.height - 100;  // Justo debajo del tablero
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
        console.log("drawGanador")
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
        console.log("reiniciar juego"); 
        // Reiniciar lógica del juego aquí
        if(this.isPointerOnResetButton(x, y)){
            console.log("reinicia???"); 
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

    volverAlMenu(x,y) {
        if(this.isPointerOnMenuButton(x, y)){
            this.timer.borrarIntervalo();
            this.isHabilitado = false;
            loadMain();
        }
    }

    // Dibuja el boton de reinciar y el boton de menú
    drawBoton(x, y, radius, img, color) {

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.drawImage(img, x - 14, y - 15, 28, 28);
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

    
    isHabilitado(){
        return this.habilitado;
    }
    setHabilitado(habilitado){
        this.habilitado = habilitado;
    }

}
