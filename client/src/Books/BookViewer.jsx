import React, { useState, useEffect, useContext } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext.jsx';
import './Book.css';

const BookPage = () => {
  const { id } = useParams();
  const { child } = useContext(UserContext);
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getbooks?id=${id}`);
      setBook(response.data[0]);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex((prevIndex) => prevIndex - 1);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < book.quiz[0].questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If all questions are completed, submit quiz
      submitQuiz();
    }
  };

  const handleAnswerChange = (answerIndex) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answerIndex;
      return updatedAnswers;
    });
  };

  const calculateQuizScore = () => {
    let score = 0;
    book.quiz[0].questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOption) {
        score++;
      }
    });
    return (score / book.quiz[0].questions.length) * 100;
  };

  const renderQuizQuestion = () => {
    const question = book.quiz[0].questions[currentQuestionIndex];
    return (
      <div className="quiz-question">
        <p>{question.question}</p>
        <div className="quiz-options">
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                value={optionIndex}
                checked={selectedAnswers[currentQuestionIndex] === optionIndex}
                onChange={() => handleAnswerChange(optionIndex)}
              />
              {option}
            </label>
          ))}
        </div>
        <button className="quizbtn" onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  };

  const handleCompleteBook = () => {
    // Calculate the completion percentage based on the number of pages read
    const totalPages = book.pages.length;
    const pagesRead = currentPageIndex + 1;
    const completionPercentage = (pagesRead / totalPages) * 100;

    // Update the child's book progress
    const payload = {
      childId: child._id,
      bookName: book.title,
      progress: completionPercentage,
    };

    axios.post('http://localhost:3001/updateBookProgress', payload)
      .then(response => {
        console.log('Book progress updated:', response.data.message);
      })
      .catch(error => {
        console.error('Error updating book progress:', error);
      });

    // Navigate to the quiz page
    navigate(`/student`);
  };

  const submitQuiz = () => {
    const score = calculateQuizScore();

    // Update the child's quiz results
    const quizResultPayload = {
      childId: child._id,
      quizId: book.quiz[0]._id, // Assuming there's only one quiz per book
      result: score,
    };

    axios.post('http://localhost:3001/updateQuizResult', quizResultPayload)
      .then(response => {
        console.log('Quiz result updated:', response.data.message);
      })
      .catch(error => {
        console.error('Error updating quiz result:', error);
      });

    setQuizCompleted(true);
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  const { pages } = book;
  const currentPage = pages[currentPageIndex];

  return (
    <div className="book-container">
      <div className="bookpage">
        {quizStarted ? (
          // Render quiz content here
          <div className="quiz-content">
            {quizCompleted ? (
              <div className="quiz-completion">
                <p>Your Quiz is completed! Score: {calculateQuizScore()}%</p>
                <Link to="/student">
                  <button className="back-btn">Back to Your Dashboard</button>
                </Link>
              </div>
            ) : (
              renderQuizQuestion()
            )}
          </div>
        ) : (
          // Render book content here
          <div className="book-content">
            <div className="book-image">
              <img src={`data:image/jpeg;base64,${currentPage.image}`} alt={book.title} />
              <p>{currentPage.text}</p>
            </div>
            <div className="book-buttons">
              {currentPageIndex === pages.length - 1 && (
                <button className="bookbtn" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              )}
              <button
                className="nav-btn"
                onClick={handlePreviousPage}
                disabled={currentPageIndex === 0}
              >
                Previous Page
              </button>
              <button
                className="nav-btn"
                onClick={handleNextPage}
                disabled={currentPageIndex === pages.length - 1}
              >
                Next Page
              </button>
              {currentPageIndex === pages.length - 1 && (
                <button className="bookbtn" onClick={handleCompleteBook}>
                  Complete Book
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
