import React from 'react'
import "../../styles/Menu.css"

function Menu(props) {
  return (
    <div className="Menu">
        <div className='start'>
            <button onClick={() => {props.setMenu("show")}}>
                SHOW
            </button>
            <button onClick={() => {props.setMenu("create")}}>
                CREATE
            </button>
        </div>

        <div>
            <button onClick={() => {props.onLogout()}}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Menu