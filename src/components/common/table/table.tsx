import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material';
import TableToolBar from './tableToolBar';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import * as style from './style';
import { rows } from './fakeData';

const GenericTable = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleTableRowClick = (
    event: React.MouseEvent<unknown>,
    name: string
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name: string) => {
    return selected.includes(name);
  };
  const handleChangePage = (_: unknown, nextPage: number) => {
    setPage(nextPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={style.conatiner}>
      <Paper sx={style.paper} elevation={0}>
        <TableToolBar numSelected={selected.length} />
        <TableContainer sx={style.tableContainer}>
          <Table>
            <TableHeader
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={rows.length}
            />
            <TableBody
              rows={rows}
              handleTableRowClick={handleTableRowClick}
              isSelected={isSelected}
            />
          </Table>
        </TableContainer>
        <TablePagination
          sx={style.tablePagination}
          rowsPerPageOptions={[10, 20, 50]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default GenericTable;
