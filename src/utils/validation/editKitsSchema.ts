import * as yup from 'yup';

const editKitSchema = yup.object({
  expirationDate: yup.date().required('Expiration Date is required'),
});

export default editKitSchema;
