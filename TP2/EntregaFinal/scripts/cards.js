let gameCategories = [
    {
        nombre: "Accion",
        imagen: "src/categorias/accion.png"
    },
    {
        nombre: "Armas",
        imagen: "src/categorias/armas.png"
    },
    {
        nombre: "Baloncesto",
        imagen: "src/categorias/baloncesto.png"
    },
    {
        nombre: "Bolas",
        imagen: "src/categorias/bolas.png"
    },
    {
        nombre: "Carreras",
        imagen: "src/categorias/carreras.png"
    },
    {
        nombre: "Cartas",
        imagen: "src/categorias/cartas.png"
    },
    {
        nombre: "Clasicos",
        imagen: "src/categorias/clasicos.png"
    },
    {
        nombre: "Cocinar",
        imagen: "src/categorias/estrategia.png"
    },
    {
        nombre: "Dinosaurios",
        imagen: "src/categorias/dinosaurios.png"
    },
    {
        nombre: "Escape",
        imagen: "src/categorias/escape.png"
    },
    {
        nombre: "Estrategia",
        imagen: "src/categorias/estrategia.png"
    },
    {
        nombre: "Futbol",
        imagen: "src/categorias/futbol.png"
    },
    {
        nombre: "Guerra",
        imagen: "src/categorias/guerra.png"
    },
    {
        nombre: "Infantiles",
        imagen: "src/categorias/infantiles.png"
    },
    {
        nombre: "Matematicas",
        imagen: "src/categorias/matematicas.png"
    },
    {
        nombre: "Mesa",
        imagen: "src/categorias/mesa.png"
    },
    {
        nombre: "Motos",
        imagen: "src/categorias/motos.png"
    },
    {
        nombre: "Multijugador",
        imagen: "src/categorias/multijugador.png"
    },
    {
        nombre: "Pintar",
        imagen: "src/categorias/pintar.png"
    },
    {
        nombre: "Terror",
        imagen: "src/categorias/terror.png"
    }
];

let games = [
    {
        "imagen": "src/games/4_en_linea.webp",
        "nombre_del_juego": "Mortal Kombat",
        "precio": 0.00,
        "es_gratis": true,
        "categoria": "Accion"
    },
    {
        "imagen": "src/games/4_en_linea.webp",
        "nombre_del_juego": "Ajedrez",
        "precio": 29.99,
        "es_gratis": false,
        "categoria": "Estrategia"
    },
    {
        "imagen": "src/games/4_en_linea.webp",
        "nombre_del_juego": "TEG",
        "precio": 46,
        "es_gratis": false,
        "categoria": "Estrategia"
    },
    {
        "imagen": "src/games/4_en_linea.webp",
        "nombre_del_juego": "Call Of Duty",
        "precio": 22,
        "es_gratis": false,
        "categoria": "Accion"
    }
]




createCategories(gameCategories);

function createCategories(gameCategories) {
    let categoriesContainer = document.querySelector('.game-categories');
    gameCategories.forEach(category => {
        categoriesContainer.innerHTML +=
        `
            <section class="category" id="category-${category.nombre}">
                <h2 class="category-name"> ${category.nombre} </h2>
                <div  class="cards" id="${category.nombre}-cards">
                </div>
            </section>
        `
        createCards(games, category); 
    });
}

function createCards(games, category) {
    let cardsContainer = document.getElementById(`${category.nombre}-cards`)
    games.forEach(game => {
        if (category.nombre.toLowerCase() === game.categoria.toLowerCase()) {
            let textPrice;
            let textBtn;
            if (game.es_gratis) {
                textPrice = "Gratis";
                textBtn = "Jugar";

            } else {
                textPrice = `$${game.precio}`;
                textBtn = "Comprar";
            }
            cardsContainer.innerHTML +=
                `
            <div class="card" id="card-${game.nombre_del_juego}">
                        <img class="card-image" src="${game.imagen}" alt="${game.nombre_del_juego}">
                        <div class="card-description">
                            <h3 class="card-name">${game.nombre_del_juego}</h3>
                            <div class="card-bottom-container">
                                <p class="card-price">${textPrice}</p>
                                <button class="card-btn">${textBtn}</button> 
                            </div>
                        </div>
                    </div>    
            `
        }
    });
}



