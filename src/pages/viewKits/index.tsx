import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { AxiosResponse } from 'axios';
import MaterialButton from '../../components/common/button';
import * as style from './style';
import { viewKits } from '../../interfaces';
import { http } from '../../services';
import { Input } from '../../components';
import { editKitSchema } from '../../utils/validation';

const ViewKits = () => {
  const [rows, setRows] = useState<Array<viewKits.rowI>>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState<Array<viewKits.rowI>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editedRow, setEditedRow] = useState({
    code: '',
    KitType: 1,
    expirationDate: '',
  });

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
      renderCell: (params) => {
        return (
          <Button
            sx={style.Button}
            onClick={() => {
              setOpen(true);
              setEditedRow(params.row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  const onSubmit = () => {
    console.log('hello');
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editedRow,
    validationSchema: editKitSchema,
    onSubmit,
  });
  return (
    <>
      <Dialog open={open} maxWidth="xs" fullWidth>
        <Box sx={{ height: '500px' }}>
          <>
            <DialogTitle sx={{ color: ['primary.main'] }}>
              Edit Kits
            </DialogTitle>
            <Box sx={{ padding: '20px' }}>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  fullWidth
                  name="QR Code"
                  label="QR Code"
                  id="code"
                  readOnly
                  customstyle={{
                    marginBottom: '35px',
                    marignTop: '20px',
                  }}
                  value={formik.values.code}
                />
                <Input
                  fullWidth
                  name="Kit Type"
                  label="Kit Type"
                  id="Kit Type"
                  customstyle={{ marginBottom: '35px' }}
                  readOnly
                  value={formik.values.KitType}
                />
                <Input
                  fullWidth
                  name="Expiration Date"
                  label="Expiration Date"
                  id="Expiration Date"
                  customstyle={{ marginBottom: '35px' }}
                  value={formik.values.expirationDate}
                  onChange={formik.handleChange}
                  readOnly={false}
                />
                <Input
                  id="email"
                  label="Enter your email"
                  name="email"
                  value={formik.values.expirationDate}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.expirationDate &&
                    formik.errors.expirationDate
                  }
                  fullWidth
                />

                <DialogActions
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <MaterialButton
                    color="primary"
                    type="submit"
                    customstyle={{ width: '100%', padding: '10px' }}
                  >
                    EDIT
                  </MaterialButton>
                </DialogActions>
              </form>
            </Box>
          </>
        </Box>
      </Dialog>
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
