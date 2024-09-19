import React  from 'react'
import axios from "axios";
import "../../styles/SignUp.css";

import Validation from "../../services/Validation";

function Login(props) {

  async function onLogin(e) {
    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value);

    if(Validation.isEmail(e.target[0].value)) {
      console.log("EMAIL", e.target[0].value)
    }

    axios.post("http://localhost:5555/users/login",
      {
        ...(Validation.isEmail(e.target[0].value) ? {email: e.target[0].value} : {username: e.target[0].value}),
        password: e.targer[1].value
      }
    )



    // axios.post(())
  }
 
  return (
    <form className="Entry" onSubmit={onLogin}>
      <h1 style={{color: "white"}}>LOG IN</h1>
      <input type="text" />
      <input type="password" />
      <button type="submit">Log In</button>
      <button 
        type="button"
        onClick={() => props.changeToSignUp()}
      >Sign Up</button>
    </form>
  )
}

export default Login