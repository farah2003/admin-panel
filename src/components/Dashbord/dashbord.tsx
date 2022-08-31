import { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useMediaQuery } from 'usehooks-ts';
import SideNav from '../sideNav/sidenav';
import Header from '../Header/header';
import { UserContext } from '../../context';
import * as style from './style';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const isDesktopScreen = useMediaQuery('(min-width: 1200px)');
  const { user } = useContext(UserContext);

  useEffect(() => {
    setVisible(isDesktopScreen);
  }, [isDesktopScreen]);

  return user.userRoleId ? (
    <Box sx={style.layout}>
      <>
        <SideNav visible={visible} setVisible={setVisible} />
        <Box sx={style.main}>
          <Header setVisible={setVisible} />
          <Box sx={style.content}>
            <Outlet />
          </Box>
        </Box>
      </>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
