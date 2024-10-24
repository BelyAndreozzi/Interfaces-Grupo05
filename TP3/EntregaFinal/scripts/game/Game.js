const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


let figuras = []

/* function addFiguras(){
    for(let i = 0; i < 10; i++){
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);
        let ficha = new Ficha(posX,posY,"red",ctx);
        figuras.push(ficha);
    }
} */

function addFiguras(wt, color) {
    for (let i = 0; i < 10; i++) {
        let posX = Math.round(wt);
        let posY = Math.round((canvas.height - 50) - (20*i));
        let ficha = new Ficha(posX, posY, color, ctx);
        figuras.push(ficha);
    }
}

function drawFiguras() {
    for (let i = 0; i < figuras.length; i++) {
        figuras[i].draw();
    }
}

addFiguras(300 ,"red");
addFiguras(600, "pink");
drawFiguras();


