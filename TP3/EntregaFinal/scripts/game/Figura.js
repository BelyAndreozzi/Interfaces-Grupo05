class Figura {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = context;
    }

    setFill (fill) {
        this.fill = fill;
    }

    getPosition () {
        return {x: this.posX, y: this.posY};
    }

    getPosY () {
        return this.posY;
    }

    getPosX () {
        return this.posX;
    }

    getFill () {
        return this.fill;
    }

    draw() {}
}