//315  "FRAMES"

// LOGO
window.addEventListener("scroll", () => {
    const element = document.getElementById("logo");
    const scrollY = window.scrollY;

    // Calcular el nuevo ancho y alto en función del scroll
    const width = Math.max(560 - scrollY, 150); // Se reduce hasta 150px de ancho
    const mtop = Math.max(55 - scrollY, 53); // Se reduce hasta 150px de ancho
    const height = Math.max(320 - scrollY * (320 / 560), 86); // Se reduce hasta 86px de alto

    // Ajustar el tamaño y posición
    element.style.marginTop = `${mtop}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate(-50%, -${Math.min(scrollY, 100)}px)`;

});


// HERO-1
window.addEventListener("scroll", () => {
    const element = document.getElementById("hero-1");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 9, 35); // Subir hasta 50px
    const translateX = Math.min(scrollY / 19.688, 16); // Mover hasta 30px a la izquierda
    const rotate = Math.min(scrollY / 78.75, 4); // Rotar hasta 15 grados

    element.style.transform = `translate(-${translateX}px, -${translateY}px) rotate(${-rotate}deg)`;
});


// HERO-2
window.addEventListener("scroll", () => {
    const element = document.getElementById("hero-2");
    const scrollY = window.scrollY;

    const translateY = Math.min(scrollY / (7.875/1.5), 40); // Subir hasta 50px
    const translateX = Math.min(scrollY / 2, 0); // Mover hasta 30px a la izquierda
    const rotate = Math.min(scrollY / 90, 3.5); // Rotar hasta 15 grados

    element.style.transform = `translate(-${translateX}px, -${translateY}px) rotate(${-rotate}deg)`;
});


// HERO-3
window.addEventListener("scroll", () => {
    const element = document.getElementById("hero-3");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 20); // Subir hasta 50px
    const translateX = Math.min(scrollY / 31.5, 15); // Mover hasta 30px a la izquierda
    const rotate = Math.min(scrollY / 105, 3); // Rotar hasta 15 grados

    element.style.transform = `translate(${translateX}px, -${translateY}px) rotate(${rotate}deg)`;
});



















// ARBOL-1
window.addEventListener("scroll", () => {
    const element = document.getElementById("arbol-1");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 10, 20); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(-${translateX}px, -${translateY}px)`;
});


//v2
window.addEventListener("scroll", () => {
    const element = document.getElementById("v2");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 17.5, 18); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(-${translateX}px, -${translateY}px)`;
});


//v3
window.addEventListener("scroll", () => {
    const element = document.getElementById("v3");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 10, 20); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(-${translateX}px, -${translateY}px)`;
});


//v4
window.addEventListener("scroll", () => {
    const element = document.getElementById("v4");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 10, 20); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(-${translateX}px, -${translateY}px)`;
});














// ARBOL-2
window.addEventListener("scroll", () => {
    const element = document.getElementById("arbol-2");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 18.53, 17); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


// ARBOL-3
window.addEventListener("scroll", () => {
    const element = document.getElementById("arbol-3");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 31.5, 10); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


//v1
window.addEventListener("scroll", () => {
    const element = document.getElementById("v1");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 35, 9); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


//v5
window.addEventListener("scroll", () => {
    const element = document.getElementById("v5");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 21, 15); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


//v6
window.addEventListener("scroll", () => {
    const element = document.getElementById("v6");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 31, 10); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


//v7
window.addEventListener("scroll", () => {
    const element = document.getElementById("v7");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 15.75, 20); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});


//v8
window.addEventListener("scroll", () => {
    const element = document.getElementById("v8");
    const scrollY = window.scrollY;

    // Lógica para la segunda imagen (main-image) - sube y rota
    const translateY = Math.min(scrollY / 7, 0); // Subir hasta 50px
    const translateX = Math.min(scrollY / 21, 15); // Mover hasta 30px a la izquierda

    element.style.transform = `translate(${translateX}px, -${translateY}px)`;
});



// SOMBRA1
window.addEventListener("scroll", () => {
    const element = document.getElementById("sombra1");
    const scrollY = window.scrollY;


    const scale = Math.max(1 - scrollY / 1000, 0.5); // Escala mínima de 0.5
    element.style.transform = `scale(${scale})`;
});

// SOMBRA 2
window.addEventListener("scroll", () => {
    const element = document.getElementById("sombra2");
    const scrollY = window.scrollY;


    const scale = Math.max(1 - scrollY / 1000, 0.5); // Escala mínima de 0.5
    element.style.transform = `scale(${scale})`;
});

// SOMBRA 3
window.addEventListener("scroll", () => {
    const element = document.getElementById("sombra3");
    const scrollY = window.scrollY;


    const scale = Math.max(1 - scrollY / 1000, 0.5); // Escala mínima de 0.5
    element.style.transform = `scale(${scale})`;
});