import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Register.css';
import regimg from '../assets/registerimg.png'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

function Register() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform input validation
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/registerUser', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // User registration successful
        // Redirect or perform any necessary actions
        console.log('User registered successfully');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    }
    }

    const handleGoogleRegister = async (googleResponse) => {
      try {
        const decoded = jwt_decode(googleResponse.credential);
        console.log(decoded)
        const { name, email } = decoded;

        const response = await axios.post('http://localhost:3001/Googleregister', {
      name,
      email,
    });
    console.log(response.data);
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
      <h5>Get Started at the Study Shack</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="existing-account">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
  )
}

export default Register
