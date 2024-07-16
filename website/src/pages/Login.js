import React  from 'react'
import axios from "axios";
import "../styles/Login.css";

function Login() {

  async function onSignUp(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value);

    let response = await axios.post(
      "http://localhost:5555/users", 
      {
        email: e.target[0].value,
        password: e.target[1].value
      }
    )

    alert(response);
  }
 
  return (
    <form className="Login" onSubmit={onSignUp}>
      <input type="text" />
      <input type="password" />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Login