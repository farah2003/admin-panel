import { useContext } from 'react';
import {
  Home,
  Person,
  Medication,
  ManageAccounts,
  Logout,
} from '@mui/icons-material';
import UserContext from '../../context/userContext/userContext';

const sideNavItemsComponet = () => {
  const {
    user: { userRoleId },
  } = useContext(UserContext);
  const sideNavItems = [
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
      name: 'Account',
      Icon: <Person />,

      items: [
        {
          link: '/change-password',
          name: 'Change Password',
        },
      ],
    },
  ];

  if (userRoleId === 1) {
    sideNavItems.push({
      name: 'Manage Admins',
      Icon: <ManageAccounts />,

      items: [
        {
          link: '/add-admin',
          name: 'Add Admin',
        },
      ],
    });
  }

  sideNavItems.push({
    name: 'Log out',
    link: '/',
    Icon: <Logout />,
  });
  return sideNavItems;
};

export default sideNavItemsComponet;
