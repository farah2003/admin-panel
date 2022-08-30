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

const FirstStep = ({ handleComplete }: ForgotPasswordChildren) => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: { email: string }) => {
    setError('');
    setLoading(true);
    try {
      await http.post('api/v1/email-confirmation', values);
      setUser({
        ...user,
        email: values.email,
      });
      setLoading(false);
      setError('');
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
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const firstStepFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <form
        onSubmit={firstStepFormik.handleSubmit}
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
            Enter your email
          </Typography>
          <Input
            id="email"
            label="email"
            name="email"
            value={firstStepFormik.values.email}
            onChange={firstStepFormik.handleChange}
            error={
              firstStepFormik.touched.email && !!firstStepFormik.errors.email
            }
            helperText={
              firstStepFormik.touched.email && firstStepFormik.errors.email
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

export default FirstStep;
