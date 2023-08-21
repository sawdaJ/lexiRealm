import Child from '../models/child.js';
import User from '../models/user.js';
import hashPassword  from '../Middleware/hashPasswords.js'
import jwt from 'jsonwebtoken';


// Controller to create a new child and add it to the parent's array
export const createChild = async (req, res) => {
  const { parentID, name, age, username, password } = req.body;

  // Hash the password
  const hashedPassword = await hashPassword(password);

  try {
    // Create a new child
    const child = new Child({
      name,
      age,
      username,
      password: hashedPassword,
      parentID,
      bookProgress: [],
      quizResults: []
    });

    // Save the child to the database
    await child.save();

    // Find the parent user
    const parent = await User.findById(parentID);

    // Add the child to the parent's children array
    parent.children.push(child._id);

    // Save the updated parent user
    await parent.save();

    res.json(child);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to fetch children by parentID
export const getChildrenByParentID = async (req, res) => {
  const { parentID } = req.params; // Use req.params instead of req.body
  
  try {
    const children = await Child.find({ parentID });
    res.json(children);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
};

// Login child
export const loginChild = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find the child by username
    const child = await Child.findOne({ username });

    // Check if the child exists
    if (!child) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await hashPassword(password, child.password);

    if (isPasswordValid) {
      const tokenPayload = {
        child: child.toObject() // Convert the child object to a plain JavaScript object
      };

      jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // Set the token in the response cookie
          res.cookie('token', token).json(child);
        }
      );
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Child Profile
export const getChildProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    // If the token doesn't exist, return null
    return res.json(null);
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      // If there's an error with token verification, return an error response
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { child } = decoded;

    // Return the child object from the decoded token
    res.json(child);
  });
};


//assign book to child
export const assignBookToChild = async (req, res) => {
  try {
    const { childId, bookId } = req.body;

    // Find the child by ID
    const child = await Child.findById(childId);

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!child || !book) {
      return res.status(404).json({ message: 'Child or book not found' });
    }

    // Assign the child to the book
    book.assignedChild = child;

    // Save the updated book
    await book.save();

    res.status(200).json({ message: 'Child assigned to book successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error assigning child to book' });
  }
};

