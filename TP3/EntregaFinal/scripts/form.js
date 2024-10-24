const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const formContainer = document.getElementById('formContainerJS');
const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');
const headerBtn = document.getElementsByClassName('text-img-btn')[0];
const logSubmitBtn = document.querySelector("#logSubmitBtn");
const regSubmitBtn = document.querySelector("#regSubmitBtn");
const regBtnText = document.querySelector("#regBtnSubmitText");const logBtnText = document.querySelector("#logBtnSubmitText");
const dialogForm = document.querySelector("#loginForm");


signUpButton.addEventListener('click', () => {
    formContainer.classList.add("right-panel-active")
    console.log("signUpButton");
});

signInButton.addEventListener('click', () => {
    formContainer.classList.remove("right-panel-active")
    console.log("signInButton");
});


regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    headerBtn.querySelector('.button-text').classList.add('button-text-hidden');

    regBtnText.innerHTML = "¡Bienvenido! :) ";
    regSubmitBtn.classList.add("active");
    setTimeout(() => {
        hidePopover()
    }, 1000)
});

logForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    headerBtn.querySelector('.button-text').classList.add('button-text-hidden');

    logBtnText.innerHTML = "¡A jugar!";
    logSubmitBtn.classList.add("active");

    setTimeout(() => {
        hidePopover()
    }, 1000)
});


function hidePopover(){
    dialogForm.classList.add("hide-popover")
}