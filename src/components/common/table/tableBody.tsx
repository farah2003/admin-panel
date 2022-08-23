/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TableBody as Body,
  TableRow,
  TableCell,
  Checkbox,
} from '@mui/material';
import Button from '../button';
import { TableInterface } from '../../../interfaces';
import * as style from './style';

const TableBody = ({
  rows,
  handleTableRowClick,
  isSelected,
  isEditable,
  isDeleted,
  checkboxSelection,
  onEdit,
  onDelete,
}: TableInterface.TableBody) => {
  const headCells = Object.keys(rows[0]);
  return (
    <Body>
      {rows.map((row: any) => {
        const isItemSelected = isSelected(row.id);
        return (
          <TableRow
            hover
            selected={isItemSelected}
            onClick={(event) => handleTableRowClick(event, row.id)}
          >
            {checkboxSelection && (
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={isItemSelected} />
              </TableCell>
            )}
            {headCells.slice(0, -1).map((key) => (
              <TableCell sx={style.TableCell}>{row[key]}</TableCell>
            ))}
            {isEditable && (
              <TableCell>
                <Button customstyle={style.Button} onClick={onEdit}>
                  Edit
                </Button>
              </TableCell>
            )}
            {isDeleted && (
              <TableCell>
                <Button
                  customstyle={style.Button}
                  color="error"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </Body>
  );
};
export default TableBody;
