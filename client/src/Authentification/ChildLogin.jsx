import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import childLoginimg from '../assets/childlogin.png'

const ChildLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform input validation
    const { username, password } = formData;
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/loginChild', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Child login successful
        navigate('/student');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="register-container">
    <div className="reg-left">
      <div className="reg-img">
        <img src={childLoginimg} alt="" />
      </div>
    </div>
    <div className="reg-right">
      <h5>Readers Login here!</h5>
      <form onSubmit={handleSubmit}>
      <input  
          type="text"  
          className="input" 
          placeholder="Username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} />
    
      <input 
          type="password" 
          className="input" 
          placeholder="Password"  
          name="password" 
          value={formData.password} 
          onChange={handleChange} />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="existing-account">
       Dont have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
    </>
  );
};

export default ChildLogin;


/*  <div className="register-container">
        <div className="reg-right">
          <h1>Readers Login here</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input  type="text"  className="input" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div>
              
              <input type="password" className="input" placeholder="Password"  name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="reg-left">
        
        </div>
      </div> */