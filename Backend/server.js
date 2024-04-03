const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const MovieModel = require("./models/movies.js");
const SignupModel = require("./models/signup.js"); // Import Signup model
const Joi = require('joi');
const UserInput = require('./models/user.js');
const Login = require('./models/login.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); // Import bcrypt

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function Connection(){
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Define Joi schema for user data validation
const userSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Endpoint to handle user signup
app.post('/signup', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new SignupModel({ // Change User to SignupModel
      name,
      username,
      email,
      password 
    });
    await newUser.save();
    if (newUser){
        const token = jwt.sign({ firstName: newUser.firstName }, process.env.SECRET);
        // Encrypt the token and set it as a cookie
        res.cookie('user', token, {
            httpOnly: true, // Cookie cannot be accessed by JavaScript
            secure: true // Cookie will only be sent over HTTPS
        });
        res.status(201).json({ message: 'User signed up successfully', username,token:token });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await Login.findOne({ username });
//     if (user) {
//       // Check password using bcrypt here
//       res.cookie('user', user, { httpOnly: true });
//       res.json({
//           success: true,
//           message: "Login successful",
//           username
//       });
//     } else {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Incorrect username or password' });
//   }
// });
  
//   const authenticateUser = (req, res, next) => {
//     if (req.cookies.user) {
//       next();
//     } else {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   };
  
//   app.get('/protected', authenticateUser, (req, res) => {
//     res.json({ message: 'Access granted to protected route' });
//   });


// Endpoint to add reviews
app.post('/reviews', async (req, res) => {
    try {
        const { movieName, rating, review } = req.body;
        const newReview = new UserInput({
            movieName,
            rating,
            review
        });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch all reviews
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await UserInput.find();
        console.log('Retrieved reviews:', reviews);
        res.json(reviews);
    } catch (err) {
        console.error('Error retrieving reviews:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to update a review
app.put('/reviews/:id', async (req, res) => {
    try {
        const { movieName, rating, review } = req.body;
        const { id } = req.params;
        await UserInput.findByIdAndUpdate(id, { movieName, rating, review });
        res.json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to delete a review
app.delete('/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await UserInput.findByIdAndDelete(id);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint to fetch movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await MovieModel.find();
        console.log('Retrieved movies:', movies);
        res.json(movies);
    } catch (err) {
        console.error('Error retrieving movies:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Connection().then(() => {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
});

module.exports = app;