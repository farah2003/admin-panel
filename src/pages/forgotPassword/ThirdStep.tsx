import { useContext, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import { Button, Input } from '../../components';
import { http } from '../../services';
import { UserContext } from '../../context';
import './style.css';
import { ForgotPasswordChildren } from '../../interfaces';

const ThirdStep = ({ handleComplete }: ForgotPasswordChildren) => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    password: yup.string().required().min(6, 'Must be 8 characters'),
  });
  const onSubmit = async (values: { password: string }) => {
    setError('');
    setLoading(true);
    try {
      await http.post('api/v1/change-password', {
        email: user.email,
        confirmationCode: user.confirmationCode,
        password: values.password,
      });

      setLoading(false);
      setError('');
      handleComplete();

      toast.success('Password changed successfully');
      navigate('/login');
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
      password: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="forgot-password-form-container"
      >
        <Box sx={styles.formContainer}>
          <Typography
            variant="h5"
            sx={{
              alignSelf: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            Enter your new password
          </Typography>
          <Input
            id="password"
            label="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />

          <Button color="primary" type="submit" fullWidth>
            Next
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
      </form>
    </div>
  );
};

export default ThirdStep;
