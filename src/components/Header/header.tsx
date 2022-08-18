import React from 'react';
import { Avatar, Box } from '@mui/material';
import * as style from './style';

const Header = () => {
  return (
    <Box sx={style.header}>
      <Avatar sx={style.avater}>OP</Avatar>
    </Box>
  );
};

export default Header;
