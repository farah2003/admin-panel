import React from 'react';
import { Avatar, Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        height: '5%',
        padding: '1%',
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
