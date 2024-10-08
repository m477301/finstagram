import React, {useContext, useState, useEffect} from 'react'

import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom';

import CreatePostForm from './components/CreatePostForm';
import Menu from './components/Menu';
import Post from "./components/Post"
import axios from 'axios';
import "../styles/Home.css"

function Home() {

  const navigate = useNavigate()
  const {login, setLogin} = useContext(AuthContext);
  const [menu, setMenu] = useState("show");
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {

    let response = await axios.get("http://localhost:5555/posts",
      {
        headers: {
          authToken: localStorage.getItem("AuthToken")
        }
      }
    )

    if(response?.data?.error) {
      console.log("Error", response.data.error)
    } else if(response?.data) {
      setPosts(response.data)
    }

  }

  const onLogout = () => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }

  return (
    <div className='HomePage'>
      <Menu 
      setMenu={(value) => setMenu(value)}
      onLogout={onLogout}
      />
      <div className='Contents'>

      {
        menu === "show" 
        ?
          posts.map((value, key) => {
            return (
              <Post post={value}/>
            )
          })        
        :
        <CreatePostForm />
      }
      </div>
    </div>
  )
}

export default Home