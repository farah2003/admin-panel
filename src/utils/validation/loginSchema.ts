import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be less than 20 characters long')
    .required('Password is required'),
});

export default loginSchema;
