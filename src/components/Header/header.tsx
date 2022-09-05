import { useContext } from 'react';
import { Avatar, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import * as style from './style';
import { HeaderInterface } from '../../interfaces';
import { UserContext } from '../../context';

const Header = ({ setVisible }: HeaderInterface.Props) => {
  const { user } = useContext(UserContext);

  const handleDrawerVisablity = () => {
    setVisible(true);
  };
  return (
    <Box sx={style.header}>
      <Menu sx={style.menuIcon} onClick={handleDrawerVisablity} />
      <Avatar sx={style.avater}>
        {user.firstName[0]}
        {user.lastName[0]}
      </Avatar>
    </Box>
  );
};

export default Header;
