import React from 'react';
import { Link } from 'react-router-dom';
import './Book.css'


const Books = ({ books, handleAssignToChild }) => {
  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book" key={book._id}>
          <div className="book-img">
            <img src={`data:image/jpeg;base64,${book.coverImage}`} alt={book.title} />
          </div>
          <h2 className="book-title">{book.title}</h2>
          <p className="book-description">{book.description}</p>
          <p className="reading-level">{book.readingLevel}</p>
          <div className="book-btn">
            <Link to={`/bookpage/${book._id}`}>Read Now!!</Link>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Books;
