import { ChangeEvent, useState } from 'react';
import './App.css'

function App() {

  const [showPassword, setShowPassword] = useState(false);
  const [isTwelveChar, setIsTwelveChar] = useState(false);
  const [isOneLower, setIsOneLower] = useState(false);
  const [isOneUpper, setIsOneUpper] = useState(false);
  const [isOneDigit, setIsOneDigit] = useState(false);
  const [isOneSpecialChar, setIsOneSpecialChar] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }
  
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    checkIfTwelveChar(password);
    checkIfOneLowercase(password);
    checkIfOneUppercase(password);
    checkIfOneDigit(password);
    checkIfOneSpecialChar(password);
  }
  
  const checkIfTwelveChar = (text: string) => {
    setIsTwelveChar(text?.length >= 12);
  }
  
  const checkIfOneLowercase = (text: string) => {
    setIsOneLower(/[a-z]/.test(text));
  }
  
  const checkIfOneUppercase = (text: string) =>  {
    setIsOneUpper(/[A-Z]/.test(text));
  }
  
  const checkIfOneDigit = (text: string) =>  {
    setIsOneDigit(/[0-9]/.test(text));
  }
  
  const checkIfOneSpecialChar = (text: string) =>  {
    setIsOneSpecialChar(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(text));
  }

  return (
    <div className="container">
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
        <li id="length" className={`${isTwelveChar && 'green'}`}>At least 12 characters</li>
        <li id="lowercase" className={`${isOneLower && 'green'}`}>
          At least 1 lowercase letter
        </li>
        <li id="uppercase" className={`${isOneUpper && 'green'}`}>
          At least 1 uppercase letter
        </li>
        <li id="number" className={`${isOneDigit && 'green'}`}>
          At least 1 numerical number
        </li>
        <li id="special" className={`${isOneSpecialChar && 'green'}`}>
          At least 1 special character
        </li>
      </ul>
    </div>
  )
}

export default App
