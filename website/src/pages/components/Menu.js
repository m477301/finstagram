import React from 'react'
import "../../styles/Menu.css"
import HomeInactive from "../../assets/Home-Inactive.svg"
import HomeActive from "../../assets/Home-Active.svg"
import CreateInactive from "../../assets/Create-Inactive.svg"
import CreateActive from "../../assets/Create-Active.svg"

function Menu(props) {
  return (
    <div className="Menu">
        <div className='start'>
            <button onClick={() => {props.setMenu("show")}}>
                <img src={props.menu === "show" ? HomeActive : HomeInactive} alt={"Home"} />
            </button>
            <button onClick={() => {props.setMenu("create")}}>
                <img src={props.menu === "create" ? CreateActive : CreateInactive} alt={"Create"} />
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