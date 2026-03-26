const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcrypt');           // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');        // Import JWT for token-based authentication
require('dotenv').config();                 // Load environment variables from .env

// Register controller
exports.register = async (req, res) => {
  try {
    // Extract user input from request body
    const { username, email, password } = req.body;

    // Validate input: all fields are required
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Attempt to create a new user in the database
    // Pattern: Model handles DB logic, controller handles request/response logic
    const result = await User.create(username, email, hashedPassword);

    // Send success response
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

  } catch (error) {
    // Handle database errors, e.g., duplicate email or username
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }
    // Generic server error
    res.status(500).json({ message: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Fetch user from database by email
    // Pattern: Using async/await with model method that returns a promise
    const users = await User.findByEmail(email);

    // Check if user exists
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = users[0]; // Get first matching user

    // Compare provided password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token for the authenticated user
    // Pattern: Controller issues token for client-side auth
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send response with token
    res.json({ message: 'Login successful', token });

  } catch (error) {
    // Generic server error
    res.status(500).json({ message: error.message });
  }
};