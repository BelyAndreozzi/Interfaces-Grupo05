class Ficha extends Figura {
    constructor(x, y, color, ctx,) {
        super(x, y, color, ctx);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fill;
        this.ctx.arc(this.posX, this.posY, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();
    }
}