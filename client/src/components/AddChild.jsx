import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import './styles.css';

function AddChild() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    username: '',
    password: '',
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/newchild', {
        parentID: user._id,
        ...childData,
      });
      console.log(response.data); // Handle the response data as needed
      // Clear the form fields
      setChildData({
        name: '',
        age: '',
        username: '',
        password: '',
      });
    } catch (error) {
      console.log(error); // Handle the error
    }
  };

  return (
    <div className="add-child-container">
      <button className="toggle-form-button" onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add child'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="child-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={childData.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={childData.age}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={childData.username}
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={childData.password}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default AddChild;
