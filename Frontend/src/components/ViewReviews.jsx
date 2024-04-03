import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ViewReviews.css';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editedReview, setEditedReview] = useState({}); // State to hold edited review data
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get('http://localhost:3000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, []);

  const handleEditReview = (id) => {
    const reviewToEdit = reviews.find(review => review._id === id);
    setEditedReview(reviewToEdit); // Set the review to be edited
    setIsEditing(true); // Activate editing mode
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/reviews/${editedReview._id}`, editedReview);
      console.log('Review updated successfully');
      // Fetch updated reviews after edit
      const response = await axios.get('http://localhost:3000/reviews');
      setReviews(response.data);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
      console.log('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h1>All Reviews</h1>
      {reviews.map(review => (
        <div key={review._id} className="review-card">
          {isEditing && editedReview._id === review._id ? (
            <div>
              <label htmlFor="movie">Movie:</label>
              <input type="text" name="movieName" value={editedReview.movieName} onChange={handleInputChange} />
              <label htmlFor="rating">Rating:</label>
              <input type="number" name="rating" value={editedReview.rating} onChange={handleInputChange} />
              <label htmlFor="review">Review:</label>
              <textarea name="review" value={editedReview.review} onChange={handleInputChange}></textarea>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>User: {review.name}</h3> {/* Display user's name */}
              <h3>Movie: {review.movieName}</h3> {/* Display movie name */}
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <button onClick={() => handleEditReview(review._id)}>Edit</button>
              <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      <Link to="/">
              <button id="homepage-button">Go to Home Page</button>
            </Link>
    </div>
  );
};

export default ViewReviews;
