import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import React from 'react';
import { headCells } from './headCells';
import * as style from './style';

interface TableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  isEditable: boolean;
  checkboxVisablity: boolean;
  isDeleted: boolean;
}

const TableHeader = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  isEditable,
  isDeleted,
  checkboxVisablity,
}: TableHeaderProps) => {
  return (
    <TableHead sx={style.head}>
      <TableRow>
        {checkboxVisablity && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell sx={{ fontSize: '18px' }}>{headCell}</TableCell>
        ))}
        {isEditable && <TableCell> </TableCell>}
        {isDeleted && <TableCell> </TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
