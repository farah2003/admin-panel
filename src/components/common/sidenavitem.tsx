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
}
interface Item {
  nestedName: string;
  link: string;
}

const SideNavItem = (props: Props) => {
  const { name, Icon, items, link } = props;
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
        sx={{ height: 60 }}
      >
        <ListItemButton sx={{ height: 60 }}>
          {name === 'Log out' ? (
            <>
              {link ? <Link to={link} /> : null}
              <ListItemText primary={name} style={{ color: '#70708C' }} />
              <ListItemIcon style={{ color: '#70708C' }}>{Icon}</ListItemIcon>
            </>
          ) : (
            <>
              {link ? <Link to={link} /> : null}
              <ListItemIcon style={{ color: '#70708C' }}>{Icon}</ListItemIcon>
              <ListItemText primary={name} style={{ color: '#70708C' }} />
            </>
          )}
          {isExpandable && !open && <ExpandMore style={{ color: '#70708C' }} />}
          {isExpandable && open && <ExpandLess style={{ color: '#70708C' }} />}
        </ListItemButton>
      </ListItem>
      {isExpandable ? (
        <Collapse in={open}>
          <List disablePadding>
            {items.map((item: Item | undefined) => (
              <ListItem key={item?.nestedName} disablePadding sx={{ pl: 7 }}>
                <ListItemButton>
                  {item && item?.link ? (
                    <Link to={item?.link} style={{ textDecoration: 'none' }}>
                      <ListItemText
                        primary={item?.nestedName}
                        style={{ color: '#70708C' }}
                      />
                    </Link>
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
