// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <>
      <div className="comedify-container">
        <div className="content">
          <main>
            <h1>Welcome to Comedify!</h1>
            <p>Your go-to destination for all things comedic movies! Whether you're looking for a good laugh or searching for a specific movie or actor, we've got you covered.</p>
            <div className="auth-buttons">
              <button className="login-button">Login</button>
              <Link to="/signup">
                <button className="signup-button">Sign Up</button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;