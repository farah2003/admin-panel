import { useContext, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import * as styles from './styles';
import { Button, Input } from '../../components';
import { http } from '../../services';
import { UserContext } from '../../context';
import './style.css';
import { ForgotPasswordChildren } from '../../interfaces';

const SecondStep = ({ handleComplete }: ForgotPasswordChildren) => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    confirmationCode: yup.string().required().length(6, 'Must be 6 characters'),
  });
  const onSubmit = async (values: { confirmationCode: string }) => {
    setError('');
    setLoading(true);
    try {
      console.log(values);
      await http.post('api/v1/verify-confirmation-code', {
        email: user.email,
        confirmationCode: values.confirmationCode,
      });
      setLoading(false);
      setError('');
      setUser({
        ...user,
        confirmationCode: values.confirmationCode,
      });
      handleComplete();
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
      confirmationCode: '',
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
            Enter the confirmation code sent to your email
          </Typography>
          <Input
            id="confirmationCode"
            label="Confirmation Code"
            name="confirmationCode"
            value={formik.values.confirmationCode}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmationCode &&
              !!formik.errors.confirmationCode
            }
            helperText={
              formik.touched.confirmationCode && formik.errors.confirmationCode
            }
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
export default SecondStep;
