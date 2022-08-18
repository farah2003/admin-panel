import React from 'react';
import { Avatar, Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        height: '7%',
        padding: '1.5% 2.5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Avatar sx={{ bgcolor: 'red' }}>OP</Avatar>
    </Box>
  );
};

export default Header;
