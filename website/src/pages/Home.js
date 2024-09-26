import React, {useContext} from 'react'

import { AuthContext } from '../services/AuthContext'

function Home() {

  const {login} = useContext(AuthContext);

  return (
    <div style={{ color: "white"}}>
      Home
      { login ? " Logged In" : "Logged Out"}
    </div>
  )
}

export default Home