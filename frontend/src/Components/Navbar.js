import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
    <div class="nav-wrapper dark">
      <Link to="#" class="brand-logo">Blog App</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/home">Home </Link></li>
        <li><Link to="/createpost">Create</Link></li>
        <li><Link to="">Logout</Link></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}

export default Navbar