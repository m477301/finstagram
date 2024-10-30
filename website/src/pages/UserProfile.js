import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios";
import "../styles/UserProfile.css"
import Post from "./components/Post"
import Menu from "./components/Menu"

function UserProfile() {
    const {username} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, [username])

    const fetchData = async () => {
        let response = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/posts/" + username,
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
        )

        setPosts(response?.data)
    }

    return (
        <div className='UserProfile'>
            <div className='UserStats'>
                <p className='Username'>Username: {username}</p>
            </div>
            <div className='Posts'>
                {
                    posts.length >= 1 && posts?.map((value) => {
                        return <Post 
                                    post={value} 
                                    username={username}
                                />
                    })
                }
            </div>
            <Menu />
        </div>
    )
}

export default UserProfile