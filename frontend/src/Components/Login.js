import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [formData, setFormData] = useState('');
  const PostData = async ()=>{
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!email || !password){
        return M.toast({html:"All Fields are manadatory", classes: '#e57373 red lighten-2'})
    }
    
    
    const res = await axios.post('http://localhost:8000/api/users/login',{
        email:email,
        password:password
    }).then((response)=>{
      navigate('/home')
    }).catch((err)=>{
      return M.toast({html: "Email or Password Invalid", classes: '#e57373 red lighten-2'})
    })
    
  }
    return (
    <div className='mycard authcard input-field'>
        <div className='card'>
            <h2>Login</h2>
            <input
                type={'text'}
                placeholder={"Email"}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input
                type={'text'}
                placeholder={"Password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            
<button className=" signupbtn btn waves-effect waves-light" onClick={()=> PostData()}>Login
    
  </button>
  <p>
    <span>Dont have an account?</span><Link to='/'> Signup Here</Link>
  </p>
        </div>
    </div>
  )
}

export default Login