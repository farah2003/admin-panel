import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {
  Home,
  Person,
  Medication,
  ManageAccounts,
  Logout,
} from '@mui/icons-material';
import SideNavItem from './sidenavitem';

const appMenuItems = [
  {
    name: 'Dashboard',
    link: '/',
    Icon: <Home />,
  },
  {
    name: 'Kits',
    Icon: <Medication />,
    selected: false,
    items: [
      {
        link: '/view-kits',
        nestedName: 'View Kits',
      },
      {
        link: '/add-kits',
        nestedName: 'Add Kits',
      },
    ],
  },
  {
    name: 'Accounts',
    Icon: <Person />,

    items: [
      {
        link: '/reset-password',
        nestedName: 'Reset Password',
      },
    ],
  },
  {
    name: 'Manage',
    Icon: <ManageAccounts />,

    items: [
      {
        link: '/add-admin',
        nestedName: 'Add Admin',
      },
    ],
  },
  {
    name: 'Log out',
    link: '/logout',
    Icon: <Logout />,
  },
];

const SideNav = () => {
  const [selectedItem, setSelectedItem] = React.useState('Dashboard');
  const drawer = {
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: '14vw',
      backgroundColor: '#F6F8FE',
      border: 'none',
    },
  };
  return (
    <div>
      <Drawer variant="permanent" sx={drawer}>
        {appMenuItems.map(({ name, Icon, items, link }) => (
          <SideNavItem
            name={name}
            Icon={Icon}
            items={items}
            link={link}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </Drawer>
    </div>
  );
};

export default SideNav;
