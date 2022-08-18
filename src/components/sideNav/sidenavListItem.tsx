/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, ReactNode, useState } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NestedListItem from './nestedListItem';
import * as style from './style';

interface Props {
  name: string;
  items: Array<Item> | undefined;
  Icon: ReactNode;
  link: string | undefined;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}
interface Item {
  name: string;
  link: string;
}

const SideNavListItem = ({
  name,
  Icon,
  items,
  link,
  setSelectedItem,
  selectedItem,
}: Props) => {
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

export default SideNavListItem;
