import React from 'react'
import {useState} from 'react'
import axios from 'axios'


function ForgetPassword() {

  
  const [email, setEmail] = useState('')
  const [message,setMessage] = useState(false)


  async function forgetpass(event){
    event.preventDefault()
    const API_URL = "http://localhost:3001/api/auth/forgetPassword"
    const user = {
      email
    }
    axios.post(API_URL, user)
    .then(res=>{
      console.log(res.status);
      if(res.status === 201){
        // return navigate("/profile");
        setMessage("go check your email");

    }
  })
    .catch(err =>{
      console.log(err.response.data);
      setMessage(err.response.data);
    })
  }

  return (
    <div>
    <h1 className='mt-5'>Forget your password ?</h1>
    <p>Enter your email and you will resive Validation message after few second </p>

    <form onSubmit={forgetpass}>
    {message && <div className='text-danger'> {message}</div>}
        <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required />      
        <input type="submit" value="Confirme" />
      </form>

    </div>
  )
}

export default ForgetPassword