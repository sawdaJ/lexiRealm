import { useEffect, useState } from 'react'
import Books from './BookCard.jsx'
import axios from "axios"

export default function Booklist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getbooks', {
        params: {
          title: '', // Provide the title value if needed
          id: '' // Provide the book ID value if needed
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  return (
    <div className='books-scroll-container'>
    <div className='books-container'>
      <Books books={books} />
    </div>
    </div>
  );
}