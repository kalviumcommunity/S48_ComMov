// App.js or Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddReviewPage from './components/AddReviewPage';
import HomePage from './components/HomePage';
import ViewReviews from './components/ViewReviews';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/reviews" element={<ViewReviews/>} />
      </Routes>
    </Router>
  );
};

export default App;
