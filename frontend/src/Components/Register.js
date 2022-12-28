import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState('');
  const PostData = async ()=>{
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!email || !password || !confirmpassword){
        return M.toast({html:"All Fields are manadatory", classes: '#e57373 red lighten-2'})
    }
    if(password.length <8 || password.match(regularExpression)){
        return M.toast({
            html:"Password must be 8 characters long and contain at least 1 number 1 special character"
        , classes: '#e57373 red lighten-2'})
    }
    if(password!=confirmpassword){
        return M.toast({html:"Passwords donot Match", classes: '#e57373 red lighten-2'})
    }
    
    await fetch('http://localhost:8000/api/users/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email:email,
            password:password,
            confirmpassword:confirmpassword
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.message){
            M.toast({html: data.error, classes: '#e57373 red lighten-2'})
        } else{
            M.toast({html: data.message, classes: '#a5d6a7 green lighten-3'})
        }
        console.log(data.message)
    }).catch((err)=>{
        console.log(err)
    })
  }
    return (
    <div className='mycard authcard input-field'>
        <div className='card'>
            <h2>Sign Up</h2>
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
            <input
                type={'text'}
                placeholder={"Confirm Password"}
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
<button className=" signupbtn btn waves-effect waves-light" onClick={()=> PostData()}>Signup
    
  </button>
  <p>
    <span>Already Have an account?</span><Link to='/login'> Login</Link>
  </p>
        </div>
    </div>
  )
}

export default Register