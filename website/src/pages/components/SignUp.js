import React  from 'react'
import axios from "axios";
import "../../styles/SignUp.css";

function SignUp(props) {

  async function onSignUp(e) {

    e.preventDefault();

    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users", 
      {
        email: e.target[0].value,
        password: e.target[1].value
      }
    )
  }
 
  return (
    <form className="Entry" onSubmit={onSignUp}>
      <h1 style={{color: "white"}}>SIGN UP</h1>
      <input type="text" />
      <input type="password" />
      <button type="submit">Sign Up</button>
      <button 
        type="button"
        onClick={() => props.changeToLogin()}
      >Log In</button>
    </form>
  )
}

export default SignUp