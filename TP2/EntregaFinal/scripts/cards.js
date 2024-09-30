let games = [
    {
        "imagen": "src/cards/4_en_linea.webp",
        "nombre_del_juego": "Mortal Kombat",
        "precio": 0.00,
        "es_gratis": true,
        "categoria": "Acción"
    },
    {
        "imagen": "src/cards/4_en_linea.webp",
        "nombre_del_juego": "Ajedrez",
        "precio": 29.99,
        "es_gratis": false,
        "categoria": "Estrategia"
    },
    {
        "imagen": "src/cards/4_en_linea.webp",
        "nombre_del_juego": "TEG",
        "precio": 46,
        "es_gratis": false,
        "categoria": "Estrategia"
    },
    {
        "imagen": "src/cards/4_en_linea.webp",
        "nombre_del_juego": "Call Of Duty",
        "precio": 22,
        "es_gratis": false,
        "categoria": "Acción"
    }
];

let gameCategories = [
    "Acción",
    "Aventura",
    "Estrategia",
    // "Deportes",
    // "Carreras",
    // "Simulación",
    // "RPG",
    // "Multijugador",
    // "Rompecabezas",
    // "Terror"
];

createCategories(gameCategories);

function createCategories(gameCategories){
    let categoriesContainer = document.querySelector('.game-categories');
    gameCategories.forEach(category => {
    categoriesContainer.innerHTML += 
    `
            <section class="category" id="category-${category}">
                <h2 class="category-name"> ${category} </h2>
                <div  class="cards" id="${category}-cards">
                </div>
            </section>
    `
    createCards(games, category);
    });

}



function createCards(games, category){
    let cardsContainer = document.getElementById(`${category}-cards`)
    games.forEach(game => {
        if(category.toLowerCase() === game.categoria.toLowerCase()){
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