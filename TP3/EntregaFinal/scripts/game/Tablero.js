/* export  */class Tablero {
    constructor(ctx, filas = 6, columnas = 7, tamanoCelda = 100) {
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.tablero = this.crearTablero();
    }

    crearTablero() {
        return Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));
    }

    draw() {
        this.ctx.fillStyle = '#3b5b99';
        this.ctx.fillRect(150, 50, this.columnas * this.tamanoCelda, this.filas * this.tamanoCelda);

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                let x = 150 + columna * this.tamanoCelda + this.tamanoCelda / 2;
                let y = 50 + fila * this.tamanoCelda + this.tamanoCelda / 2;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.tamanoCelda / 2.2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

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
}
