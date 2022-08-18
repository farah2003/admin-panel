import { Dispatch, SetStateAction } from 'react';

export interface Item {
  name: string;
  link: string;
}
export interface Props {
  open: boolean;
  items: Array<Item>;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}
