import { Link } from 'react-router-dom';
import {
  List,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { NavBarInterface } from '../../interfaces';
import * as style from './style';

const NestedListItem = ({
  open,
  items,
  selectedItem,
  setSelectedItem,
}: NavBarInterface.ChildProps) => {
  const handleNestChange = (slected: string) => {
    setSelectedItem(slected);
  };
  return (
    <Collapse in={open}>
      <List disablePadding>
        {items.map(({ link, name }: NavBarInterface.Item) => (
          <ListItem key={name} sx={style.nestedListItem} disablePadding>
            <ListItemButton
              component={Link}
              to={link}
              sx={style.nestedlistItemButton}
              onClick={() => handleNestChange(name)}
              selected={name === selectedItem}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default NestedListItem;
