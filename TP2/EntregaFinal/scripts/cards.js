/* import { gameCategories } from "../resources/categories.json"; */
/* import { featuredGames } from "../resources/featuredGames.json";
import { games } from "../resources/games.json"; */

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

// function traerCategorias() {
//     fetch('./resources/categories.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al cargar el archivo JSON'); 
//             }
//             return response.json();
//         })
//             .then(gameCategories => {
//                 console.log(gameCategories); 
//             })
//     .catch(error => {
//         console.error('Se produjo un error:', error);
//     });    
// }


createCategories(gameCategories);
// createFeaturedCards(featuredGames);

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
        // createCards(games, category); 
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

function createFeaturedCards(featuredGames) {
    let featuredCardsContainer = document.getElementById('featured-cards')
    featuredGames.forEach(game => {
        let textPrice;
        let textBtn;
        if (game.es_gratis) {
            textPrice = "Gratis";
            textBtn = "Jugar";

        } else {
            textPrice = `$${game.precio}`;
            textBtn = "Comprar";
        }
        featuredCardsContainer.innerHTML +=
            `
                <div class="card featured-card">
                            <img class="ft-card-image" src="${game.imagen}" alt="${game.nombre_del_juego}">
                            <div class="card-description">
                                <h3 class="card-name">${game.nombre_del_juego}</h3>
                                <div class="ft-card-bottom-container">
                                    <p class="card-price">${textPrice}</p>
                                    <button class="card-btn">${textBtn}</button> 
                                </div>
                            </div>
                        </div>    
                `
        
    });
}

