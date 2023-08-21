import React from 'react'
import Profile from '../components/Profile.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import AddContent from '../components/AddContent.jsx'
import BookList from'../Books/BookList.jsx'

function Admin() {
  return (
    <div>
         <div>
      <Navigation />
      <div className="dashboard-content">
        <div className="dashboard-top">
          <div className="profile-section"><Profile /></div>
          <div className="dashboard-heading">
            <h2>Welcome to your Dashboard</h2>
            <p>
              Here you can find everything you need to make sure your kids become expert readers.
            </p>
          </div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-left">
            <AddContent />
          </div>
        </div>
        <div className="dashboard-bottom">
          <h2>The Books</h2>
          <BookList />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Admin
