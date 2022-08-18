import { Dispatch, SetStateAction } from 'react';
import {
  List,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as style from './style';

interface Item {
  name: string;
  link: string;
}
interface Props {
  open: boolean;
  items: Array<Item>;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const NestedListItem = ({
  open,
  items,
  selectedItem,
  setSelectedItem,
}: Props) => {
  const handleNestChange = (slected: string) => {
    setSelectedItem(slected);
  };
  return (
    <Collapse in={open}>
      <List disablePadding>
        {items.map((item: Item) => (
          <ListItem key={item.name} sx={style.nestedListItem} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={style.nestedlistItemButton}
              onClick={() => handleNestChange(item.name)}
              selected={item?.name === selectedItem}
            >
              <ListItemText primary={item?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default NestedListItem;
