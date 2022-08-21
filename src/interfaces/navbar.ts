import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface Item {
  name: string;
  link: string;
}
export interface Props {
  name: string;
  items: Array<Item> | undefined;
  Icon: ReactNode;
  link: string | undefined;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

export interface ParentProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface ChildProps {
  open: boolean;
  items: Array<Item>;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}
