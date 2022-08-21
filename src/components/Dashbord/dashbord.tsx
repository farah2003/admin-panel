import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useMediaQuery } from 'usehooks-ts';
import SideNav from '../sideNav/sidenav';
import Header from '../Header/header';
import * as style from './style';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const isDesktopScreen = useMediaQuery('(min-width: 1200px)');

  useEffect(() => {
    setVisible(isDesktopScreen);
  }, [isDesktopScreen]);

  return (
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
  );
};

export default Dashboard;
