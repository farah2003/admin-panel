import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './userContext';
import { User } from '../../interfaces';
import { http } from '../../services';

type Props = {
  children?: React.ReactNode;
};
const UserProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await http.get('/api/v1/userInfo');
        setUser({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          lastLogin: data.lastLogin,
          userIp: data.userIp,
          userRoleId: data.userRoleId,
        });
        navigate('/');
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
