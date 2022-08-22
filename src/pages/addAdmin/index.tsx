import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Input } from '../../components';
import { createAdminSchema } from '../../utils';
import { http } from '../../services';
import { createAdminI } from '../../interfaces';
import * as styles from './style';

const AddAdmin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: createAdminI) => {
    setError('');
    setLoading(true);
    try {
      await http.post('api/v1/createAdmin', values);
      setLoading(false);
      toast.success('Admin created successfully');
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
    </Box>
  );
};
export default AddAdmin;
