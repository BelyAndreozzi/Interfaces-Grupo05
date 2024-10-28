/* export  */class Tablero {
    constructor(ctx, filas = 6, columnas = 7, tamanoCelda = 90) {
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.startX = 0;
        this.startY = 0;
        this.tablero = this.crearTablero();
    }

    crearTablero() {
        return Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));
    }

    draw() {
        // Dimensiones del canvas
        const canvasWidth = 1205;
        const canvasHeight = 750;
    
        // Calcula la posición para centrar el tablero
        this.startX = (canvasWidth - (this.columnas * this.tamanoCelda)) / 2;
        this.startY = (canvasHeight - (this.filas * this.tamanoCelda)) / 2;
    
        // Fondo del tablero con borde redondeado
        this.ctx.fillStyle = '#3b5b99';
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
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }


    // draw() {
    //     this.ctx.fillStyle = '#3b5b99';
    //     this.ctx.fillRect(150, 50, this.columnas * this.tamanoCelda, this.filas * this.tamanoCelda);

    //     for (let fila = 0; fila < this.filas; fila++) {
    //         for (let columna = 0; columna < this.columnas; columna++) {
    //             let x = 150 + columna * this.tamanoCelda + this.tamanoCelda / 2;
    //             let y = 50 + fila * this.tamanoCelda + this.tamanoCelda / 2;

    //             this.ctx.beginPath();
    //             this.ctx.arc(x, y, this.tamanoCelda / 2.2, 0, Math.PI * 2);
    //             this.ctx.fillStyle = '#ffffff';
    //             this.ctx.fill();
    //             this.ctx.closePath();
    //         }
    //     }
    // }

    // Función para colocar una ficha en la columna correcta
    colocarFicha(fila, columna, jugador) {
        this.tablero[fila][columna] = jugador;
    }

    // Verifica si hay un espacio disponible en la columna
    verificarColumna(columna) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.tablero[fila][columna] === null) {
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
}
