class Tablero {
    constructor(ctx, filas, columnas, tamanoCelda) {
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.imgTablero;
        this.startX = 0;
        this.startY = 0;
        this.tablero = this.crearTablero();

/*         this.contadorprueba = 0; */
    }

    crearTablero() {
        return Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
    }

    setImgTablero(img){
        this.imgTablero = img;
    }

/*     firstDraw() {
        if(this.contadorprueba == 0) {
            let img = new Image();
            img.src = 'src/game/galaxia3.avif';
            img.onload = ()=> {
                let pattern = this.ctx.createPattern(img, "no-repeat");
                ctx.fillStyle = pattern;
                this.ctx.fillRect(this.startX - 10, this.startY - 10, (this.columnas * this.tamanoCelda) + 20, (this.filas * this.tamanoCelda) + 20);                 
                this.contadorprueba++;
                return true;
            }           
        }
    } */

    draw() {
        // Dimensiones del canvas
        const canvasWidth = 1205;
        const canvasHeight = 750;
    
        // Calcula la posición para centrar el tablero
        this.startX = (canvasWidth - (this.columnas * this.tamanoCelda)) / 2;
        this.startY = (canvasHeight - (this.filas * this.tamanoCelda)) / 2; 
    
        
        let pattern = this.ctx.createPattern(this.imgTablero, "no-repeat");
        ctx.fillStyle = pattern;
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

}
