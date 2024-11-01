class Tablero {
    constructor(ctx, xEnLinea, tamanoCelda, normal, resaltada) {
        this.ctx = ctx;
        this.xEnLinea = xEnLinea;
        this.filas = 6;
        this.columnas = 7;
        this.tamanoCelda = tamanoCelda;
        this.imgTablero;
        this.startX = 0;
        this.startY = 0;
        this.tablero = this.crearTablero();
        this.flechaNormal;
        this.flechaResaltada;
    }

    crearTablero() {
        if (this.xEnLinea==5) {
            this.columnas = 8;
            this.filas = 7;
        } else if (this.xEnLinea==6) {
            this.columnas = 9;
            this.filas = 8;
        } else if (this.xEnLinea==7) {
            this.columnas = 10;
            this.filas = 9;
        }
        return Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
    }

    setImgTablero(img){
        this.imgTablero = img;
    }



    draw() {
        // Dimensiones del canvas
        const canvasWidth = 1205;
        const canvasHeight = 750;
    
        // Calcula la posición para centrar el tablero
        this.startX = (canvasWidth - (this.columnas * this.tamanoCelda)) / 2;
        this.startY = (canvasHeight - (this.filas * this.tamanoCelda)) / 2; 
    
        
        let pattern = this.ctx.createPattern(this.imgTablero, "no-repeat");
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(this.startX - 10, this.startY - 10, (this.columnas * this.tamanoCelda) + 20, (this.filas * this.tamanoCelda) + 20); 
        
        // Dibuja las celdas del tablero
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                // Calcula la posición de cada celda
                let x = this.startX + columna * this.tamanoCelda + this.tamanoCelda / 2;
                let y = this.startY + fila * this.tamanoCelda + this.tamanoCelda / 2;
    
                // Dibuja los círculos de cada celda
                this.ctx.beginPath();
                this.ctx.arc(x, y, this.tamanoCelda / 2.2, 0, Math.PI * 2);
                this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.strokeStyle = "white";
                this.ctx.lineWidth = 1;
                this.ctx.stroke();  
            }
        }
    }
    
    drawZonaCaida(mousePosX, mousePosY) {
        const zonaDeCaidaTop = this.getTopZC();
        const zonaDeCaidaBottom = this.getBottomZC();
        const zonaDeCaidaLeft = this.getLeftZC();
        const zonaDeCaidaRight = this.getRightZC();

        for (let col = 0; col < this.columnas; col++) {
            const x = zonaDeCaidaLeft + col * this.tamanoCelda;
            const y = zonaDeCaidaTop;

            // Cambia la flecha según si el cursor está sobre la celda
            if (this.isHoveredOverCell(mousePosX, mousePosY, col)) {
                this.ctx.drawImage(this.flechaResaltada, x + this.tamanoCelda/4, y + this.tamanoCelda/4, this.tamanoCelda/2, this.tamanoCelda/2);
            } else {
                this.ctx.drawImage(this.flechaNormal, x + this.tamanoCelda/4, y + this.tamanoCelda/4, this.tamanoCelda/2, this.tamanoCelda/2);
            }
        }
    }

    isHoveredOverCell(mouseX, mouseY, columna) {
        const zonaDeCaidaTop = this.getStartY() - 80;
        const zonaDeCaidaLeft = this.getStartX();
        
        const x = zonaDeCaidaLeft + columna * this.tamanoCelda;
        const y = zonaDeCaidaTop;

        return mouseX >= x && mouseX <= x + this.tamanoCelda &&
               mouseY >= y && mouseY <= y + this.tamanoCelda;
    }

    // Funciones para obtener las dimensiones de la zona de caida
    getTopZC(){
        return this.getStartY() - this.tamanoCelda;
    }

    getBottomZC(){
        return this.getStartY();
    }

    getLeftZC(){
        return this.getStartX();
    }

    getRightZC(){
        return this.getStartX() + this.columnas * this.tamanoCelda;
    }
    
        


    // Función para colocar una ficha en la columna correcta
    colocarFicha(fila, columna, jugador) {
        this.tablero[fila][columna] = jugador;
    }

    // Verifica si hay un espacio disponible en la columna
    verificarColumna(columna) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.tablero[fila][columna] === 0) {
                return fila;
            }   
        }
        return -1;
    }

    getFilas() {
        return this.filas;
    }

    getColumnas() {
        return this.columnas;
    }

    getTamanoCelda(){
        return this.tamanoCelda;
    }

    getValueX(x, y) {
        return this.tablero[x][y];
    }

    getTablero(){
        return this.tablero;
    }

    getStartX(){
        return this.startX;
    }

    getStartY(){
        return this.startY;
    }

    clearTablero() {
        this.tablero = this.crearTablero();
    }

    setImgNormal(imagen){
        this.flechaNormal = imagen;
    }

    setImgResaltada(imagen){
        this.flechaResaltada = imagen;
    }

}
