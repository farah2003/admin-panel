/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Button, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as style from './style';
import { viewKits, responseI } from '../../interfaces';
import { http } from '../../services';
import { Modal } from '../../components';

const ViewKits = () => {
  const [rows, setRows] = useState<Array<viewKits.rowI>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opne, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState<GridSelectionModel>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count, data }: responseI = await http.get(
          `api/v1/kits?page=${page}&limit=${rowsPerPage}`
        );
        setTotalCount(count);
        setRows(data);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        if (e.response.data.message) {
          setError(e.response.data.message);
        }
        setError(e.response.data);
      }
    };
    fetchData();
    return () => http.source.cancel();
  }, [rowsPerPage, page, isDeleted]);

  const handleSelectId = (ids: GridSelectionModel) => {
    setSelectedRowsId(ids);
  };
  const handleDeleteKit = async () => {
    try {
      await http.post(`api/v1/delete-kits`, {
        kitsId: selectedRowsId,
      });
      setIsDeleted(!isDeleted);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowsId([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handlePageSizeChange = (newPageSize: number) => {
    setRowsPerPage(newPageSize);
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
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
      field: 'kitType',
      headerName: 'Kit Type',
      width: 150,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 300,
    },
    {
      field: 'updatedBy',
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
      <Toolbar sx={style.toolbar}>
        <Typography variant="h6" color="primary">
          Kit List
        </Typography>
        {selectedRowsId.length ? (
          <DeleteIcon
            color="primary"
            sx={style.deleteIcon}
            onClick={() => handleOpen()}
          />
        ) : null}
      </Toolbar>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={style.DataGrid}
        checkboxSelection
        pagination
        onPageSizeChange={handlePageSizeChange}
        page={page}
        onPageChange={handlePageChange}
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
        selectionModel={selectedRowsId}
      />
      <Modal
        open={opne}
        handleConfirm={() => handleDeleteKit()}
        handleClose={() => handleClose()}
        message="Are you sure you want to delete kits"
      />
    </>
  );
};
export default ViewKits;
