import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import View from './components/View';
import Edit from './components/edit.js'; // Ensure this is correctly implemented
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this is correctly implemented
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1>User Authentication</h1>
        {/* Navigation Buttons */}
        <div className="mb-8">
          <Link to="/register" className="btn btn-primary me-2">Register</Link>
          <Link to="/login" className="btn btn-secondary me-2">Login</Link>
          <Link to="/home" className="btn btn-secondary me-2">Home</Link>
          <Link to="/view" className="btn btn-secondary">View</Link>
        </div>

        <Routes>
          {/* Redirect root path to /home */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Route for registration page */}
          <Route path="/register" element={<Registration />} />
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          {/* Protected route for home page */}
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          <Route path='/view' element={<ProtectedRoute element={View} />} />
          <Route path='/edit/:id' element={<ProtectedRoute element={Edit} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
