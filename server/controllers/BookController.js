import Book from '../models/book.js' 
import Child from '../models/child.js';
import fs from 'fs';
import path from 'path';

// Add a new Book
export const newBook = async (req, res) => {
    const { title, description, coverImage, readingLevel, pages } = req.body;
  
    try {
      // Check Title
      if (!title) {
        return res.status(400).json({ error: 'You need to add a title' });
      }
  
      // Check Description
      if (!description || description.length < 50) {
        return res
          .status(400)
          .json({ error: 'Description needs to be at least 50 characters' });
      }
  
      // Create a new book instance
      const newBook = new Book({
        title,
        description,
        coverImage,
        readingLevel,
        pages,
      });
  
      // Save the book to the database
      const savedBook = await newBook.save();
  
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  

// Fetch all the Books with Base64 encoded cover images and pages images
export const getAllBooks = async (req, res) => {
  const { title, id } = req.query;

  let query = {};

  // Check if title or id is provided in the request
  if (title) {
    // Case-insensitive search for title
    query.title = { $regex: title, $options: 'i' };
  }

  if (id) {
    // Match the exact id
    query._id = id;
  }

  try {
    const books = await Book.find(query);

    // Get the directory path of the current module
    const __filename = new URL(import.meta.url).pathname;
    const dirPath = path.dirname(__filename);

    // Convert cover images and pages images to Base64 and add the data to the response
    const booksWithBase64 = books.map((book) => {
      const coverImagePath = path.join(dirPath, `../public/assets/${book.coverImage}`);
      const coverImageBase64 = fs.readFileSync(coverImagePath, { encoding: 'base64' });

      const pagesWithBase64 = book.pages.map((page) => {
        const pageImagePath = path.join(dirPath, `../public/assets/${page.image}`);
        const pageImageBase64 = fs.readFileSync(pageImagePath, { encoding: 'base64' });

        return {
          ...page._doc,
          image: pageImageBase64,
        };
      });

      return {
        ...book._doc,
        coverImage: coverImageBase64,
        pages: pagesWithBase64,
      };
    });

    res.json(booksWithBase64);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Controller function to update the child's book progress
export const updateBookProgress = async (req, res) => {
  const { childId, bookName, progress } = req.body;

  try {
    // Find the child by ID
    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Check if the book already exists in the child's bookProgress array
    const existingBook = child.bookProgress.find(bookProgress => bookProgress.book.title === bookName);

    if (existingBook) {
      // Update the progress of the existing book
      existingBook.progress = progress;
    } else {
      // Add a new book with the given progress
      const book = await Book.findOne({ title: bookName });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      child.bookProgress.push({ book, progress });
    }

    // Save the updated child document
    await child.save();

    res.status(200).json({ message: 'Book progress updated successfully' });
  } catch (error) {
    console.error('Error updating book progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update the child's quiz result
export const updateQuizResult = async (req, res) => {
  const { childId, quizId, result } = req.body;

  try {
    // Find the child by ID
    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Check if the quiz result already exists in the child's quizResults array
    const existingQuizResultIndex = child.quizResults.findIndex(
      quizResult => quizResult.quiz.toString() === quizId
    );

    if (existingQuizResultIndex !== -1) {
      // Update the result of the existing quiz result
      child.quizResults[existingQuizResultIndex].result = result; // Update the result here
    } else {
      // Add a new quiz result with the given result
      child.quizResults.push({
        quiz: quizId,
        result: result, // Update the result here
      });
    }

    // Save the updated child document
    await child.save();

    res.status(200).json({ message: 'Quiz result updated successfully' });
  } catch (error) {
    console.error('Error updating quiz result:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBooksByReadingLevel = async (req, res) => {
  const { readingLevel } = req.query;

  try {
   
    const books = await Book.find({ readingLevel });
   return 
    res.json(books);
  } catch (error) {
    console.error('Error fetching books by reading level:', error);
    return res.status(500).json({ error: 'Failed to fetch books' });
  }
};
