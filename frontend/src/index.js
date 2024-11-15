import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this path is correct
import App from './App.jsx'; // Adjust if the main component is in a different file
import { BrowserRouter as Router } from 'react-router-dom'; // If you're using routing

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
