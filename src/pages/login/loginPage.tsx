import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { Button, Input } from '../../components';
import { loginSchema } from '../../utils';
import './style.css';
import loginImage from '../../assets/loginLogo.png';
import UserContext from '../../context/userContext';

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const onSubmit = (values: { email: string; password: string }) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
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
          <button type="button" className="forget-password-btn">
            Reset password
          </button>
          <Button color="primary" type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </div>
      <div className="login-image-container">
        <img src={loginImage} alt="logo" className="login-image" />
      </div>
    </div>
  );
};

export default LoginPage;
