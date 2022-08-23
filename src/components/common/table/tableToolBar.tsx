import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as style from './style';
import { TableInterface } from '../../../interfaces';

const TableToolBar = ({
  numSelected,
  title,
  checkboxSelection,
}: TableInterface.TableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 &&
          checkboxSelection && {
            bgcolor: ['primary.light'],
          }),
        ...style.Toolbar,
      }}
    >
      {numSelected > 0 && checkboxSelection ? (
        <>
          <Typography sx={style.Typography}>{numSelected} selected</Typography>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography sx={style.Typography} variant="h6" color="primary">
          {title}
        </Typography>
      )}
    </Toolbar>
  );
};

export default TableToolBar;
