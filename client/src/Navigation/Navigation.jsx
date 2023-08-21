import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navigation.css'
import logo from '../assets/icon.png'
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function Navigation() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const { user, child } = useContext(UserContext);
  
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleLogout = async () => {
      try {
        // Call the backend logout controller
        const response = await axios.post('http://localhost:3001/logoutUser', );
  
        if (response.status === 200) {
          // Clear the token from local storage
          localStorage.removeItem('token');
  
          // Redirect the user to the home page
          navigate('/');
  
          // Perform any additional logout logic here
          console.log('Logged out');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <div className='nav'>
      <div className="logo">
       <img src={logo} alt="" /> 
      </div>

     
      <div className="nav-right">

      <div className="dropdown">
            <button className="dropdown-toggle" onClick={handleDropdownToggle}>
              <i className="fa-solid fa-user"></i>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Settings</button>
                <button className="dropdown-item">Subscriptions</button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

      </div>

    

    </div>
  )
}

export default Navigation

