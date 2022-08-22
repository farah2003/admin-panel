import {
  TableBody as Body,
  TableRow,
  TableCell,
  Checkbox,
} from '@mui/material';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface TableBody {
  rows: Array<Data>;
  handleTableRowClick: (event: React.MouseEvent<unknown>, name: string) => void;
  isSelected: (name: string) => boolean;
}
const TableBody = ({ rows, handleTableRowClick, isSelected }: TableBody) => {
  return (
    <Body>
      {rows.map((row) => {
        const isItemSelected = isSelected(row.name);
        return (
          <TableRow
            hover
            onClick={(event) => handleTableRowClick(event, row.name)}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox color="primary" checked={isItemSelected} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.calories}</TableCell>
            <TableCell>{row.fat}</TableCell>
            <TableCell>{row.carbs}</TableCell>
            <TableCell>{row.protein}</TableCell>
          </TableRow>
        );
      })}
    </Body>
  );
};
export default TableBody;
