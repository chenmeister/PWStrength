function getPassword() {
    var text = document.getElementById('password').value;

    var length = document.getElementById('length');
    var lowercase = document.getElementById('lowercase');
    var uppercase = document.getElementById('uppercase');
    var number = document.getElementById('number');
    var special = document.getElementById('special');

    if(text.length === 0){
        length.classList.remove('not-met');
        lowercase.classList.remove('not-met');
        uppercase.classList.remove('not-met');
        number.classList.remove('not-met');
        special.classList.remove('not-met');
    } else {
        checkIfEightChar(text) ? length.classList.remove('not-met') : length.classList.add('not-met');
        checkIfOneLowercase(text) ? lowercase.classList.remove('not-met') : lowercase.classList.add('not-met');
        checkIfOneUppercase(text) ? uppercase.classList.remove('not-met') : uppercase.classList.add('not-met');
        checkIfOneDigit(text) ? number.classList.remove('not-met') : number.classList.add('not-met');
        checkIfOneSpecialChar(text) ? special.classList.remove('not-met') : special.classList.add('not-met');
    }

}

function checkIfEightChar(text){
    return text.length >= 8;
}

function checkIfOneLowercase(text) {
    return /[a-z]/.test(text);
}

function checkIfOneUppercase(text) {
    return /[A-Z]/.test(text);
}

function checkIfOneDigit(text) {
    return /[0-9]/.test(text);
}

function checkIfOneSpecialChar(text) {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(text);
}

function togglePassword() {
    var passInput = document.getElementById('password');
    var togglePW = document.getElementById('togglePW');

    passInput.type === "password" ? passInput.type = "text" : passInput.type = "password";
    togglePW.textContent === "Show Password" ? togglePW.textContent = "Hide Password" : togglePW.textContent = "Show Password";
}