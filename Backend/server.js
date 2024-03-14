const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const MovieModel = require("./models/movies.js");
const UserInput = require("./models/user.js"); // Import UserInput model

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
