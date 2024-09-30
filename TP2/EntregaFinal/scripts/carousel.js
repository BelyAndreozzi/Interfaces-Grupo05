const repeat = false;
const noArrows = false;

const container = document.querySelector('.slider-container');
var slide = document.querySelectorAll('.slider-single');
var slideTotal = slide.length - 1;
var slideCurrent = -1;

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('a');
    const imgLeft = document.createElement('img');
    imgLeft.src = 'src/carousel/flecha-izquierda.png';
    imgLeft.alt = 'Flecha izquierda';
    imgLeft.style.width = '32px';
    imgLeft.style.height = '32px';
    leftArrow.classList.add('slider-left');
    leftArrow.appendChild(imgLeft);
    leftArrow.addEventListener('click', () => {
        slideLeft();
    });

    const rightArrow = document.createElement('a');
    const imgRight = document.createElement('img');
    imgRight.src = 'src/carousel/flecha-derecha.png'
    imgRight.alt = 'Flecha derecha';
    imgRight.style.width = '32px';
    imgRight.style.height = '32px';
    rightArrow.classList.add('slider-right');
    rightArrow.appendChild(imgRight);
    rightArrow.addEventListener('click', () => {
        slideRight();
    });

    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    var preactiveSlide = slide[slideCurrent > 0 ? slideCurrent - 1 : slideTotal];
    var activeSlide = slide[slideCurrent];
    var proactiveSlide = slide[slideCurrent < slideTotal ? slideCurrent + 1 : 0];

    slide.forEach((elem) => {
        elem.classList.remove('preactive', 'active', 'proactive');
        elem.style.transform = 'scale(0.8)';
    });

    preactiveSlide.classList.add('preactive');
    activeSlide.classList.add('active');
    proactiveSlide.classList.add('proactive');

    preactiveSlide.style.transform = 'translateX(-100%) scale(0.8)';
    activeSlide.style.transform = 'translateX(0) scale(1)';
    proactiveSlide.style.transform = 'translateX(100%) scale(0.8)';
}

function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    var preactiveSlide = slide[slideCurrent > 0 ? slideCurrent - 1 : slideTotal];
    var activeSlide = slide[slideCurrent];
    var proactiveSlide = slide[slideCurrent < slideTotal ? slideCurrent + 1 : 0];

    slide.forEach((elem) => {
        elem.classList.remove('preactive', 'active', 'proactive');
        elem.style.transform = 'scale(0.8)';
    });

    preactiveSlide.classList.add('preactive');
    activeSlide.classList.add('active');
    proactiveSlide.classList.add('proactive');

    preactiveSlide.style.transform = 'translateX(-100%) scale(0.8)';
    activeSlide.style.transform = 'translateX(0) scale(1)';
    proactiveSlide.style.transform = 'translateX(100%) scale(0.8)';
}

slideInitial();
