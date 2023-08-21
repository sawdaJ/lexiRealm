import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css'
import logo from '../assets/icon.png'

function Header() {
  return (
    <div className='nav'>
      <div className="logo">
        <Link to='/'><img src={logo} alt="" /> </Link>
      </div>
  
      <div className="nav-right">

         <div className="loginbtn">
        
            <Link to='/login'><button >Login</button> </Link>
         </div>

          <div className="regbtn">
           <Link to='/register'><button>Register</button> </Link>
         </div>

      </div>

    

    </div>
  )
}

export default Header

