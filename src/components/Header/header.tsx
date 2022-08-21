import { Avatar, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import * as style from './style';
import { HeaderInterface } from '../../interfaces';

const Header = ({ setVisible }: HeaderInterface.Props) => {
  const handleDrawerVisablity = () => {
    setVisible(true);
  };
  return (
    <Box sx={style.header}>
      <Menu sx={style.menuIcon} onClick={handleDrawerVisablity} />
      <Avatar sx={style.avater}>OP</Avatar>
    </Box>
  );
};

export default Header;
