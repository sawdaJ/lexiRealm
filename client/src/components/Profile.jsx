import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './styles.css'

function Profile() {
  const { user } = useContext(UserContext);
  return (
     <div className="profile">
        {!!user && <h2>Hi {user.name}!</h2>}
        {!!user && <p>Your Email is {user.email}</p>}
        {!!user && (
    <p>Your role is {user.isAdmin ? 'Admin' : 'Parent'}</p>
  )}
    </div>
  )
}

export default Profile
