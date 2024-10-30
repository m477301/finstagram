import React, {useContext, useState, useEffect} from 'react'

import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom';

import CreatePostForm from './components/CreatePostForm';
import Menu from './components/Menu';
import Post from "./components/Post"
import axios from 'axios';
import "../styles/Home.css"
import Sorting from "../services/Sorting"

function Home() {

  const navigate = useNavigate()
  const {login, setLogin} = useContext(AuthContext);
  const [menu, setMenu] = useState("show");
  const [posts, setPosts] = useState([])
  const [order, setOrder] = useState("newest");

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {

    let response = await axios.get(process.env.REACT_APP_SERVER_URL + "/posts",
      {
        headers: {
          authToken: localStorage.getItem("AuthToken")
        }
      }
    )

    if(response?.data?.error) {
      console.log("Error", response.data.error)
    } else if(response?.data) {
      setPosts(Sorting.sortPosts("newest", response.data))
    }
  }

  const onLogout = () => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }

  const deletePost = (id) => {
    setPosts(
      posts.filter((post) => post.id !== id)
    )
  }

  return (
    <div className='HomePage'>
      <Menu 
      setMenu={(value) => setMenu(value)}
      menu={menu}
      onLogout={onLogout}
      />
      <div className='Contents'>
      <div className='SubMenu'>
        <button onClick={() => {
          let orderedPosts = Sorting.sortPosts("newest", [...posts])
          setPosts(orderedPosts)
          }}>
          Newest
        </button>
        <button onClick={() => {
          let orderedPosts = Sorting.sortPosts("oldest", [...posts])
          setPosts(orderedPosts)
        }}>
          Oldest
        </button>
      </div>

      {
        menu === "show" 
        ?
          posts.map((value, key) => {
            return (
              <Post post={value} deletePost={deletePost}/>
            )
          })        
        :
        <CreatePostForm onCreate={(post) => {
          setPosts([{
            ...post,
            user: {
              username: login.username
            }
          }, ...posts])
          setMenu("show")
        }} />
      }
      </div>
    </div>
  )
}

export default Home