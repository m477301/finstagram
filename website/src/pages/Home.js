import React, {useContext} from 'react'

import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom';

import CreatePostForm from './components/CreatePostForm';
import "../styles/Home.css"

function Home() {

  const navigate = useNavigate()
  const {login, setLogin} = useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }

  return (
    <div className='HomePage'>
      Home
      <CreatePostForm />
      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home