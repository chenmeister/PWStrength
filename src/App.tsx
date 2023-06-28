import './App.css'

function App() {

  // function togglePassword() {
  //   var passInput = document.getElementById('password');
  //   var togglePW = document.getElementById('togglePW');
  //   var buttonText = togglePW?.textContent.trim();
  
  //   passInput && passInput?.type === 'password'
  //     ? (passInput.type = 'text')
  //     : (passInput.type = 'password');
  //   togglePW && buttonText === 'Show Password'
  //     ? (togglePW.textContent = 'Hide Password')
  //     : (togglePW.textContent = 'Show Password');
  // }
  
  // function getPassword() {
  //   var text = document.getElementById('password')?.value;
  
  //   var length = document.getElementById('length');
  //   var lowercase = document.getElementById('lowercase');
  //   var uppercase = document.getElementById('uppercase');
  //   var number = document.getElementById('number');
  //   var special = document.getElementById('special');
  
  //   checkIfTwelveChar(text)
  //     ? length?.classList.add('list-group-item-success')
  //     : length?.classList.remove('list-group-item-success');
  //   checkIfOneLowercase(text)
  //     ? lowercase?.classList.add('list-group-item-success')
  //     : lowercase?.classList.remove('list-group-item-success');
  //   checkIfOneUppercase(text)
  //     ? uppercase?.classList.add('list-group-item-success')
  //     : uppercase?.classList.remove('list-group-item-success');
  //   checkIfOneDigit(text)
  //     ? number?.classList.add('list-group-item-success')
  //     : number?.classList.remove('list-group-item-success');
  //   checkIfOneSpecialChar(text)
  //     ? special?.classList.add('list-group-item-success')
  //     : special?.classList.remove('list-group-item-success');
  // }
  
  // function checkIfTwelveChar(text) {
  //   return text?.length >= 12;
  // }
  
  // function checkIfOneLowercase(text) {
  //   return /[a-z]/.test(text);
  // }
  
  // function checkIfOneUppercase(text) {
  //   return /[A-Z]/.test(text);
  // }
  
  // function checkIfOneDigit(text) {
  //   return /[0-9]/.test(text);
  // }
  
  // function checkIfOneSpecialChar(text) {
  //   return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(text);
  // }

  return (
    <>
      <h1>Password Strength Checker</h1>
      <input
          type="password"
          id="password"
          name="passwordType"
          aria-label="Enter a password:"
        />
        <span>
          <button
            id="togglePW"
            type="button"
          >
            Show Password
          </button>
        </span>
      
        <h1>Password has:</h1>
        <ul id="requirements">
          <li id="length">At least 12 characters</li>
          <li id="lowercase">
            At least 1 lowercase letter
          </li>
          <li id="uppercase">
            At least 1 uppercase letter
          </li>
          <li id="number">
            At least 1 numerical number
          </li>
          <li id="special">
            At least 1 special character
          </li>
        </ul>
    </>
  )
}

export default App
