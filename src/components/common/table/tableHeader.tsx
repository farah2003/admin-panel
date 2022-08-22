import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import React from 'react';
import { headCells } from './headCells';

interface TableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const TableHeader = ({
  onSelectAllClick,
  numSelected,
  rowCount,
}: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
