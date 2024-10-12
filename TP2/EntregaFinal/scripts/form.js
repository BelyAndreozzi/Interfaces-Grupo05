const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const formContainer = document.getElementById('formContainerJS');
const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');
const headerBtn = document.getElementsByClassName('text-img-btn')[0];


signUpButton.addEventListener('click', () => {
    formContainer.classList.add("right-panel-active")
    console.log("signUpButton");
});

signInButton.addEventListener('click', () => {
    formContainer.classList.remove("right-panel-active")
    console.log("signInButton");
});


regForm.addEventListener('submit', (e) => {
    /* e.preventDefault(); */

    headerBtn.querySelector('.button-text').classList.add('button-text-hidden');
});

logForm.addEventListener('submit', (e) => {
    /* e.preventDefault(); */
    
    headerBtn.querySelector('.button-text').classList.add('button-text-hidden');
});
