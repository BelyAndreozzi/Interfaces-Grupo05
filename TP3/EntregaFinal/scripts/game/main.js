//Se carga la pantalla del menú con valores predeterminados. Se crean todas las imagenes, se checkea que estas estén cargadas para habilitar la carga del menú.
function loadMain() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let habilitado = true;

    let imagesLoaded = 0;

    let tiempo = 60;
    let enLinea = 4;

    const imgFondo = new Image();
    imgFondo.src = "src/game/backgroundNight.jpg";

    const imgJugador1Opcion1 = new Image();
    imgJugador1Opcion1.src = "src/game/fichaluna1.png";

    const imgJugador1Opcion2 = new Image();
    imgJugador1Opcion2.src = "src/game/fichaluna2.png";

    const imgJugador2Opcion1 = new Image();
    imgJugador2Opcion1.src = "src/game/ficharayo1.png";

    const imgJugador2Opcion2 = new Image();
    imgJugador2Opcion2.src = "src/game/ficharayo2.png";

    const imgTablero = new Image();
    imgTablero.src = "src/game/galaxia3.avif";

    const imgTableroNormal = new Image();
    imgTableroNormal.src = "src/game/normal.png";

    const imgTableroResaltada = new Image();
    imgTableroResaltada.src = "src/game/resaltada.png";

    const luna = new Image();
    luna.src = "src/game/luna1recortado.png";

    const rayo = new Image();
    rayo.src = "src/game/rayo1recortado.png";

    const homeMenu = new Image();
    homeMenu.src = "src/game/hogar.png"

    const flechaRestart = new Image();
    flechaRestart.src = "src/game/reiniciar.png"

    const checkImagesLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded == 12) {
            iniciarMenu();
        }
    };

    //Se cargan las imagenes de fondo, el titulo y el formulario.
    function iniciarMenu() {
        //Dibujar Fondo
        ctx.shadowColor = "rgba(1, 1, 1, 0.9)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.drawImage(imgFondo, 0, 0, 1205, 750);

        //Dibujar a Luna y Rayo
        ctx.drawImage(luna, 0, 150, 466 / 1.6, 955 / 1.6);
        ctx.drawImage(rayo, 934, 200, 434 / 1.6, 939 / 1.6);
        drawTitulo(50);
        drawForm();
    }

    //Se dibujan los subtitulos, los botones y se les coloca una sobra a los items del menú. Al final se borran dichas sombras para no afectar al juego.
    function drawForm() {
        ctx.shadowColor = "rgba(1, 1, 1, 0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = "rgba(183, 234, 223, 0.5)";
        ctx.fillRect(368, 85, 468, 580);

        let posy = 130;
        drawSubtitulo(posy, "Tiempo de partida");
        drawSubtitulo(posy += 120, "Cantidad de fichas en linea");
        drawSubtitulo(posy += 120, "Selecciona tus fichas");
        drawTituloFicha(posy += 45, 500, "Luna");
        drawTituloFicha(posy, 705, "Rayo");

        timeButtons.forEach(button => drawTimeButton(button));
        xEnLineaButtons.forEach(button => drawXEnLineaButtons(button));
        fichasButtons.forEach(button => drawFichaButtons(button));
        drawButtonJugar();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    //Titulos
    function drawTitulo(posy) {
        const posX = 600
        const posY = posy

        ctx.font = "32px Play";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeText("¿Cómo te gustaría jugar?", posX, posY);
        ctx.fillStyle = "#fff";

        ctx.fillText("¿Cómo te gustaría jugar?", posX, posY);
    }

    //Subtitulos
    function drawSubtitulo(posy, texto) {
        const posX = 600
        const posY = posy;

        ctx.font = "28px Play";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeText(texto, posX, posY);
        ctx.fillStyle = "#fff";

        ctx.fillText(texto, posX, posY);
    }

    //Titulos con los nombres de los personajes
    function drawTituloFicha(posy, posx, texto) {
        const posX = posx;
        const posY = posy;

        ctx.font = "24px Play";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeText(texto, posX, posY);
        ctx.fillStyle = "#fff";

        ctx.fillText(texto, posX, posY);
    }

    //BOTONES

    //Boton jugar
    const buttonJugar = { x: 552.5, y: 600, width: 100, height: 50, color: "rgb(250, 252, 117)" };

    //Botones de tiempo
    const timeButtons = [
        { x: 387.5, y: 150, width: 130, height: 50, color: "rgba(11, 183, 236, 0.5)", tiempo: 60, text: "1 min" },
        { x: 537.5, y: 150, width: 130, height: 50, color: "rgba(11, 183, 236, 0.5)", tiempo: 180, text: "3 min" },
        { x: 687.5, y: 150, width: 130, height: 50, color: "rgba(11, 183, 236, 0.5)", tiempo: 300, text: "5 min" }
    ];

    //Botones de cantidad en linea 
    const xEnLineaButtons = [
        { x: 387.5, y: 270, width: 100, height: 50, color: "rgba(176, 113, 245, 0.5)", cant: 4, text: "4 en linea" },
        { x: 497.5, y: 270, width: 100, height: 50, color: "rgba(176, 113, 245, 0.5)", cant: 5, text: "5 en linea" },
        { x: 607.5, y: 270, width: 100, height: 50, color: "rgba(176, 113, 245,0.5)", cant: 6, text: "6 en linea" },
        { x: 717.5, y: 270, width: 100, height: 50, color: "rgba(176, 113, 245, 0.5)", cant: 7, text: "7 en linea" }
    ]

    //Botones de fichas
    const fichasButtons = [
        { name: 0, x: 500, y: 460, radius: 30, img: imgJugador1Opcion1, isSelected: true },
        { name: 1, x: 500, y: 530, radius: 30, img: imgJugador1Opcion2, isSelected: false },
        { name: 2, x: 705, y: 460, radius: 30, img: imgJugador2Opcion1, isSelected: true },
        { name: 3, x: 705, y: 530, radius: 30, img: imgJugador2Opcion2, isSelected: false }
    ]

    //Se juntan todos los botones en un solo array para poder manejar el mouse pointer.
    let allButtonsMenu = [];
    allButtonsMenu.push(buttonJugar);
    [...timeButtons, ...xEnLineaButtons].forEach(boton => allButtonsMenu.push(boton));

    //Dibuja boton jugar
    function drawButtonJugar() {
        ctx.fillStyle = buttonJugar.color;
        ctx.fillRect(buttonJugar.x, buttonJugar.y, buttonJugar.width, buttonJugar.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Play";
        ctx.fillText("Jugar", buttonJugar.x + 50, buttonJugar.y + 30);
    }

    //Dibuja botones de tiempo. Si se presiona el boton, se cambia de color.
    function drawTimeButton(button) {
        if (tiempo === button.tiempo) {
            ctx.fillStyle = "rgba(11, 183, 236, 1)";
        } else {
            ctx.fillStyle = button.color;

        }
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Play";

        ctx.fillText(button.text, button.x + 63, button.y + 30);
    }

    //Dibuja botones de cantidad en linea. Si se presiona el boton, se cambia de color.
    function drawXEnLineaButtons(button) {
        if (enLinea == button.cant) {
            ctx.fillStyle = "rgba(176, 113, 245, 1)";
        } else {
            ctx.fillStyle = button.color;
        }
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Play";

        ctx.fillText(button.text, button.x + 50, button.y + 30);

    }

    // Dibuja botones de seleccion de fichas. Si se elige una ficha, se opaca la no elegida. Se restablece la opacidad para no afectar a ningún otro elemento.
    function drawFichaButtons(button) {
        ctx.beginPath();
        ctx.arc(button.x, button.y, button.radius, 0, 2 * Math.PI);

        if (!button.isSelected) {
            ctx.globalAlpha = 0.5;
        } else {
            ctx.globalAlpha = 1;
        }

        ctx.drawImage(button.img, button.x - button.radius, button.y - button.radius, button.radius * 2, button.radius * 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
    }

    //Se encarga de manejar el mouse pointer en los distintos botones del menú. Si el botón no se encuentra en ninguna posición posible (verificado con isPointerIn e isPoinInside), se establece el cursor por defecto.
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let cursorSet = false;

        for (let i = 0; i < allButtonsMenu.length; i++) {
            if (isPointerIn(allButtonsMenu[i], x, y)) {
                canvas.style.cursor = 'pointer';
                cursorSet = true;
                break;  // no nos mates F4bri, gracias 
            }
        }

        for (let i = 0; i < fichasButtons.length; i++) {
            if (isPointInside(fichasButtons[i], x, y)) {
                canvas.style.cursor = 'pointer';
                cursorSet = true;
                break;  // no nos mates F4bri, gracias 
            }
        }

        if (!cursorSet) {
            canvas.style.cursor = 'default';
        }
    })

    //Al clickear en las coordenadas posibles (según el botón utilizando isPointerIn o isPointInside), se ejecuta la accion correspondiente.
    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (!habilitado) return; // Si no está habilitado, no ejecuta nada

        switch (true) {
            case isPointerIn(buttonJugar, x, y):
                iniciarJuego();
                break;

            case isPointerIn(xEnLineaButtons[0], x, y):
                enLinea = 4;
                iniciarMenu();
                break;

            case isPointerIn(xEnLineaButtons[1], x, y):
                enLinea = 5;
                iniciarMenu();
                break;

            case isPointerIn(xEnLineaButtons[2], x, y):
                enLinea = 6;
                iniciarMenu();
                break;

            case isPointerIn(xEnLineaButtons[3], x, y):
                enLinea = 7;
                iniciarMenu();
                break;

            case isPointerIn(timeButtons[0], x, y):
                tiempo = 60;
                iniciarMenu();
                break;

            case isPointerIn(timeButtons[1], x, y):
                tiempo = 180;
                iniciarMenu();
                break;

            case isPointerIn(timeButtons[2], x, y):
                tiempo = 300;
                iniciarMenu();
                break;

            case isPointInside(fichasButtons[0], x, y):
                fichasButtons[0].isSelected = true;
                fichasButtons[1].isSelected = false;
                iniciarMenu();
                break;

            case isPointInside(fichasButtons[1], x, y):
                fichasButtons[0].isSelected = false;
                fichasButtons[1].isSelected = true;
                iniciarMenu();
                break;

            case isPointInside(fichasButtons[2], x, y):
                fichasButtons[2].isSelected = true;
                fichasButtons[3].isSelected = false;
                iniciarMenu();
                break;

            case isPointInside(fichasButtons[3], x, y):
                fichasButtons[2].isSelected = false;
                fichasButtons[3].isSelected = true;
                iniciarMenu();
                break;
        }
    });

    //Se verifica la posición del mouse dentro de las coordenadas dadas para los botones rectangulares.
    function isPointerIn(button, x, y) {
        return x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height;
    }

    //Se verifica la posición del mouse dentro de las coordenadas dadas para los botones redondos.
    function isPointInside(button, x, y) {
        let _x = button.x - x;
        let _y = button.y - y;
        let resultado = Math.sqrt(_x * _x + _y * _y) < button.radius;
        return resultado;
    }


    // Se inicia el juego
    // 1. Verifica qué ficha seleccionó cada jugador, y se la asigna a una variable.
    // 2. Instancia el juego con las variables que el usuario eligió en el formulario del menú y lo dibuja.
    // 3. Al clickear se verifica si se seleccionó una ficha. Si no se seleccionó, se intenta volver al menú o reiniciar el juego.
    // 4. Al mover el mouse se manejan los mouse pointers. Si este pasa por un arriba de un boton, se activa el pointer.
    // 5. Se intenta soltar una ficha al levantar el mouse. 
    // 6. Al cargar las imagenes, se cuentan a sí mismas en el checkImagesLoaded. 
    function iniciarJuego() {
        let imgFichaJ1;
        let imgFichaJ2;
        habilitado = false;

        if (fichasButtons[0].isSelected) {
            imgFichaJ1 = imgJugador1Opcion1;
        } else {
            imgFichaJ1 = imgJugador1Opcion2;
        }

        if (fichasButtons[2].isSelected) {
            imgFichaJ2 = imgJugador2Opcion1;
        } else {
            imgFichaJ2 = imgJugador2Opcion2;
        }

        const game = new Game(ctx, canvas, imgFichaJ1, imgFichaJ2, tiempo, enLinea, true);
        game.setBackgroundImage(imgFondo);
        game.setHomeMenu(homeMenu);
        game.setFlechaRestart(flechaRestart);

        game.getTablero().setImgTablero(imgTablero);
        game.getTablero().setImgNormal(imgTableroNormal);
        game.getTablero().setImgResaltada(imgTableroResaltada);

        game.draw();

        if (!habilitado) {
            canvas.addEventListener('mousedown', (e) => {
                game.seleccionarFicha(e.offsetX, e.offsetY);
                if (game.fichaSeleccionada == null) {
                    game.reiniciarJuego(e.offsetX, e.offsetY);
                    game.volverAlMenu(e.offsetX, e.offsetY);
                }
            });

            canvas.addEventListener('mousemove', (e) => {
                game.moverFicha(e.offsetX, e.offsetY);
                if (game.fichaSeleccionada != null) {
                    const rect = canvas.getBoundingClientRect();
                    const mousePosX = e.clientX - rect.left;
                    const mousePosY = e.clientY - rect.top;
                    game.tablero.drawZonaCaida(mousePosX, mousePosY);
                }
                if (
                    game.isFichasSeleccionadas(e.offsetX, e.offsetY) ||
                    game.isPointerOnMenuButton(e.offsetX, e.offsetY) ||
                    game.isPointerOnResetButton(e.offsetX, e.offsetY)) {
                    canvas.style.cursor = 'pointer';
                } else {
                    canvas.style.cursor = 'default';
                }
            });

            canvas.addEventListener('mouseup', (e) => {
                game.soltarFicha(e.offsetX, e.offsetY);
            });

        }
    }

    imgJugador1Opcion1.onload = checkImagesLoaded;
    imgJugador1Opcion2.onload = checkImagesLoaded;
    imgJugador2Opcion1.onload = checkImagesLoaded;
    imgJugador2Opcion2.onload = checkImagesLoaded;
    imgTablero.onload = checkImagesLoaded;
    imgFondo.onload = checkImagesLoaded;
    luna.onload = checkImagesLoaded;
    rayo.onload = checkImagesLoaded;
    homeMenu.onload = checkImagesLoaded;
    flechaRestart.onload = checkImagesLoaded;
    imgTableroNormal.onload = checkImagesLoaded;
    imgTableroResaltada.onload = checkImagesLoaded;
}

//Al cargar la página, se carga el menú.
document.addEventListener("DOMContentLoaded", loadMain()); 