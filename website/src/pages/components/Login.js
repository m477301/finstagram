import React, {useContext}  from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../services/AuthContext";

import "../../styles/SignUp.css";
import { toast } from "react-toastify"

import Validation from "../../services/Validation";

function Login(props) {

  const navigate = useNavigate();
  const {setLogin} = useContext(AuthContext);

  async function onLogin(e) {

    e.preventDefault();

    if(Validation.isEmail(e.target[0].value)) {
      console.log("EMAIL", e.target[0].value)
    }

    let response = await axios.post(process.env.REACT_APP_SERVER_URL + "/users/login",
      {
        ...(Validation.isEmail(e.target[0].value) ? {email: e.target[0].value} : {username: e.target[0].value}),
        password: e.target[1].value
      }
    )

    if(response?.data?.error) {
      console.log("Error", response.data.error);
    } else if(response?.data?.status) {
      setLogin({
        username: response?.data?.username,
        email: response?.data?.email,
        status: response?.data?.status,
      });
      localStorage.setItem("AuthToken", response?.data?.authToken)
      navigate("/home");
      toast.success("You have logged in")
    }

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