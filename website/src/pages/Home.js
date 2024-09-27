import React, {useContext} from 'react'

import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()
  const {login, setLogin} = useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }

  return (
    <div style={{ color: "white"}}>
      Home
      { login ? " Logged In" : "Logged Out"}
      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home