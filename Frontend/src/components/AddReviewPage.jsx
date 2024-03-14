// AddReviewPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddReviewPage.css';
import { useNavigate } from 'react-router-dom';

const AddReviewPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/reviews', {
        movieName: selectedMovie,
        rating,
        review
      });
      console.log('Review submitted successfully');
      // Clear the form after submission
      setSelectedMovie('');
      setRating('');
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    navigate('/reviews');
  };

  return (
    <div className="add-review-container">
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit} className="add-review-form">
        <label htmlFor="movie">Movie:</label>
        <input type="text" id="movie" value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} placeholder="Enter movie name" />
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
        <label htmlFor="review">Review:</label>
        <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
};

export default AddReviewPage;
