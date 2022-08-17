import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';

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
