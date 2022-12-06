import React from 'react'
import { useParams } from "react-router-dom";
import {useState} from 'react'
import axios from 'axios'
 import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  let token = useParams();
      token = token.token
   const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [message,setMessage] = useState(false)


  async function resetUser(event){
    event.preventDefault()
    const API_URL = `http://localhost:3001/api/auth/resetPassword/${token}`
    const user = {
      password,
    }
    axios.post(API_URL, user)

    .then(res=>{
      if(res.status === 201){
       return navigate("/");
    }
  })
    .catch(err =>{
      // console.log(err.response.data);
      setMessage(err.response.data);
      // setTimeout(() => {
      //   setMessage(null)
      // }, 8000);


    })
  }



  return (
    <div>
      <section className="area-login">
    <div className="login">
         {message && <div className='text-danger alert alert-danger mt-5 w-100 py-1 text-center border border-2 border-danger'> {message}</div>}
      <h1>Reset Password</h1>

      <form onSubmit={resetUser}>

      <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"required />
          <input type="password" name="passwordTwo" placeholder="Conforming Password" required/>
         
  
        <input type="submit" value="Confirme" />
      </form>
     

    </div>
  </section>
      </div>
  )
}

export default ResetPassword