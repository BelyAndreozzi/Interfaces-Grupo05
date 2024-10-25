class Ficha {
    constructor(posX, posY, ctx, radius, imgJugador) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.radius = radius;
        this.fill = imgJugador;
        this.resaltado = false;
    }

    /* draw() {
        console.log("draw cl " + this.fill);
        this.ctx.beginPath();        
        var img = ctx.createPattern(this.fill,"no-repeat");
        this.ctx.fillStyle = img;
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();
        // let imgg = new Image(20,20);
        // imgg.src= `${this.img}`;
        // this.ctx.fillImage(imgg);

        if(this.resaltado===true){
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    } */

    draw() {
        console.log("draw cl " + this.fill);

        // Dibuja el círculo como fondo
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white"; // Puedes cambiar el color de fondo si lo deseas
        this.ctx.fill();
        this.ctx.closePath();

        // Dibuja la imagen dentro del círculo
        this.ctx.drawImage(this.fill, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);

        // Dibuja el borde del círculo
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();

        // Resaltado
        if (this.resaltado === true) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 5;
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


}