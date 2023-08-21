import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getbooks?id=${id}`);
      const fetchedBook = response.data[0];
      console.log('Fetched Book:', fetchedBook);
      setBook(fetchedBook);
      setSelectedAnswers(new Array(fetchedBook.quiz[0].questions.length).fill(null));
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };
  

  // Assuming you have the book and quiz data available
  const [book, setBook] = useState(/* Fetch the book data here */);
  const quizQuestions = book.quiz[0].questions;

  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizQuestions.length).fill(null));

  const handleAnswerChange = (index, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmitQuiz = () => {
    // Assuming you have a function to calculate the quiz score
    const score = calculateQuizScore(selectedAnswers, quizQuestions);

    // You can navigate to a result page with the quiz score
    navigate(`/quiz/${id}/result`, { state: { score } });
  };

  return (
    <div>
      <h2>{book.title} Quiz</h2>
      {quizQuestions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                value={optionIndex}
                checked={selectedAnswers[index] === optionIndex}
                onChange={() => handleAnswerChange(index, optionIndex)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default QuizPage;
