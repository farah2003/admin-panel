/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TableInterface } from '../../../interfaces';

const GenericTable = ({
  tableStyle,
  isEditable,
  isDeleted,
  title,
  rows,
  checkboxSelection,
  page,
  setRowsPerPage,
  rowsPerPage,
  setPage,
  count,
  onDelete,
  onEdit,
}: TableInterface.GenericTable) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleTableRowClick = (
    event: React.MouseEvent<unknown>,
    name: string
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (!checkboxSelection) {
      return;
    }
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
      const newSelected = rows.map((row: any) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{ ...style.conatiner, ...tableStyle }}>
      <Paper sx={style.paper} elevation={0}>
        <TableToolBar
          numSelected={selected.length}
          title={title}
          checkboxSelection={checkboxSelection}
        />
        <TableContainer sx={style.tableContainer}>
          <Table stickyHeader>
            <TableHeader
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={rows.length}
              isEditable={isEditable}
              checkboxSelection={checkboxSelection}
              isDeleted={isDeleted}
              rows={rows}
            />
            <TableBody
              rows={rows}
              handleTableRowClick={handleTableRowClick}
              isSelected={isSelected}
              isEditable={isEditable}
              checkboxSelection={checkboxSelection}
              isDeleted={isDeleted}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </Table>
        </TableContainer>
        <TablePagination
          sx={style.tablePagination}
          rowsPerPageOptions={[10, 20, 50]}
          count={count}
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
