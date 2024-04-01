import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/HomePage.css'; // Import HomePage.css for styling
import Cookies from 'js-cookie';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState(false);
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

  const toggleShowAllMovies = () => {
    setShowAllMovies(prevState => !prevState);
  };

  const handleLogout = () => {
    // Clear existing 'user' cookie
Cookies.remove("cookie")
    // Navigate to login page
    navigate('/signup');
};


  return (
    <>
      <div className="comedify-container">
        <div className="content">
          <main>
            <h1>Welcome to Comedify!</h1>
            <p>Your go-to destination for all things comedic movies! Whether you're looking for a good laugh or searching for a specific movie or actor, we've got you covered.</p>
            <div className="movie-list">
              <h2>Popular Movies:</h2>
              <div className="grid-container">
                {movies.slice(0, showAllMovies ? movies.length : 5).map(movie => (
                  <div key={movie.title} className="movie-card">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-description">Year: {movie.year}</p>
                    <p className="movie-description">Director: {movie.director}</p>
                    <p className="movie-description">Rating: {movie.rating}</p>
                  </div>
                ))}
              </div>
            </div>
            {!showAllMovies && (
              <button id="show-more-button" onClick={toggleShowAllMovies}>Show More</button>
            )}
            {showAllMovies && (
              <button id="show-less-button" onClick={toggleShowAllMovies}>Show Less</button>
            )}
            <Link to="/add-review">
              <button id="add-review-button">Add Review</button>
            </Link>
            <Link to="/signup">
              <button id="">login</button>
            </Link>
            <Link to="/reviews">
              <button id="view-reviews-button">View Reviews</button>
            </Link>
            <div className="logout-container">
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
