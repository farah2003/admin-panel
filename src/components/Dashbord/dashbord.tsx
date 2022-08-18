import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideNav from '../sideNav/sidenav';
import Header from '../Header/header';
import * as style from './style';

const Dashboard = () => {
  return (
    <Box sx={style.layout}>
      <SideNav />
      <Box style={style.main}>
        <Header />
        <Box style={style.content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
