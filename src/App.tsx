import { ChangeEvent, useState } from 'react';
import './App.css'

function App() {

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }
  
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    let password = e.target.value;
    checkIfTwelveChar(password);
    checkIfOneLowercase(password);
    checkIfOneUppercase(password);
    checkIfOneDigit(password);
    checkIfOneSpecialChar(password);
  }
  
  const checkIfTwelveChar = (text: string) => {
    return text?.length >= 12;
  }
  
  const checkIfOneLowercase = (text: string) => {
    return /[a-z]/.test(text);
  }
  
  const checkIfOneUppercase = (text: string) =>  {
    return /[A-Z]/.test(text);
  }
  
  const checkIfOneDigit = (text: string) =>  {
    return /[0-9]/.test(text);
  }
  
  const checkIfOneSpecialChar = (text: string) =>  {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(text);
  }

  return (
    <>
      <h1>Password Strength Checker</h1>
      <input
          type={!showPassword ? "password" : "text"}
          id="password"
          name="passwordType"
          aria-label="Enter a password:"
          onChange={handlePassword}
        />
        <span>
          <button
            id="togglePW"
            type="button"
            onClick={togglePassword}
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
        <h1>Hackability</h1>
    </>
  )
}

export default App
