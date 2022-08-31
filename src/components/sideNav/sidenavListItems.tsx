import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NestedListItem from './nestedListItem';
import { NavBarInterface } from '../../interfaces';
import * as style from './style';
import { http } from '../../services';
import { UserContext } from '../../context';

const SideNavListItems = ({
  name,
  Icon,
  items,
  link,
  setSelectedItem,
  selectedItem,
}: NavBarInterface.Props) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const isExpandable = items && items.length > 0;
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await http.post('api/v1/logout');
      navigate('/login');
      setUser({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        lastLogin: '',
        userIp: '',
        userRoleId: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (title: string) => {
    setOpen(!open);
    setSelectedItem(title);
    if (title === 'Log out') handleLogOut();
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
