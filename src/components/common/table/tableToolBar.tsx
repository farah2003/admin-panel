import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import React from 'react';

interface EnhancedTableToolbarProps {
  numSelected: number;
}
const TableToolBar = ({ numSelected }: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // backgroundColor: ['primary.light'],
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography sx={{ flex: '1 1 100%' }} variant="subtitle1">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6">
          Kits List
        </Typography>
      )}{' '}
    </Toolbar>
  );
};

export default TableToolBar;
