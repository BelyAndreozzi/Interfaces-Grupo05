const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let fichas = [];
let fichasPlayer1 = [];
let fichasPlayer2 = [];
let tablero = [];
let modoDeJuego;

let lastFigureClicked = null;
let isMouseDown = false;

function addFiguras(wt, imgJugador) {
    console.log("addFiguras", imgJugador);
     for (let i = 0; i < 10; i++) {
        let posX = wt;
        let posY = 100 + (i * 30);
        let ficha = new Ficha(posX, posY, ctx, 20, imgJugador);
        fichas.push(ficha);
     }
}

function drawFiguras() {
    clearCanvas();
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw();
    }
} 

function clearCanvas() {
    ctx.fillStyle = "#1C1F3E";
    ctx.fillRect (0,0,canvasWidth,canvasHeight);
}

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;

    if (lastFigureClicked != null) {
        lastFigureClicked.setResaltado(false);
        lastFigureClicked = null;
    }

    let clickFig = findClickedFigure(e.offsetX, e.offsetY);
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastFigureClicked = clickFig;
    }
    drawFiguras();
});

canvas.addEventListener('mousemove', (e) => {
    if(isMouseDown && lastFigureClicked != null) {
        lastFigureClicked.setPosition(e.offsetX, e.offsetY);
        drawFiguras();
    }
})

canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
})

function findClickedFigure(x, y){
    for (let i = 0; i < fichas.length; i++) {
        const element = fichas[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}


/* const filasPRUEBA = 6;  
const columnasPRUEBA = 7;   
const tamanoCeldaPRUEBAPRUEBA = 2;

let tableroPRUEBA = Array.from({ length: filasPRUEBA }, () => Array(columnasPRUEBA).fill(null));

function dibujarTablero() {
    ctx.fillStyle = '#3b5b99';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let fila = 0; fila < filasPRUEBA; fila++) {
        for (let columna = 0; columna < columnasPRUEBA; columna++) {
            const x = columna * tamanoCeldaPRUEBA + tamanoCeldaPRUEBA / 2;
            const y = fila * tamanoCeldaPRUEBA + tamanoCeldaPRUEBA / 2;

            ctx.beginPath();
            ctx.arc(x, y, tamanoCeldaPRUEBA / 2 - 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
        }
    }
}  */


function deployGame(jugador1Img, jugador2Img) {
    addFiguras(100, jugador1Img);
    addFiguras(600, jugador2Img);
    dibujarTablero();
    drawFiguras();
}

//ACCIONES

//deployMain();

let imgJug1 = new Image(50,50);
imgJug1.src = "src/misc/luna2.jpg";
let imgJug2 = new Image();
imgJug2.src = "src/misc/rayo2.jpg";


imgJug1.onload = () => {
    imgJug2.onload = () => {
        deployGame(imgJug1, imgJug2);
    };
};





// canvas.addEventListener('mouseup', onMouseUp, false);
// canvas.addEventListener('mousemove', onMouseMove, false);