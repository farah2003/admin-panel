import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Input } from '../../components';
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
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'firstName', headerName: 'First Name', width: 300 },
    { field: 'lastName', headerName: 'Last Name', width: 300 },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 300,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    { field: 'isActive', headerName: 'Is Active', width: 100 },
    // delete button
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <Box sx={styles.pageContainer}>
      <Box>
        <Typography color="primary" variant="h4" sx={styles.headerStyle}>
          Add new Admin
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
            <Box sx={styles.inputContainer}>
              <Typography variant="h5" sx={styles.inputLabel}>
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
              <Typography variant="h5" sx={styles.inputLabel}>
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
              <Typography variant="h5" sx={styles.inputLabel}>
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
              {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
            </Box>
          </Box>
        </form>
      </Box>
      <Dialog
        open={!!selectedAdminId}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText sx={{ fontSize: '20px' }}>
            Are you sure you want to delete this admin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CheckIcon
            onClick={() => deleteAdmin(selectedAdminId)}
            color="success"
            sx={{ cursor: 'pointer' }}
          />
          <ClearIcon
            onClick={handleClose}
            color="error"
            sx={{ cursor: 'pointer' }}
          />
        </DialogActions>
      </Dialog>
      <Typography color="primary" variant="h4" sx={styles.headerStyle}>
        Admins List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          height: '400px',
          width: '96%',
        }}
      >
        {apiLoading && <CircularProgress />}
        {!apiLoading &&
          (admins.length ? (
            <DataGrid columns={columns} rows={admins} pageSize={5} />
          ) : (
            <Typography variant="h6" color="primary">
              No admins found
            </Typography>
          ))}
      </Box>
    </Box>
  );
};
export default AddAdmin;
