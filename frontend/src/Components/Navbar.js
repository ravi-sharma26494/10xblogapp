import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const logouthandler = async()=>{
        const res = await axios.post('http://localhost:8000/api/users/logout').then((response)=>{
          
          navigate('/');
        })
    }
  return (
    <div>
        <nav>
    <div class="nav-wrapper dark">
      <Link to="#" class="brand-logo">Blog App</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/home">Home </Link></li>
        <li><Link to="/createpost">Create</Link></li>
        <li><Link to="" onClick={logouthandler}>Logout</Link></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}

export default Navbar