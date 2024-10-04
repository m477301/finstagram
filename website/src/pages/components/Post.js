import React from 'react'
import "../../styles/Post.css"

import axios from 'axios'

function Post(props) {

    const onDelete = async () => {

        console.log("ID", props?.post?.id)

        let response = await axios.delete("http://localhost:5555/posts/" + String(props?.post?.id),
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
        )

        console.log("respo", response.id)

    }
 
    return (
        <div className='Post'>
            <div>{props?.post?.title}</div>
            <div>{props?.post?.description}</div>
            <div>{props?.post?.user?.username}</div>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Post