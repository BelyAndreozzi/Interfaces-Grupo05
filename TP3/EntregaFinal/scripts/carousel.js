const mediaQuery = window.matchMedia("(max-width: 900px)");

function handleMediaQueryChange(event) {
    if (event.matches) {
        let container = document.querySelector(".containerMiniCarusel");
        let innerContainer = document.querySelector(".inner-container");

        let pressed = false;
        let startX;
        let x;

        container.addEventListener("touchstart", (e) => {
            pressed = true;
            startX = e.touches[0].clientX - innerContainer.offsetLeft;
        });

        container.addEventListener("touchmove", (e) => {
            if (!pressed) return;
            e.preventDefault();

            x = e.touches[0].clientX;
            innerContainer.style.left = `${x - startX}px`;
            boundItems();
        });

        container.addEventListener("touchend", () => {
            pressed = false;
        });

        let boundItems = () => {
            let outer = container.getBoundingClientRect();
            let inner = innerContainer.getBoundingClientRect();

            if (parseInt(innerContainer.style.left) > 0) {
                innerContainer.style.left = "0px";
            }

            if (inner.right < outer.right) {
                innerContainer.style.left = `-${inner.width - outer.width}px`;
            }
        };

    } else {
        const carousel = document.querySelector('.carousel');
        let carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
        
        const nextButton = document.querySelector('.arrow.right');
        const prevButton = document.querySelector('.arrow.left');
        
        const visibleItems = 3;
        let currentIndex = visibleItems;
        const realItemsCount = carouselItems.length; 
        const itemsToClone = visibleItems; 
        
        for (let i = 0; i < itemsToClone; i++) {
            const firstClone = carouselItems[i].cloneNode(true);
            const lastClone = carouselItems[carouselItems.length - 1 - i].cloneNode(true);
            carousel.appendChild(firstClone); 
            carousel.insertBefore(lastClone, carousel.firstChild); 
        }
        
        carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
        
        function updateCarousel(transition = true) {
            
            if (!transition) {
                carousel.style.transition = 'none';
            } else {
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }
        
            const offset = -currentIndex * (100 / visibleItems);
            carousel.style.transform = `translateX(${offset}%)`;
        
            const centralItemIndex = currentIndex % realItemsCount;
        
            carouselItems.forEach((item, index) => {
                item.classList.remove('central');
                const relativeIndex = (index - currentIndex + carouselItems.length) % carouselItems.length;
                if (relativeIndex === Math.floor(visibleItems / 2)) {
                    item.classList.add('central');
                }
            });
        }
        
        function resetTransition() {
            carousel.style.transition = 'none';
            updateCarousel(false);
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }
        
        function nextItem() {
            currentIndex++;
            updateCarousel();
        
            if (currentIndex >= realItemsCount + visibleItems) {
                setTimeout(() => {
                    currentIndex = visibleItems; 
                    resetTransition();
                }, 500); 
            }
        }
        
        function prevItem() {
            currentIndex--;
            updateCarousel();
        
            if (currentIndex < 0) {
                setTimeout(() => {
                    currentIndex = realItemsCount - 1;
                    resetTransition();
                }, 500); 
            }
        }
        
        nextButton.addEventListener('click', nextItem);
        prevButton.addEventListener('click', prevItem);
        
        updateCarousel();
    }
}

mediaQuery.addEventListener("change", handleMediaQueryChange);


handleMediaQueryChange(mediaQuery);