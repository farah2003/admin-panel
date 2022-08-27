import { useContext, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Input } from '../../components';
import { loginSchema } from '../../utils';
import { UserContext } from '../../context';
import { http } from '../../services';
import { LoginCredentials } from '../../interfaces';
import './style.css';

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const {
        data: { payload },
      } = await http.post('api/v1/login/', values);

      setUser({
        id: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        lastLogin: payload.lastLogin,
        userIp: payload.userIp,
        userRoleId: payload.usersRoleId,
      });
      setLoading(false);
      setError('');
      navigate('/');
    } catch (e) {
      setLoading(false);
      setError('Invalid email or password');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: user.email || '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <div className="login-container">
      <div className="login-form">
        <Typography
          variant="h4"
          sx={{ marginBottom: '30px', fontWeight: '400' }}
        >
          Welcome to Testmate
        </Typography>

        <form onSubmit={formik.handleSubmit} className="login-form-container">
          <Input
            id="email"
            label="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <Input
            id="password"
            label="Enter your password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <button
            type="button"
            className="forget-password-btn"
            onClick={() => {
              navigate('/forgot-password');
            }}
          >
            Reset password
          </button>
          <Button color="primary" type="submit" fullWidth>
            Sign In
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
        </form>
      </div>
      <div className="login-image-container" />
    </div>
  );
};

export default LoginPage;
