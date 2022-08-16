/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface objectAttribute {
  name: string;
  Icon: string;
}
interface propsAttribute {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;
}

const SideNavItem = (props: propsAttribute) => {
  const { name, Icon, items = [] } = props;
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
              <ListItemText
                primary={name}
                style={{ color: '#70708C', margin: 0 }}
              />
              {!!Icon && (
                <ListItemIcon style={{ color: '#70708C', margin: 0 }}>
                  <Icon />
                </ListItemIcon>
              )}
            </>
          ) : (
            <>
              {!!Icon && (
                <ListItemIcon style={{ color: '#70708C', margin: 0 }}>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={name}
                style={{ color: '#70708C', margin: 0 }}
              />
            </>
          )}
          {isExpandable && !open && (
            <ExpandMore style={{ color: '#70708C', margin: 0 }} />
          )}
          {isExpandable && open && (
            <ExpandLess style={{ color: '#70708C', margin: 0 }} />
          )}
        </ListItemButton>
      </ListItem>
      {isExpandable ? (
        <Collapse in={open}>
          <List disablePadding>
            {items.map((item: any) => (
              <ListItem key={item.nestedName} disablePadding sx={{ pl: 7 }}>
                <ListItemButton>
                  <ListItemText
                    primary={item.nestedName}
                    style={{ color: '#70708C' }}
                  />
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
