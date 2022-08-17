import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import { Dashboard, Layout } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<h1>stTICW</h1>} />
          <Route path="view-kits" element={<h1>view-kits</h1>} />
          <Route path="add-kits" element={<h1>add-kits</h1>} />
          <Route path="reset-password" element={<h1>reset-password</h1>} />
          <Route path="add-admin" element={<h1>add-admin</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
