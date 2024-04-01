import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div id="landing-page">
      <h1>Welcome to Comedify</h1>
      <p>Discover and enjoy your favorite comedies!</p>
      <div id="landing-page-buttons">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
