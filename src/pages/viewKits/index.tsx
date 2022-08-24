import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Button, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AxiosResponse } from 'axios';
import * as style from './style';
import { viewKits } from '../../interfaces';
import { http } from '../../services';

const ViewKits = () => {
  const [rows, setRows] = useState<Array<viewKits.rowI>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState<Array<viewKits.rowI>>([]);
  interface res extends AxiosResponse {
    count: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count, data }: res = await http.get(
          `api/v1/kits?page=${page}&limit=${rowsPerPage}`
        );
        setTotalCount(count);
        setRows(data);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setIsLoading(false);
        if (e.response.data.message) {
          setError(e.response.data.message);
        }
        setError(e.response.data);
      }
    };
    fetchData();
  }, [rowsPerPage, page]);
  const handleSelectId = (ids: GridSelectionModel) => {
    const selected = rows.filter((row: viewKits.rowI) => ids.includes(row.id));
    setSelectedRows(selected);
  };
  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'QR Code',
      width: 350,
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      width: 300,
    },
    {
      field: 'KitType',
      headerName: 'Kit Type',
      width: 150,
    },
    {
      field: 'Createdby',
      headerName: 'Created By',
      width: 300,
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      width: 300,
    },
    {
      field: 'Edit',
      headerName: '',
      width: 100,
      renderCell: () => {
        return <Button sx={style.Button}>Edit</Button>;
      },
    },
  ];
  return (
    <>
      <Toolbar sx={{ dispaly: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary">
          Kit List
        </Typography>
        {selectedRows.length ? <DeleteIcon color="primary" /> : null}
      </Toolbar>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={style.DataGrid}
        checkboxSelection
        pagination
        onPageSizeChange={(newPageSize) => {
          setRowsPerPage(newPageSize);
        }}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        rowsPerPageOptions={[10, 20, 50]}
        pageSize={rowsPerPage}
        rowCount={totalCount}
        loading={isLoading}
        paginationMode="server"
        rowHeight={77.1}
        disableSelectionOnClick
        disableColumnMenu
        error={error}
        onSelectionModelChange={(ids) => handleSelectId(ids)}
      />
    </>
  );
};
export default ViewKits;
