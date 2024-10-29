function mostrarMenu(ctx, canvas, startGameCallback) {
    // Opciones seleccionadas (estado)
    let selectedSize = { rows: 6, cols: 7 };
    let fichaPlayer1 = "option1";
    let fichaPlayer2 = "option1";
    let time = 5;

    // Dibujar menú
    function drawMenu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ffffff";

        // Tamaño del tablero
        ctx.fillText("Tamaño del tablero:", 50, 50);
        ctx.fillText("6x7", 80, 80);
        ctx.fillText("8x8", 180, 80);
        ctx.fillText("10x10", 280, 80);

        // Fichas Jugador 1
        ctx.fillText("Fichas Jugador 1:", 50, 150);
        ctx.fillText("Opción 1", 80, 180);
        ctx.fillText("Opción 2", 180, 180);

        // Fichas Jugador 2
        ctx.fillText("Fichas Jugador 2:", 50, 250);
        ctx.fillText("Opción 1", 80, 280);
        ctx.fillText("Opción 2", 180, 280);

        // Tiempo de partida
        ctx.fillText("Tiempo de partida:", 50, 350);
        ctx.fillText("5 min", 80, 380);
        ctx.fillText("10 min", 180, 380);
        ctx.fillText("15 min", 280, 380);

        // Botón de jugar
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(canvas.width / 2 - 50, canvas.height - 80, 100, 50);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Jugar", canvas.width / 2 - 20, canvas.height - 50);
    }

    // Capturar clics para opciones
    function handleClickMenu(x, y) {
        // Selección de tamaño
        if (y >= 60 && y <= 90) {
            if (x >= 80 && x <= 140) selectedSize = { rows: 6, cols: 7 };
            if (x >= 180 && x <= 240) selectedSize = { rows: 8, cols: 8 };
            if (x >= 280 && x <= 340) selectedSize = { rows: 10, cols: 10 };
        }
        
        // Selección de fichas
        if (y >= 160 && y <= 190) {
            if (x >= 80 && x <= 140) fichaPlayer1 = "option1";
            if (x >= 180 && x <= 240) fichaPlayer1 = "option2";
        }
        if (y >= 260 && y <= 290) {
            if (x >= 80 && x <= 140) fichaPlayer2 = "option1";
            if (x >= 180 && x <= 240) fichaPlayer2 = "option2";
        }

        // Selección de tiempo
        if (y >= 360 && y <= 390) {
            if (x >= 80 && x <= 140) time = 5;
            if (x >= 180 && x <= 240) time = 10;
            if (x >= 280 && x <= 340) time = 15;
        }

        // Botón de "Jugar"
        if (
            x >= canvas.width / 2 - 50 &&
            x <= canvas.width / 2 + 50 &&
            y >= canvas.height - 80 &&
            y <= canvas.height - 30
        ) {
            // Llama a la función de iniciar juego con las opciones seleccionadas
            startGameCallback(selectedSize, fichaPlayer1, fichaPlayer2, time);
        }
    }

    // Agregar event listener temporal para el menú
    function clickListener(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        handleClickMenu(x, y);
        drawMenu();
    }

    canvas.addEventListener("click", clickListener);

    // Dibujar el menú inicial
    drawMenu();

    return function limpiarMenu() {
        canvas.removeEventListener("click", clickListener);
    };
}

                                                    /////// CLASE MENU //////

class Menu {
    constructor(ctx, canvasWidth, canvasHeight, startGameCallback) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.startGameCallback = startGameCallback; // Función que se llamará al presionar "Jugar"
        
        this.selectedSize = { rows: 6, cols: 7 }; // Tamaño predeterminado
        this.selectedFichaPlayer1 = "option1"; 
        this.selectedFichaPlayer2 = "option1"; 
        this.selectedTime = 5; // Tiempo predeterminado en minutos

        this.buttonPlay = { x: canvasWidth / 2 - 50, y: canvasHeight - 80, width: 100, height: 50 };
    }

    draw() {
        this.clearCanvas();
        
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#ffffff";

        // Tamaño del tablero
        this.ctx.fillText("Tamaño del tablero", 50, 50);
        this.ctx.fillText("6x7", 80, 80);
        this.ctx.fillText("8x8", 180, 80);
        this.ctx.fillText("10x10", 280, 80);

        // Fichas
        this.ctx.fillText("Fichas Jugador 1", 50, 150);
        this.ctx.fillText("Opción 1", 80, 180);
        this.ctx.fillText("Opción 2", 180, 180);

        this.ctx.fillText("Fichas Jugador 2", 50, 250);
        this.ctx.fillText("Opción 1", 80, 280);
        this.ctx.fillText("Opción 2", 180, 280);

        // Tiempo de partida
        this.ctx.fillText("Tiempo de partida (minutos)", 50, 350);
        this.ctx.fillText("5", 80, 380);
        this.ctx.fillText("10", 180, 380);
        this.ctx.fillText("15", 280, 380);

        // Botón Jugar
        this.ctx.fillStyle = "#4CAF50";
        this.ctx.fillRect(this.buttonPlay.x, this.buttonPlay.y, this.buttonPlay.width, this.buttonPlay.height);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText("Jugar", this.buttonPlay.x + 20, this.buttonPlay.y + 30);
    }

    clearCanvas() {
        this.ctx.fillStyle = "#1C1F3E";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    handleClick(x, y) {
        // Detecta selección de tamaño del tablero
        if (y >= 60 && y <= 90) {
            if (x >= 80 && x <= 140) this.selectedSize = { rows: 6, cols: 7 };
            else if (x >= 180 && x <= 240) this.selectedSize = { rows: 8, cols: 8 };
            else if (x >= 280 && x <= 340) this.selectedSize = { rows: 10, cols: 10 };
        }

        // Detecta selección de fichas
        if (y >= 160 && y <= 190) {
            if (x >= 80 && x <= 140) this.selectedFichaPlayer1 = "option1";
            else if (x >= 180 && x <= 240) this.selectedFichaPlayer1 = "option2";
        }
        if (y >= 260 && y <= 290) {
            if (x >= 80 && x <= 140) this.selectedFichaPlayer2 = "option1";
            else if (x >= 180 && x <= 240) this.selectedFichaPlayer2 = "option2";
        }

        // Detecta selección de tiempo
        if (y >= 360 && y <= 390) {
            if (x >= 80 && x <= 140) this.selectedTime = 5;
            else if (x >= 180 && x <= 240) this.selectedTime = 10;
            else if (x >= 280 && x <= 340) this.selectedTime = 15;
        }

        // Detecta clic en "Jugar"
        if (
            x >= this.buttonPlay.x &&
            x <= this.buttonPlay.x + this.buttonPlay.width &&
            y >= this.buttonPlay.y &&
            y <= this.buttonPlay.y + this.buttonPlay.height
        ) {
            this.startGameCallback(this.selectedSize, this.selectedFichaPlayer1, this.selectedFichaPlayer2, this.selectedTime);
        }
    }
}
