import { useContext, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Input } from '../../components';
import { changePasswordSchema } from '../../utils';
import { http } from '../../services';
import { UserContext } from '../../context';
import { ChangePasswordI } from '../../interfaces';

const ChangePassword = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: ChangePasswordI) => {
    setLoading(true);
    setError('');
    try {
      await http.patch('api/v1/reset-password', {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      setLoading(false);
      setUser({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        lastLogin: '',
        userIp: '',
        userRoleId: 0,
      });
      await http.post('api/v1/logout');
      navigate('/login');
      toast.success('password change successfully');

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
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'center', md: 'flex-start', lg: 'flex-start' },
        alignItems: { xs: 'center', md: 'flex-start', lg: 'flex-start' },
        width: { xl: '500px', lg: '400px', md: '600px', xs: '100%', s: '100%' },
        p: 4,
      }}
    >
      <Typography
        color="primary"
        variant="h4"
        sx={{ marginBottom: 4, fontWeight: 500 }}
      >
        Edit Password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="oldPassword"
          type="password"
          label="Enter your old password"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && !!formik.errors.oldPassword}
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          fullWidth
        />
        <Input
          id="newPassword"
          label="Enter your new password"
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && !!formik.errors.newPassword}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          fullWidth
        />
        <Input
          id="confirmPassword"
          label="Confirm your new password"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          fullWidth
        />

        <Button color="primary" type="submit" fullWidth>
          Edit Password
        </Button>
        {error && (
          <Typography variant="body1" sx={{ marginTop: '10px' }} color="error">
            {error}
          </Typography>
        )}
        {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
      </form>
    </Box>
  );
};
export default ChangePassword;
