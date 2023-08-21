import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

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
          <h3>Name: {child.name}</h3>
          <p>Age: {child.age}</p>
          <p>Username: {child.username}</p>
          <p>Reading Progress: <span className="number">{child.bookProgress.length}</span>  books</p>
          <p>Quiz Result Average: <span className="number">{calculateAverageQuizResult(child.quizResults)}%</span></p>
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
