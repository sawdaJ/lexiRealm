import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Profile from '../components/Profile.jsx';
import Booklist from '../Books/BookList.jsx';


const StudentDashboard = () => {
  const { child } = useContext(UserContext);

  // Check if the child object exists
  if (child) {
    const { name, username } = child;
    console.log(child)

    return (
      <div>
        <Navigation />
        <div className="dashboard-content">
          <div className="dashboard-top">
          <div className="profile">
        <h2>Hi! {name}</h2>
        <p>Welcome to your Dashboard</p>
        </div>
        <div className="child-card">
        <p className="child-progress">
         Wow! you have currently Read <span className="number">{child.bookProgress.length}</span> books
         </p>
        <p className="child-quiz-average">
        Your average quiz results is <span className="number">{calculateAverageQuizResult(child.quizResults)}%</span>
       </p>

        </div>

          </div>
          <p>Your doing great {name} but you can still do better</p>
        <h3>Lets Get Reading</h3>
        
        <Booklist />
        </div>
        
        
       
        
      </div>
    );
  } else {
    
  }
};

function calculateAverageQuizResult(quizResults) {
  if (quizResults.length === 0) {
    return 0;
  }

  const totalResult = quizResults.reduce((sum, result) => sum + result.result, 0);
  const averageResult = totalResult / quizResults.length;

  return averageResult.toFixed(1); 
}

export default StudentDashboard;
