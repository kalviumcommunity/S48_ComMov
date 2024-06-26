import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ViewReviews.css';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]); // State to hold filtered reviews
  const [users, setUsers] = useState([]); // State to hold unique user names
  const [selectedUser, setSelectedUser] = useState(''); // State to hold the selected user name
  const [editedReview, setEditedReview] = useState({}); // State to hold edited review data
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get('http://localhost:3000/reviews');
        setReviews(response.data);
        setFilteredReviews(response.data); // Initialize filtered reviews with all reviews
        const uniqueUsers = [...new Set(response.data.map(review => review.name))]; // Get unique user names
        setUsers(uniqueUsers);
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

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    const selectedUserName = e.target.value;
    setSelectedUser(selectedUserName); // Update selected user state
    // Filter reviews based on selected user name
    const filtered = reviews.filter(review => review.name === selectedUserName);
    setFilteredReviews(filtered);
  };

  return (
    <div>
      <h1>All Reviews</h1>
      {/* Dropdown menu to select user */}
      <select value={selectedUser} onChange={handleDropdownChange}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
      {filteredReviews.map(review => (
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
