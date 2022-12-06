import React from 'react'
import {Link} from 'react-router-dom'


function ValidationMsg() {
  return (
    <div>
        <h1>Email validation</h1>
        <p>Validate your email By clicking on the the mail that we send you</p>
        <p>Here to login after validation ?<Link to= '/'>Click</Link></p>

        
        </div>
    
  )
}

export default ValidationMsg