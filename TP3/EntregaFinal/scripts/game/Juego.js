class Game {
    constructor(ctx, canvas, imgJugador1, imgJugador2, tiempo) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.tablero = new Tablero(ctx, 6, 7, 70);
        this.imgJugador1 = imgJugador1;
        this.imgJugador2 = imgJugador2;
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.timer = new Timer(5, ctx, this);
        this.jugadorActual = 1;
        this.fichaSeleccionada = null;
        this.isMouseDown = false;

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
        this.timer.drawTimer();
        this.tablero.draw();
        
        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.draw());
        
        this.drawTurn();
        this.drawZonaCaida();

    }
    
    clearCanvas() {
        
        let backgroundImage = new Image ();
        backgroundImage.src = "src/games/4_en_linea.webp"

        let pattern = this.ctx.createPattern(backgroundImage, "no-repeat");
        ctx.fillStyle = pattern;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawZonaCaida() {
        // Calcula las coordenadas de la zona de caída según el tablero
        console.log("drawZonaCaida")
        const zonaDeCaidaTop = this.tablero.getStartY() -80;
        const zonaDeCaidaBottom = this.tablero.getStartY();
        const zonaDeCaidaLeft = this.tablero.getStartX();
        const zonaDeCaidaRight = this.tablero.getStartX() + this.tablero.columnas * this.tablero.tamanoCelda;
        
        const zonaDeCaidaWidth = zonaDeCaidaRight - zonaDeCaidaLeft;
        const zonaDeCaidaHeight = zonaDeCaidaBottom - zonaDeCaidaTop;
        console.log(zonaDeCaidaLeft, zonaDeCaidaTop, zonaDeCaidaWidth, zonaDeCaidaHeight)
        
        // Dibuja el área de la zona de caída
        ctx.save();
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)"; // Color semitransparente para visibilidad
        ctx.fillRect(zonaDeCaidaLeft, zonaDeCaidaTop, zonaDeCaidaWidth, zonaDeCaidaHeight);
        ctx.restore();
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
            const zonaDeCaidaTop = this.tablero.getStartY() - 80;
            const zonaDeCaidaBottom = this.tablero.getStartY();
            const zonaDeCaidaLeft = this.tablero.getStartX();
            const zonaDeCaidaRight = this.tablero.getStartX() + this.tablero.columnas * this.tablero.tamanoCelda;
            
            
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
                /* const index =  */fichas.indexOf(this.fichaSeleccionada);
                this.fichaSeleccionada.setPosicionInicial();
            }
            
            this.fichaSeleccionada.setResaltado(false);
            this.fichaSeleccionada = null;
            this.draw();
            
            
            
            if (this.hayGanador(ultimoJugador)) {
                this.drawGanador(ultimoJugador);
                this.draw();
                this.finalizarJuego();
            }
            
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
    
    
    finalizarJuego() {
        console.log("finalizar juego")
        this.timer.setPausa(true);
        this.inhabilitarFichas();

        
    }
    
    drawGanador(ultimoJugador) {
        const turnoTexto = `Ganador Jugador ${ultimoJugador}`;
        
        // Estilo del texto
        this.ctx.font = "24px Play";       // Aumenta el tamaño de la fuente
        this.ctx.fillStyle = "#ffffff";      // Color del texto en blanco
        this.ctx.textAlign = "center";       // Centrado horizontal
        this.ctx.textBaseline = "top";       // Posicionado en la parte superior
        
        
        const posX = (this.canvas.width + (this.tablero.filas)) / 2;
        const posY = canvas.height - 50;   // Justo debajo del tablero
        
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
        
        
        const posX = (this.canvas.width + (this.tablero.filas)) / 2;
        const posY = canvas.height - 75;  // Justo debajo del tablero
        
        // Dibuja el texto segun posicion
        this.ctx.fillText(turnoTexto, posX, posY);
    }
    
    cambiarTurno() {
        this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
        this.drawTurn();
    }

    getTablero(){
        return this.tablero;
    }

    inhabilitarFichas(){
        [...this.fichasJugador1, ...this.fichasJugador2].forEach(ficha => ficha.setColocado());
    }
    
    
}
