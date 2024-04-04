import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddReviewPage.css';
import { useNavigate } from 'react-router-dom';

const AddReviewPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    movie: '',
    rating: '',
    review: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movies data or any other necessary data here if needed
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/reviews', {
        name: formData.name,
        movieName: formData.movie, // Include movieName in the request
        rating: formData.rating,
        review: formData.review
      });
      console.log('Review submitted successfully');
      // Clear the form after submission
      setFormData({
        name: '',
        movie: '',
        rating: '',
        review: ''
      });
      navigate('/reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="add-review-container">
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit} className="add-review-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
        <label htmlFor="movie">Movie:</label>
        <input type="text" id="movie" name="movie" value={formData.movie} onChange={handleChange} placeholder="Enter movie name" />
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" min="0" max="10" name="rating" value={formData.rating} onChange={handleChange} />
        <label htmlFor="review">Review:</label>
        <textarea id="review" name="review" value={formData.review} onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddReviewPage;
