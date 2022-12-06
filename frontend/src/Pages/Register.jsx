import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function Register() {

const navigate = useNavigate();


const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [role, setRole] = useState('')
const [message,setMessage] = useState(false);

async function registerUser(event){
  event.preventDefault()
  const API_URL = "http://localhost:3001/api/auth/register"
  const user = {
    username,
    email,
    password,
    role
  }
  axios.post(API_URL, user)

  .then(res => {
  
    if(res.status === 201){
      return navigate("/validationMsg");
    }
     // setMessage(Resporesnse.data.message);
  })
  .catch(err => {
    // console.log(err.response.data);
    setMessage(err.response.data.message);
  })
  
  }  

  return (
    <div>
       <section className='area-login'>
    <h1>Register</h1>
    <div className='login'>
    {message && <div className='text-danger alert alert-danger mt-5 w-100 py-1 text-center border border-2 border-danger'> {message}</div>}
      <form onSubmit={registerUser}>
        <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="UserName" required />
        <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required />
        
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"required />
          <input type="password" name="passwordTwo" placeholder="Conforming Password" required/>
          
        <select  name="role" value={role}  onChange={(e)=> setRole(e.target.value)} id="role">
        <option >Select Role</option>
          <option value="client">client</option>
          <option value="livreure">livreure</option>
        </select>

        <input type="submit" value="Confirme" />
      </form>
      <p>Back to login ?<Link to= '/'>Click</Link>
</p>
    </div>
  </section>
    </div>
  )
}

export default Register