function getPassword() {
    var text = document.getElementById('password').value;
    console.log("Eight Char: "+checkIfEightChar(text));
    console.log("One Lowercase Char: "+checkIfOneLowercase(text));
    console.log("One Uppercase Char: "+checkIfOneUppercase(text));
    console.log("One Digit Char: "+checKIfOneDigit(text));

    var length = document.getElementById('length');

    checkIfEightChar(text) ? length.classList.remove('not-met') : length.classList.add('not-met');


}

function checkIfEightChar(text){
    return text.length >= 8;
}

function checkIfOneLowercase(text) {
    return text.match(/[a-z]/);
}

function checkIfOneUppercase(text) {
    return text.match(/[A-Z]/);
}

function checKIfOneDigit(text) {
    return text.match(/[0-9]/);
}

function togglePassword() {
    var passInput = document.getElementById('password');
    passInput.type === "password" ? passInput.type = 'text' : passInput.type = 'password';
}