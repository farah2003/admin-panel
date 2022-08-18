import { useState } from 'react';
import { Drawer, List } from '@mui/material';
import SideNavListItem from './sidenavListItem';
import { sideNavItems } from './sideNavItem';
import * as style from './style';

const SideNav = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <div>
      <Drawer variant="permanent" sx={style.drawer}>
        <List>
          {sideNavItems.map(({ name, Icon, items, link }) => (
            <SideNavListItem
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
