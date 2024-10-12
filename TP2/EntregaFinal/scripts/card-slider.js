let featuredGames = [
    {
        "imagen": "https://images.crazygames.com/free-the-cat-puzzle-game_16x9/20231113164504/free-the-cat-puzzle-game_16x9-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Free The Cat Puzzle",
        "precio": 0.00,
        "es_gratis": true,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/cats-and-bees/20230106042701/cats-and-bees-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Cats and Bees",
        "precio": 29.99,
        "es_gratis": false,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/cat-bakery_16x9/20240320084916/cat-bakery_16x9-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Cat Bakery",
        "precio": 46,
        "es_gratis": false,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/push-push-cat/20230214072349/push-push-cat-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Push Push Cat",
        "precio": 22,
        "es_gratis": false,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/trap-the-cat-pix_16x9/20240315041246/trap-the-cat-pix_16x9-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Trap The Cat",
        "precio": 0.00,
        "es_gratis": true,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/funny-kitty-care/20220512164504/funny-kitty-care-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Funny Kitty Care",
        "precio": 29.99,
        "es_gratis": false,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/games/strikeforce-kitty/cover-1670391803483.png?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Strikeforce Kitty",
        "precio": 46,
        "es_gratis": false,
        "categoria": "Destacados"
    },
    {
        "imagen": "https://images.crazygames.com/kity-builder/20210504122712/kity-builder-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=1920&h=1080&fit=crop",
        "nombre_del_juego": "Kitty Builder",
        "precio": 22,
        "es_gratis": false,
        "categoria": "Destacados"
    }
]


createFeaturedCards(featuredGames);


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




let container = document.getElementById('container2');
let featuredCards = document.getElementById('featured-cards');
let cards = document.getElementsByClassName('featured-card').length;
let buttons = document.getElementsByClassName('slide-btn');

let currentPosition = 0;
let currentMargin = 0;
let cardsPerPage = 0;
let cardsCount = cards - cardsPerPage;
let containerWidth = container.offsetWidth;
let prevKeyActive = false;
let nextKeyActive = true;

window.addEventListener("resize", checkWidth);

function checkWidth() {
    containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        cardsPerPage = 1;
    } else {
        if (w < 901) {
            cardsPerPage = 2;
        } else {
            if (w < 1101) {
                cardsPerPage = 3;
            } else {
                cardsPerPage = 4;
            }
        }
    }
    cardsCount = cards - cardsPerPage;
    if (currentPosition > cardsCount) {
        currentPosition -= cardsPerPage;
    };
    currentMargin = - currentPosition * (100 / cardsPerPage);
    featuredCards.style.marginLeft = currentMargin + '%';
    if (currentPosition > 0) {
        buttons[0].classList.remove('inactive');
    }
    if (currentPosition < cardsCount) {
        buttons[1].classList.remove('inactive');
    }
    if (currentPosition >= cardsCount) {
        buttons[1].classList.add('inactive');
    }
}

setParams();

function slideRight(){
    if (currentPosition != 0) {
        featuredCards.style.marginLeft = currentMargin + (100 / (cardsPerPage - 0.1)) + '%';
        currentMargin += (100 / (cardsPerPage - 0.1));
        currentPosition--;
    };
    if (currentPosition === 0) {
        buttons[0].classList.add('inactive');
    };
    if (currentPosition < cardsCount) {
        buttons[1].classList.remove('inactive');
    };

}

function slideLeft(){
    if (currentPosition != cardsCount) {
        featuredCards.style.marginLeft = currentMargin - (100 / (cardsPerPage - 0.1)) + '%';
        currentMargin -= (100 / (cardsPerPage - 0.1));
        currentPosition++;
    };
    if (currentPosition === cardsCount) {
        buttons[1].classList.add('inactive');
    };
    if (currentPosition > 0) {
        buttons[0].classList.remove('inactive');
    };
}