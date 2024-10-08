import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../services/AuthContext'
import "../../styles/Post.css"
import axios from 'axios'
import { toast } from "react-toastify"

function Post(props) {

    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");

    useEffect(() => {

        if(props?.username) {
            setUsername(props?.username)
        } else if(props?.post?.user?.username) {
            setUsername(props?.post?.user?.username);
        }

    }, [props])

    const onDelete = async () => {

        let response = await axios.delete("http://localhost:5555/posts/" + String(props?.post?.id),
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
        )

        toast.success("You have Deleted Your Post")

    }
 
    return (
        <div className='Post'>
            <div>{props?.post?.title}</div>
            <div>{props?.post?.description}</div>
            <div>{props?.username ? props?.username : props?.post?.user?.username}</div>
            {
                login.username === username ?
                <button onClick={onDelete}>Delete</button>
                : <></>
            }
        </div>
    )
}

export default Post