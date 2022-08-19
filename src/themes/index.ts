import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6841C9',
      light: '#6838c914',
    },
    secondary: {
      dark: '#70708C',
      main: '#F6F8FE',
      light: '#ffff',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'DM Sans',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#F6F8FE',

          boxSizing: 'border-box',
        },
      },
    },
  },
});
