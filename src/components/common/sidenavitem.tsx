import * as React from 'react';
import {
  List,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  items: Array<Item> | undefined;
  Icon: React.ReactNode;
  link: string | undefined;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
interface Item {
  nestedName: string;
  link: string;
}

const listItemStyle = {
  color: '#70708C',
  '&.active': {
    background: '#00000014',
    borderRaduis:""
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
};
const nestedListItem = {
  color: '#70708C',
  pl: 7,
};
const listItemTextStyle = {
  pl: 2,
};
const listItemButtonStyle = {
  height: '60px',
  '&.Mui-selected ': {
    backgroundColor: '#6838c914',
    color: '#6841C9',
  },
  '&:hover': {
    color: '#6841C9',
  },
};
const nestedlistItemButton = {
  height: '60px',
  '&.Mui-selected ': {
    backgroundColor: '#6838c914',
    color: '#6841C9',
  },
  '&:hover': {
    color: '#6841C9',
  },
};

const SideNavItem = (props: Props) => {
  const { name, Icon, items, link, setSelectedItem, selectedItem } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const handleClick = (itemName: string) => {
    setOpen(!open);
    setSelectedItem(itemName);
  };
  const handleNestChange = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <>
      <List>
        <ListItem key={name} disablePadding sx={listItemStyle}>
          <ListItemButton
            {...(link ? { component: Link, to: link } : {})}
            onClick={() => handleClick(name)}
            sx={listItemButtonStyle}
            selected={name === selectedItem}
          >
            {name === 'Log out' ? (
              <>
                <ListItemText primary={name} />
                {Icon}
              </>
            ) : (
              <>
                {Icon}
                <ListItemText primary={name} sx={listItemTextStyle} />
              </>
            )}
            {isExpandable && !open && <ExpandMore />}
            {isExpandable && open && <ExpandLess />}
          </ListItemButton>
        </ListItem>
      </List>
      {isExpandable ? (
        <Collapse in={open}>
          <List disablePadding>
            {items.map((item: Item | undefined) => (
              <ListItem
                key={item?.nestedName}
                sx={nestedListItem}
                disablePadding
              >
                {item && item?.link && (
                  <ListItemButton
                    component={Link}
                    to={item.link}
                    sx={nestedlistItemButton}
                    onClick={() => handleNestChange(item?.nestedName)}
                    selected={item?.nestedName === selectedItem}
                  >
                    <ListItemText primary={item?.nestedName} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

export default SideNavItem;
