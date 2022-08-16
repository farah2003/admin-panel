/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
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
    Icon: Home,
  },
  {
    name: 'Kits',
    link: '/orders',
    Icon: Medication,
    items: [
      {
        nestedName: 'View Kits',
      },
      {
        nestedName: 'Add Kits',
      },
    ],
  },
  {
    name: 'Accounts',
    link: '/customers',
    Icon: Person,
    items: [
      {
        nestedName: 'Reset Password',
        Icon: InboxIcon,
      },
    ],
  },
  {
    name: 'Manage',
    link: '/reports',
    Icon: ManageAccounts,
    items: [
      {
        nestedName: 'Add Admin',
        Icon: InboxIcon,
      },
    ],
  },
  {
    name: 'Log out',
    link: '/report',
    Icon: Logout,
  },
];

const SideNav = () => {
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            backgroundColor: '#F6F8FE',
          },
        }}
      >
        <List style={{ height: 58 }}>
          {appMenuItems.map(({ name, Icon, items }) => (
            <SideNavItem name={name} Icon={Icon} items={items} />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideNav;
