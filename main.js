
import './css/bootstrap.min.css';
import './css/styles.css';
import './js/checkpw.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1 class="display-3 text-center">Password Strength Checker</h1>
    <div class="input-group">
      <input
        type="password"
        id="password"
        class="form-control"
        name="passwordType"
        aria-label="Enter a password:"
        onkeyup="getPassword()"/>
      <span class="input-group-btn">
        <button
          id="togglePW"
          class="btn btn-secondary"
          type="button"
          style="cursor:pointer;"
          onclick="togglePassword()">
          Show Password
        </button>
      </span>
    </div>
    <br/>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Password has:</h1>
        <ul class="lead list-group" id="requirements">
          <li id="length" class="list-group-item">At least 8 characters</li>
          <li id="lowercase" class="list-group-item">At least 1 lowercase letter</li>
          <li id="uppercase" class="list-group-item">At least 1 uppercase letter</li>
          <li id="number" class="list-group-item">At least 1 numerical number</li>
          <li id="special" class="list-group-item">At least 1 special character</li>
        </ul>
      </div>
    </div>
  </div>
`;
