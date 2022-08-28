import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from '@mui/material';
import Button from '../common/button';
import * as styles from './style';
import { ModelI } from '../../interfaces';

const Modal = ({ open, handleClose, handleConfirm, message }: ModelI) => {
  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={open} maxWidth="md">
      <DialogContent>
        <Box sx={styles.DilogContent}>
          <DialogContentText sx={styles.DilogText}>{message}</DialogContentText>
        </Box>
        <DialogActions sx={styles.Action}>
          <Button
            color="error"
            onClick={handleConfirm}
            customstyle={styles.Button}
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            customstyle={{ ...styles.Button, ...styles.CancelButton }}
            color="inherit"
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
