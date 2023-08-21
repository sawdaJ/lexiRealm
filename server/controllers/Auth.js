import User from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hashPassword from '../Middleware/hashPasswords.js';
import generateRandomPassword from '../Middleware/generateRandomPassword.js'
import { response } from 'express';

// Register a new user by email 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if name is entered
    if (!name) {
      return res.json({ error: 'Name must be entered' });
    }

    // Check if email is entered
    if (!email) {
      return res.json({ error: 'Email must be entered' });
    }

    // Check if email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: 'Email is already registered' });
    }

    // Check if password is entered
    if (!password) {
      return res.json({ error: 'Password must be entered' });
    }

    // Check if confirmPassword matches password
    if (password !== confirmPassword) {
      return res.json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      children: []
    });

    // Save the user to the database
    await newUser.save();

    // Return success response if user is registered successfully
    return res.json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Register or login a new user by google
export const GoogleRegister = async (req, res) => {

  const { name, email } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist, create a new user account
      const hashedPassword = await hashPassword(generateRandomPassword());
      user = new User({
        name,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      await user.save();
    }

    // Create a JWT token and send it back to the client
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login user by email
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await hashPassword(password, user.password);

    if (isPasswordValid) {
      const tokenPayload = {
        user: user.toObject() // Convert the user object to a plain JavaScript object
      };

      jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // Set the token in the response cookie
          res.cookie('token', token).json(user);
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

//Login in using google
export const loginGoogleUser = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const tokenPayload = {
        user: user.toObject() // Convert the user object to a plain JavaScript object
      };
  
      jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // Set the token in the response cookie
          res.cookie('token', token).json(user);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// Logout user
export const logoutUser = (req, res) => {
  try {
    // Clear the token from local storage
    req.session.destroy();

    // Return a success response
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Profile
export const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    // If the token doesn't exist, return null
    return res.json(null);
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      // If there's an error with token verification, return an error response
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Return the user object from the decoded token
    res.json(user);
  });
};


