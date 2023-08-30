import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import './styles.css'

function ChildList() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    username: '',
    password: '',
  });
  const [children, setChildren] = useState([]);
  console.log(childData);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/children/${user._id}`);
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchChildren();
    }
  }, [user]);

  return (
    <div className="child-list-container">
      {children.map((child) => (
        <div key={child._id} className="child-card">
          <div className="child-details">
          <div className="name">
            <h3 className="childname">{child.name}</h3>
          </div>
          <div className="age">
            <p className="childage">Age: {child.age}</p>
          </div>
          <div className="username">
            <p className="childusername">
            Username: {child.username}
            </p>
          </div>
          <div className="readingprogress">
            <p className="childreadingprogress">{child.name} has read <span className="number">{child.bookProgress.length}</span>  books </p>
          </div>
          <div className="quizresults">
            <p className="chilquiz"> {child.name} has an average quiz results of <span className="number">{calculateAverageQuizResult(child.quizResults)}%</span> </p>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function calculateAverageQuizResult(quizResults) {
  if (quizResults.length === 0) {
    return 0;
  }

  const totalResult = quizResults.reduce((sum, result) => sum + result.result, 0);
  const averageResult = totalResult / quizResults.length;

  return averageResult.toFixed(1); 
}

export default ChildList;
