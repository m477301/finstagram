import React from 'react'
import "../../styles/Form.css"
import axios from 'axios'
import { toast } from "react-toastify"

function CreatePostForm(props) {
    const createPost = async (e) => {
        e.preventDefault();

        let response = await axios.post("http://localhost:5555/posts",
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

        console.log("RESPONSE", response?.data)

        props.onCreate(response?.data);
        toast.success("Post has been Created");

    }

  return (
    <form className="Form" onSubmit={createPost}>
        <input type="text" className='TitleInput'/>
        <textarea className='DescriptionArea'/>
        <button type="submit">
            Create Post
        </button>
    </form>
  )
}

export default CreatePostForm