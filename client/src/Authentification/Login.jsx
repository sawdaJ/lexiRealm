import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css';
import regimg from '../assets/loginimg.png'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform input validation
    const { email, password } = formData;
    if (!email || !password ) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/loginUser', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // User registration successful

        if (response.data.isAdmin) {
            // Redirect the admin user to the admin dashboard
            navigate('/admin');
          } else {
            // Redirect the non-admin user to the regular dashboard
            navigate('/dashboard');
          }  
        console.log('User Logged in successfully');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    }
    }

    const handleGoogleLogin = async (googleResponse) => {
        try {
          const decoded = jwt_decode(googleResponse.credential);
          const { email } = decoded;
    
          const response = await axios.post('http://localhost:3001/googleLogin', {
            email,
          });
          
          if (response.status === 200) {
            // User login/register through Google successful
            console.log('User Logged in/register through Google successfully');
            
            if (response.data.isAdmin) {
                // Redirect the admin user to the admin dashboard
                navigate('/admin');
              } else {
                // Redirect the non-admin user to the regular dashboard
                navigate('/dashboard');
              }

          } else {
            setError(response.data.error);
          }
        } catch (error) {
          setError('An error occurred during Google login.');
          console.error(error);
        }
      };

  return (
    <div className="register-container">
    <div className="reg-left">
      <div className="reg-img">
        <img src={regimg} alt="" />
      </div>
    </div>
    <div className="reg-right">
      <Link to='/student-login'><button  className="studentlogin register-button">Are you a student, enter the student area here!!</button></Link>
      <h5>Get your Kids Reading</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="register-button">
          Login
        </button>
      </form>
      <p className="existing-account">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
  )
}

export default Login
