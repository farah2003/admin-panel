/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Box, Typography, CircularProgress, Toolbar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Input, Modal } from '../../components';
import { createAdminSchema } from '../../utils';
import { http } from '../../services';
import { createAdminI, Admin } from '../../interfaces';
import * as styles from './style';

const AddAdmin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState(0);
  const handleClickOpen = (id: number) => {
    setSelectedAdminId(id);
  };

  const handleClose = () => {
    setSelectedAdminId(0);
  };

  const deleteAdmin = async (id: number) => {
    await http.delete(`api/v1/users/${id}`);
    setAdmins(admins.filter((admin) => admin.id !== id));
    setSelectedAdminId(0);
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'firstName', headerName: 'First Name', width: 275 },
    { field: 'lastName', headerName: 'Last Name', width: 275 },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 300,
      valueFormatter: (params) => {
        if (params.value) {
          return new Date(params.value).toLocaleString();
        }
        return '_';
      },
    },
    { field: 'isActive', headerName: 'Is Active', width: 160 },
    {
      field: 'delete',
      headerName: '',
      width: 160,

      renderCell: (params: any) => {
        return (
          <DeleteIcon
            color="error"
            onClick={() => {
              handleClickOpen(params.id);
            }}
            sx={{ cursor: 'pointer' }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    const getAdmins = async () => {
      setApiLoading(true);
      const { data } = await http.get('/api/v1/admins');
      setApiLoading(false);
      setAdmins(data);
    };
    getAdmins();
    return () => {
      setApiLoading(false);
      setAdmins([]);
      http.source.cancel();
    };
  }, []);

  const onSubmit = async (values: createAdminI) => {
    setError('');
    setLoading(true);
    try {
      const {
        data: { user },
      } = await http.post('api/v1/createAdmin', values);
      setLoading(user);

      toast.success('Admin created successfully');
      setAdmins([
        ...admins,
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          lastLogin: '',
          isActive: true,
        },
      ]);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: createAdminSchema,
    onSubmit,
  });
  return (
    <Box>
      <Box sx={styles.pageContainer}>
        <Typography color="primary" variant="h5" sx={styles.headerStyle}>
          Add new Admin
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
            <Box sx={styles.inputContainer}>
              <Typography variant="h6" sx={styles.inputLabel}>
                Email
              </Typography>
              <Input
                id="email"
                label="Enter new admin's email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </Box>
            <Box sx={styles.inputContainer}>
              <Typography variant="h6" sx={styles.inputLabel}>
                First Name
              </Typography>
              <Input
                id="firstName"
                label="Enter new admin's first name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
              />
            </Box>

            <Box sx={styles.inputContainer}>
              <Typography variant="h6" sx={styles.inputLabel}>
                Last Name
              </Typography>
              <Input
                id="lastName"
                label="Enter new admin's last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                customstyle={{ marginBottom: '0' }}
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={styles.messagesContainer}>
            <Box sx={styles.buttonContainer}>
              <Button color="primary" type="submit" fullWidth>
                Add Admin
              </Button>
              {error && (
                <Typography
                  variant="body1"
                  sx={{ marginTop: '10px' }}
                  color="error"
                >
                  {error}
                </Typography>
              )}
              {loading && <CircularProgress sx={{ marginTop: '10px' }} />}
            </Box>
          </Box>
        </form>
      </Box>
      <Modal
        handleClose={handleClose}
        open={!!selectedAdminId}
        message="Are you sure you want to delete this admin ?"
        handleConfirm={() => deleteAdmin(selectedAdminId)}
      />

      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" color="primary">
          Admin List
        </Typography>
      </Toolbar>
      <Box sx={styles.TableContainer}>
        {apiLoading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            columns={columns}
            rows={admins}
            pageSize={5}
            sx={styles.DataGrid}
            selectionModel={[]}
          />
        )}
      </Box>
    </Box>
  );
};
export default AddAdmin;
