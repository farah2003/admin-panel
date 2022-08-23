import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import { TableInterface } from '../../../interfaces';
import * as style from './style';

const TableHeader = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  isEditable,
  isDeleted,
  checkboxSelection,
  rows,
}: TableInterface.TableHeaderProps) => {
  const headCells = Object.keys(rows[0]);
  return (
    <TableHead>
      <TableRow>
        {checkboxSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.slice(0, -1).map((headCell) => (
          <TableCell sx={style.TableCell}>{headCell}</TableCell>
        ))}
        {(isEditable || isDeleted) && <TableCell />}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
