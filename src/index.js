import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import View from './pages/View';
import Form from './pages/Form';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<View />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);