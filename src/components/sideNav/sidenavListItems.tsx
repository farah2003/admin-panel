import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NestedListItem from './nestedListItem';
import { NavBarInterface } from '../../interfaces';
import * as style from './style';

const SideNavListItems = ({
  name,
  Icon,
  items,
  link,
  setSelectedItem,
  selectedItem,
}: NavBarInterface.Props) => {
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = useState(false);
  const handleClick = (title: string) => {
    setOpen(!open);
    setSelectedItem(title);
  };

  return (
    <>
      <ListItem key={name} disablePadding sx={style.listItem}>
        <ListItemButton
          onClick={() => handleClick(name)}
          sx={style.listItemButton}
          selected={name === selectedItem}
          component={Link}
          to={link || '#'}
        >
          {name === 'Log out' ? (
            <>
              <ListItemText primary={name} sx={style.listItemText} />
              {Icon}
            </>
          ) : (
            <>
              {Icon}
              <ListItemText primary={name} sx={style.listItemText} />
            </>
          )}

          {isExpandable && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {isExpandable && (
        <NestedListItem
          open={open}
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};

export default SideNavListItems;
