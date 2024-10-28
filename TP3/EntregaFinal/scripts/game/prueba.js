/* const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); */
/* ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);

ctx.fillStyle = "blue";
ctx.fillRect(150, 0, 150, 75);

ctx.fillRect(500, 200, 400, 200); */

/* ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(300, 300, 100, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();
ctx.lineWidth = 5;
ctx.strokeStyle = "red";
ctx.stroke(); */


function verificarVictoria(jugadorActual) {
    // Comprobar horizontal
    for (let fila = 0; fila < 6; fila++) {
        for (let col = 0; col < 4; col++) { // Solo necesitamos comprobar hasta la columna 3
            if (
                tablero[fila][col] === jugadorActual &&
                tablero[fila][col + 1] === jugadorActual &&
                tablero[fila][col + 2] === jugadorActual &&
                tablero[fila][col + 3] === jugadorActual
            ) {
                return true;
            }
        }
    }

    // Comprobar vertical
    for (let col = 0; col < 7; col++) {
        for (let fila = 0; fila < 3; fila++) { // Solo necesitamos comprobar hasta la fila 2
            if (
                tablero[fila][col] === jugadorActual &&
                tablero[fila + 1][col] === jugadorActual &&
                tablero[fila + 2][col] === jugadorActual &&
                tablero[fila + 3][col] === jugadorActual
            ) {
                return true;
            }
        }
    }

    // Comprobar diagonal (de abajo-izquierda a arriba-derecha)
    for (let fila = 3; fila < 6; fila++) { // Comenzar desde la fila 3
        for (let col = 0; col < 4; col++) { // Solo hasta la columna 3
            if (
                tablero[fila][col] === jugadorActual &&
                tablero[fila - 1][col + 1] === jugadorActual &&
                tablero[fila - 2][col + 2] === jugadorActual &&
                tablero[fila - 3][col + 3] === jugadorActual
            ) {
                return true;
            }
        }
    }

    // Comprobar diagonal (de arriba-izquierda a abajo-derecha)
    for (let fila = 0; fila < 3; fila++) { // Solo hasta la fila 2
        for (let col = 0; col < 4; col++) { // Solo hasta la columna 3
            if (
                tablero[fila][col] === jugadorActual &&
                tablero[fila + 1][col + 1] === jugadorActual &&
                tablero[fila + 2][col + 2] === jugadorActual &&
                tablero[fila + 3][col + 3] === jugadorActual
            ) {
                return true;
            }
        }
    }

    // Si no hay victoria
    return false;
}