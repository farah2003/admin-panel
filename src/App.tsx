import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { AddKits } from './pages';

function App() {
  return (
    <>
      <ToastContainer />
      <AddKits />
    </>
  );
}

export default App;
