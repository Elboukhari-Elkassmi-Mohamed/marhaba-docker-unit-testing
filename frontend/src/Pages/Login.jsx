import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';




function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message,setMessage] = useState(false)
  // const [isLoggedIn, setisLoggedIn] = useState(null);



  async function loginUser(event){
    event.preventDefault()
    const API_URL = "http://localhost:3001/api/auth/login"
    const user = {
      email,
      password
    }
    axios.post(API_URL, user,{withCredentials: true})

    .then(res=>{
       const token = res.data.token
       const role = res.data.role.role
      // setCookie(token,res.data)
      
      if(res.status === 201){
        localStorage.setItem("token",token)
        localStorage.setItem("role",role)

         return navigate("/profile");
    }
  })
    .catch(err =>{
      // console.log(err.response.data);
      setMessage(err.response.data);
      setTimeout(() => {
        setMessage(null)
      }, 8000);


    })
  }

  return (
    <div>
       <section className="area-login">
    <h1>Login!!!!!</h1>

    <div className="login">
    {message && <div className='text-danger alert alert-danger mt-5 w-100 py-1 text-center border border-2 border-danger'> {message}</div>}
      <form onSubmit={loginUser}>
        <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required />      
        <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"required />
  
        <input type="submit" value="Confirme" />
      </form>
      <p>Here to reset password ?<Link to= '/forgetpassword'>Click</Link></p>
      <p>Here to Register ?<Link to= '/register'>Click</Link></p>


    </div>
  </section>
    </div>
  )
}

export default Login