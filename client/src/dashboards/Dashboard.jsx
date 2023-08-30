import React from 'react';
import Profile from '../components/Profile';
import Navigation from '../Navigation/Navigation';
import AddChild from '../components/AddChild';
import ChildList from '../components/ChildList';
import Booklist from '../Books/BookList';
import './dashboards.css'

function Dashboard() {
  return (
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
            <div className="dashboard-middle-left">
            <AddChild />
          </div>

          </div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-right">
            <h2>Your children</h2>
            <ChildList />
          </div>
        </div>
        <div className="dashboard-bottom">
          <Booklist />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
