// SignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css'; 

const SignupPage = () => {
  return (
    <>
      <div className="com-container">
        <div className="content">
          <header>
            <h1>Comedify</h1>
          </header>
          <main>
            <h2>Sign Up for Comedify</h2>
            <form>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
          </main>
        </div>
      </div>
    </>
  );
};

export default SignupPage;