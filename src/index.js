import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Componente principal
import { BrowserRouter } from 'react-router-dom'; // Enrutador
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
