import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './SharedComponents/NavComponent/NavComponent';
import Dashboard from './Components/DashboardComponent/DashboardComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    
    <BrowserRouter>
      <React.StrictMode>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<>...</>}>
              <App />
            </React.Suspense>
          } />
          <Route path="dashboard" element={<React.Suspense fallback={<>...</>}><Dashboard /></React.Suspense>} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </>
);
reportWebVitals();
