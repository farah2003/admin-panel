import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6841C9',
    },
    secondary: {
      main: '#70708C',
    },
    error: {
      main: '#f44336',
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#6841C9',
          },
          '&.active': {
            background: '#6841C9',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        },
      },
    },
  },
});
