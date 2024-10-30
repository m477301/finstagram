import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../services/AuthContext'
import "../../styles/Post.css"
import axios from 'axios'
import { toast } from "react-toastify"
import DateService from "../../services/Date"
import Images from "../../services/Images"

function Post(props) {

    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if(props?.username) {
            setUsername(props?.username)
        } else if(props?.post?.user?.username) {
            setUsername(props?.post?.user?.username);
        }

        onGetImage("1729767751459-Dimonika02.jpg");
    }, [props])

    const onGetImage = async (key) => {
        let getImage = await Images.getPostImage(key);
        const imageBlob = new Blob([getImage])        
        console.log("get", imageBlob)
        setImage(imageBlob);
    }

    const onDelete = async () => {

        let response = await axios.delete(process.env.REACT_APP_SERVER_URL + "/posts/" + String(props?.post?.id),
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
        )
        props.deletePost(props?.post?.id)
        toast.success("You have Deleted Your Post")

    }
 
    return (
        <div className='Post'>
            {
                image ? 
                <img width="100%" src={URL.createObjectURL(image)} alt="Post"/>
                :
                <>Loading...</>
            }
            <div>{props?.post?.title}</div>
            <div>{props?.post?.description}</div>
            <div>{DateService.formatDate(props?.post?.createdAt)}</div>
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