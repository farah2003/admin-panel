import {
  TableBody as Body,
  TableRow,
  TableCell,
  Checkbox,
} from '@mui/material';
import Button from '../button';
import * as style from './style';

interface Data {
  firstName: string;
  lastLogin: string;
  lastName: string;
  email: string;
  id: string;
}

interface TableBody {
  rows: Array<Data>;
  handleTableRowClick: (event: React.MouseEvent<unknown>, name: string) => void;
  isSelected: (name: string) => boolean;
  isEditable: boolean;
  checkboxVisablity: boolean;
  isDeleted: boolean;
}
const TableBody = ({
  rows,
  handleTableRowClick,
  isSelected,
  isEditable,
  checkboxVisablity,
  isDeleted,
}: TableBody) => {
  return (
    <Body>
      {rows.map((row) => {
        const isItemSelected = isSelected(row.id);
        const objKey = Object.keys(row) as Array<keyof Data>;
        return (
          <TableRow
            hover
            onClick={(event) => handleTableRowClick(event, row.id)}
            selected={isItemSelected}
          >
            {checkboxVisablity && (
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={isItemSelected} />
              </TableCell>
            )}
            {objKey.slice(0, -1).map((key: keyof Data) => (
              <TableCell sx={{ fontSize: '16px' }}>{row[key]}</TableCell>
            ))}
            {isEditable && (
              <TableCell>
                <Button customstyle={style.Edit}>Edit</Button>
              </TableCell>
            )}
            {isDeleted && (
              <TableCell>
                <Button customstyle={style.Edit}>Delete</Button>
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </Body>
  );
};
export default TableBody;
