class Ficha {
    constructor(posX, posY, ctx, radius, imgJugador) {
        this.posIniX = posX;
        this.posIniY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.radius = radius;
        this.fill = imgJugador;
        this.resaltado = false;
        this.colocado = false;
    }

    draw() {
        this.ctx.save();

        // Dibuja el círculo como fondo
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "transparent"; // Puedes cambiar el color de fondo si lo deseas
        /* this.ctx.fill(); */
        this.ctx.closePath();

        this.ctx.clip();
        // Dibuja la imagen dentro del círculo
        this.ctx.drawImage(this.fill, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);

        this.ctx.restore();

        // Resaltado
        if (this.resaltado === true) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < this.radius;
        return resultado;
    }

    getPosition() {
        return { x: this.posX, y: this.posY };
    }

    getPosY() {
        return this.posY;
    }

    getPosX() {
        return this.posX;
    }

    getFill() {
        return this.fill;
    }

    getFill() {
        return this.resaltado;
    }

    isColocado(){
        return this.colocado;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setResaltado(bool) {
        this.resaltado = bool;
    }

    setPosicionInicial() {
        this.setPosition(this.posIniX,this.posIniY);
    } 

    setColocado(){
        this.colocado = true;
    }

}