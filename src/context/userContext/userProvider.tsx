import React, { useState } from 'react';
import UserContext from './userContext';
import { User } from '../../interfaces';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    lastLogin: '',
    userIp: '',
    userRoleId: 0,
  } as User);
  const value = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
