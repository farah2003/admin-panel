import {
  Home,
  Person,
  Medication,
  ManageAccounts,
  Logout,
} from '@mui/icons-material';

export const sideNavItems = [
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
        name: 'View Kits',
      },
      {
        link: '/add-kits',
        name: 'Add Kits',
      },
    ],
  },
  {
    name: 'Accounts',
    Icon: <Person />,

    items: [
      {
        link: '/change-password',
        name: 'Change Password',
      },
    ],
  },
  {
    name: 'Manage',
    Icon: <ManageAccounts />,

    items: [
      {
        link: '/add-admin',
        name: 'Add Admin',
      },
    ],
  },
  {
    name: 'Log out',
    link: '/logout',
    Icon: <Logout />,
  },
];
