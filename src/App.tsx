import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { LoginPage } from './pages';

function App() {
  return (
    <>
      <ToastContainer />
      <LoginPage />
    </>
  );
}

export default App;
