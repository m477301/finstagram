import React, {useState} from 'react'
import "../../styles/Form.css"
import axios from 'axios'
import { toast } from "react-toastify"

function CreatePostForm(props) {

    const [image, setImage] = useState({})

    const createPost = async (e) => {
        e.preventDefault();

        let response = await axios.post(process.env.REACT_APP_SERVER_URL + "/posts",
            {
                title: e.target[0].value,
                description: e.target[1].value
            },
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken") 
                }
            }
        )

        if(response?.data) {

            const data = new FormData();
            data.append('file', image)


            let imageResponse = await axios.post(
                process.env.REACT_APP_SERVER_URL + "/images/upload",
                data,
                {
                    headers: {
                        authToken: localStorage.getItem("AuthToken") 
                    }
                }
            )

        } 

        console.log("RESPONSE", response?.data)

        props.onCreate(response?.data);
        toast.success("Post has been Created");

    }

    const onSetImage = (e) => {
        setImage(e.target.files[0]);
    }

  return (
    <form className="Form" onSubmit={createPost}>
        <input type="text" className='TitleInput'/>
        <textarea className='DescriptionArea'/>
        <input 
            type="file"
            accept="image/png, image/jpeg" 
            onChange={onSetImage}
        />
        <button type="submit">
            Create Post
        </button>
    </form>
  )
}

export default CreatePostForm