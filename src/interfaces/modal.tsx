/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export interface ModelI {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  message: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
