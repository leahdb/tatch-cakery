import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./resources/themes/dashboard-v1/scss/dashboard.scss";
import "./resources/themes/dashboard-v1/scss/dashboard-mobile.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
