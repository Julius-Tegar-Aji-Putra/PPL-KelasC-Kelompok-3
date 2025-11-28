import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'

import App from './App.jsx'
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';

const token = localStorage.getItem('auth_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)