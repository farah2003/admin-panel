import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './common/sidenav';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SideNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
