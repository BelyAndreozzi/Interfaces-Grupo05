// Al hacer scroll se cambian los tamaños y posiciones de los Elementos del hero
window.addEventListener("scroll", () => {
    const elementLOGO = document.getElementById("logo");
    const element1 = document.getElementById("hero-1");
    const element2 = document.getElementById("hero-2");
    const element3 = document.getElementById("hero-3");
    const elementArbol1 = document.getElementById("arbol-1");
    const elementV2 = document.getElementById("v2");
    const elementV3 = document.getElementById("v3");
    const elementV4 = document.getElementById("v4");
    const elementArbol2 = document.getElementById("arbol-2");
    const elementArbol3 = document.getElementById("arbol-3");
    const elementV1 = document.getElementById("v1");
    const elementV5 = document.getElementById("v5");
    const elementV6 = document.getElementById("v6");
    const elementV7 = document.getElementById("v7");
    const elementV8 = document.getElementById("v8");
    const elementSombra1 = document.getElementById("sombra1");
    const elementSombra2 = document.getElementById("sombra2");
    const elementSombra3 = document.getElementById("sombra3");


    const scrollY = window.scrollY;

    
    const widthLOGO = Math.max(560 - scrollY, 150);
    const mtopLOGO = Math.max(55 - scrollY, 53);
    const heightLOGO = Math.max(320 - scrollY * (320 / 560), 86); 

    const translateY1 = Math.min(scrollY / 9, 35);
    const translateX1 = Math.min(scrollY / 19.688, 16);
    const rotate1 = Math.min(scrollY / 78.75, 4);

    const translateY2 = Math.min(scrollY / (7.875/1.5), 40);
    const translateX2 = Math.min(scrollY / 2, 0);
    const rotate2 = Math.min(scrollY / 90, 3.5);

    const translateY3 = Math.min(scrollY / 7, 20);
    const translateX3 = Math.min(scrollY / 31.5, 15);
    const rotate3 = Math.min(scrollY / 105, 3);

    const translateYArbol1 = Math.min(scrollY / 7, 0);
    const translateXArbol1 = Math.min(scrollY / 10, 20);

    const translateYV2 = Math.min(scrollY / 7, 0);
    const translateXV2 = Math.min(scrollY / 17.5, 18);

    const translateYV3 = Math.min(scrollY / 7, 0);
    const translateXV3 = Math.min(scrollY / 10, 20);

    const translateYV4 = Math.min(scrollY / 7, 0);
    const translateXV4 = Math.min(scrollY / 10, 20);

    const translateYArbol2 = Math.min(scrollY / 7, 0);
    const translateXArbol2 = Math.min(scrollY / 18.53, 17);
    
    const translateYArbol3 = Math.min(scrollY / 7, 0);
    const translateXArbol3 = Math.min(scrollY / 31.5, 10);

    const translateYV1 = Math.min(scrollY / 7, 0);
    const translateXV1 = Math.min(scrollY / 35, 9);

    const translateYV5 = Math.min(scrollY / 7, 0);
    const translateXV5 = Math.min(scrollY / 21, 15);

    const translateYV6 = Math.min(scrollY / 7, 0);
    const translateXV6 = Math.min(scrollY / 31, 10);

    const translateYV7 = Math.min(scrollY / 7, 0);
    const translateXV7 = Math.min(scrollY / 15.75, 20);

    const translateYV8 = Math.min(scrollY / 7, 0);
    const translateXV8 = Math.min(scrollY / 21, 15);

    const scaleSombra = Math.max(1 - scrollY / 1000, 0.5);


    elementLOGO.style.marginTop = `${mtopLOGO}px`;
    elementLOGO.style.width = `${widthLOGO}px`;
    elementLOGO.style.height = `${heightLOGO}px`;
    elementLOGO.style.transform = `translate(-50%, -${Math.min(scrollY, 100)}px)`;

    element1.style.transform = `translate(-${translateX1}px, -${translateY1}px) rotate(${-rotate1}deg)`;
    
    element2.style.transform = `translate(-${translateX2}px, -${translateY2}px) rotate(${-rotate2}deg)`;

    element3.style.transform = `translate(${translateX3}px, -${translateY3}px) rotate(${rotate3}deg)`;

    elementArbol1.style.transform = `translate(-${translateXArbol1}px, -${translateYArbol1}px)`;

    elementV2.style.transform = `translate(-${translateXV2}px, -${translateYV2}px)`;
    
    elementV3.style.transform = `translate(-${translateXV3}px, -${translateYV3}px)`;

    elementV4.style.transform = `translate(-${translateXV4}px, -${translateYV4}px)`;

    elementArbol2.style.transform = `translate(${translateXArbol2}px, -${translateYArbol2}px)`;

    elementArbol3.style.transform = `translate(${translateXArbol3}px, -${translateYArbol3}px)`;

    elementV1.style.transform = `translate(${translateXV1}px, -${translateYV1}px)`;

    elementV5.style.transform = `translate(${translateXV5}px, -${translateYV5}px)`;

    elementV6.style.transform = `translate(${translateXV6}px, -${translateYV6}px)`;

    elementV7.style.transform = `translate(${translateXV7}px, -${translateYV7}px)`;

    elementV8.style.transform = `translate(${translateXV8}px, -${translateYV8}px)`;

    elementSombra1.style.transform = `scale(${scaleSombra})`;

    elementSombra2.style.transform = `scale(${scaleSombra})`;

    elementSombra3.style.transform = `scale(${scaleSombra})`;

});