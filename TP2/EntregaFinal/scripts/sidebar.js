//El ARRY
const categorias = [
    {
        "nombre" :"Accion",
        "imagen" : "src/categorias/accion.png"   
    }, 
    {
        "nombre" : "Armas",
        "imagen" : "src/categorias/armas.png"
    },
    {
        "nombre" : "Baloncesto",
        "imagen" : "src/categorias/baloncesto.png"
    },
    {
        "nombre" : "Bolas",
        "imagen" : "src/categorias/bolas.png"
    },
    {
        "nombre" : "Carreras",
        "imagen" : "src/categorias/carreras.png"
    },
    {
        "nombre" : "Cartas",
        "imagen" : "src/categorias/cartas.png"
    },
    {
        "nombre" : "Clasicos",
        "imagen" : "src/categorias/clasicos.png"
    },
    {
        "nombre" : "Cocinar",
        "imagen" : "src/categorias/estrategia.png"
    },
    {
        "nombre" : "Dinosaurios",
        "imagen" : "src/categorias/dinosaurios.png"
    },
    {
        "nombre" : "Escape",
        "imagen" : "src/categorias/escape.png"
    }
    ,
    {
        "nombre" : "Estrategia",
        "imagen" : "src/categorias/estrategia.png"
    },
    {
        "nombre" : "Futbol",
        "imagen" : "src/categorias/futbol.png"
    },
    {
        "nombre" : "Guerra",
        "imagen" : "src/categorias/guerra.png"
    },
    {
        "nombre" : "Infantiles",
        "imagen" : "src/categorias/infantiles.png"
    },
    {
        "nombre" : "Matematicas",
        "imagen" : "src/categorias/matematicas.png"
    },
    {
        "nombre" : "Mesa",
        "imagen" : "src/categorias/mesa.png"
    },
    {
        "nombre" : "Motos",
        "imagen" : "src/categorias/motos.png"
    },
    {
        "nombre" : "Multijugador",
        "imagen" : "src/categorias/multijugador.png"
    },
    {
        "nombre" : "Pintar",
        "imagen" : "src/categorias/pintar.png"
    },
    {
        "nombre" : "Terror",
        "imagen" : "src/categorias/terror.png"
    }
];


const onPageLoad = () => {
    let categoriasHTML = document.getElementById("nav-bar");;
    categorias.forEach(categoria => {
        categoriasHTML.innerHTML += 
            `<div>
                <img src="${categoria.imagen}" class="icon" alt="${categoria.nombre}">
                <p class="icon-name" >${categoria.nombre}</p>
            </div>`;
    });

};


function agregarClase() {
    const categorias = document.querySelectorAll('.icon-name');
    document.getElementById("nav-bar").classList.toggle('nav-deploy'); 
    categorias.forEach(elemento => {
        elemento.classList.toggle('parr-deploy');
    }); 
}


/*
function quitarClase() {
    const categorias = document.querySelectorAll('.icon-name');
    categorias.forEach(elemento => {
        elemento.classList.remove('parr-deploy');
    });
}
*/

document.addEventListener("DOMContentLoaded", onPageLoad);
document.getElementById("burguer").addEventListener('click', agregarClase);


/*

        const contenedores = document.querySelectorAll('.contenedor');
        const hijos2 = document.querySelectorAll('.hijo2');

        contenedores.forEach(contenedor => {
            contenedor.addEventListener('mouseover', () => {
                hijos2.forEach(hijo => {
                    hijo.classList.add('mostrar'); // Aniadir la clase 'mostrar' a todos los hijo2
                });
            });

            contenedor.addEventListener('mouseout', () => {
                hijos2.forEach(hijo => {
                    hijo.classList.remove('mostrar'); // Quitar la clase 'mostrar' a todos los hijo2
                });
            });
        });
*/