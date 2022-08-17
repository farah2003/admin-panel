import { Box, Avatar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './common/sidenav';
import Headers from './header';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F6F8FE',
        height: '100vh',
        width: '100vw',
      }}
    >
      <SideNav />
      <Box
        style={{
          marginLeft: '14vw',
          height: '100vh',
          width: '86vw',
        }}
      >
        <Headers />
        <Box
          style={{
            width: '96%',
            height: '89%',
            margin: '.4% 2%',
            borderRadius: '20px',
            backgroundColor: '#ffff',
          }}
        >
          h
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
