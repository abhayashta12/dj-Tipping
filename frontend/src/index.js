import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css'; // Import global styles

// Render the App component into the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
