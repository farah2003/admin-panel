import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideNav from './common/sidenav';
import Headers from './header';

const Dashboard = () => {
  const layout = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F6F8FE',
    height: '100vh',
    width: '100vw',
  };
  const main = {
    marginLeft: '14vw',
    height: '100vh',
    width: '86vw',
  };
  const content = {
    width: '96%',
    height: '89%',
    margin: '.4% 2%',
    borderRadius: '20px',
    backgroundColor: '#ffff',
  };
  return (
    <Box sx={layout}>
      <SideNav />
      <Box style={main}>
        <Headers />
        <Box style={content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
