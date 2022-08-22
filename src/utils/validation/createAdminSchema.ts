import * as Yup from 'yup';

const createAdminSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

export default createAdminSchema;
