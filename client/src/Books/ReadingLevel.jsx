import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookList() {
  const { readingLevel } = useParams(); // Get the reading level from the URL parameter
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [readingLevel]);
 

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getBooksByReadingLevel`, {
        params: {
          readingLevel: readingLevel
        }
      });

      setBooks(response.data);
      
      console.log(response.data)
    
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  

  return (
    <div>
      <h2>Book List - Reading Level: {readingLevel}</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
