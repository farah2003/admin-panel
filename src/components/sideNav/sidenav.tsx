import { useState } from 'react';
import { Drawer, List, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SideNavListItems from './sidenavListItems';
import { sideNavItems } from './sideNavItems';
import { NavBarInterface } from '../../interfaces';
import logo from '../../assets/logo.png';
import * as style from './style';

const SideNav = ({ visible, setVisible }: NavBarInterface.ParentProps) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleDrawerVisablity = () => {
    setVisible(false);
  };

  return (
    <div>
      <Drawer variant="persistent" open={visible} sx={style.drawer}>
        <Box sx={style.drawerHeader}>
          <Box sx={style.imageContainer}>
            <Box component="img" alt="logo" src={logo} sx={style.image} />
          </Box>
          <CloseIcon sx={style.Icon} onClick={handleDrawerVisablity} />
        </Box>
        <List>
          {sideNavItems.map(({ name, Icon, items, link }) => (
            <SideNavListItems
              name={name}
              Icon={Icon}
              items={items}
              link={link}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideNav;
