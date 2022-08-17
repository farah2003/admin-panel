import * as React from 'react';
import {
  List,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  items: Array<Item> | undefined;
  Icon: React.ReactNode;
  link: string | undefined;
  selected: boolean;
}
interface Item {
  nestedName: string;
  link: string;
}

const listItemStyle = {
  color: '#70708C',
  '&.active': {
    background: '#00000014',
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
  const { name, Icon, items, link, selected } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem
        key={name}
        disablePadding
        onClick={handleClick}
        sx={listItemStyle}
      >
        <ListItemButton sx={listItemButtonStyle} selected={selected}>
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
      {isExpandable ? (
        <Collapse in={open}>
          <List disablePadding>
            {items.map((item: Item | undefined) => (
              <ListItem
                key={item?.nestedName}
                sx={nestedListItem}
                disablePadding
              >
                <ListItemButton sx={nestedlistItemButton}>
                  {item && item?.link ? (
                    <ListItemText primary={item?.nestedName} />
                  ) : null}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

export default SideNavItem;
