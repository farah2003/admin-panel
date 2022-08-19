import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from './themes';
import { UserProvider, KitsProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <UserProvider>
        <KitsProvider>
          <App />
        </KitsProvider>
      </UserProvider>
    </React.StrictMode>
  </ThemeProvider>
);
