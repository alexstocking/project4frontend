import React from 'react';
import ReactDOM from 'react-dom/client';
import './interceptors/axios.js';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductsProvider } from './contexts/ProductContext.js';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
