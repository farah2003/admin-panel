/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  Toolbar,
  Typography,
  Button,
  DialogContent,
} from '@mui/material';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import MaterialButton from '../../components/common/button';
import * as style from './style';
import { viewKits, responseI } from '../../interfaces';
import { http } from '../../services';
import { Input, Modal } from '../../components';
import { editKitSchema } from '../../utils/validation';

const ViewKits = () => {
  const [rows, setRows] = useState<Array<viewKits.rowI>>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [opne, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState<GridSelectionModel>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editedRow, setEditedRow] = useState({
    code: '',
    kitType: '',
    expirationDate: '',
  });

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
  }, [rowsPerPage, page, isDeleted, isUpdated]);

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
    } catch (e: any) {
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
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
      renderCell: (params) => {
        return (
          <Button
            sx={style.Button}
            onClick={() => {
              setOpenEditModal(true);
              setEditedRow(params.row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  const onSubmit = async ({ expirationDate, id }: any) => {
    try {
      await http.patch('api/v1/kits', {
        id,
        expirationDate,
      });
      toast.success('Kit edited sucessfully');
      setOpenEditModal(false);
      setIsUpdated(!isUpdated);
    } catch (e: any) {
      if (e.response.data.message) {
        setEditError(e.response.data.message);
        return;
      }
      setEditError(e.response.data);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editedRow,
    validationSchema: editKitSchema,
    onSubmit,
  });

  return (
    <>
      <Dialog open={openEditModal}>
        <DialogContent sx={style.DialogContent}>
          <Box sx={style.ItemContainer}>
            <>
              <DialogTitle sx={style.DialogTitle}>Edit Kits</DialogTitle>

              <Box sx={style.InputContainer}>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    fullWidth
                    label="QR Code"
                    id="code"
                    customstyle={style.Input}
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    readOnly
                  />

                  <Input
                    fullWidth
                    label="Kit Type"
                    id="kitType"
                    customstyle={style.Input}
                    value={formik.values.kitType}
                    onChange={formik.handleChange}
                    readOnly
                  />
                  <Input
                    fullWidth
                    type="date"
                    label="Expiration Date"
                    id="expirationDate"
                    customstyle={style.Input}
                    value={formik.values.expirationDate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.expirationDate &&
                      !!formik.errors.expirationDate
                    }
                    helperText={
                      formik.touched.expirationDate &&
                      formik.errors.expirationDate
                    }
                  />
                  {editError && (
                    <Typography
                      variant="body1"
                      sx={{ marginTop: '10px' }}
                      color="error"
                    >
                      {error}
                    </Typography>
                  )}
                  <DialogActions>
                    <MaterialButton
                      color="primary"
                      type="submit"
                      customstyle={style.EditButton}
                    >
                      EDIT
                    </MaterialButton>
                  </DialogActions>
                </form>
              </Box>
            </>
          </Box>
        </DialogContent>
      </Dialog>
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
