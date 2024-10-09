const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const formContainer = document.getElementById('formContainerJS');

signUpButton.addEventListener('click', () => {
	formContainer.classList.add("right-panel-active")
    console.log("signUpButton");
});

signInButton.addEventListener('click', () => {
	formContainer.classList.remove("right-panel-active")
    console.log("signInButton");
});