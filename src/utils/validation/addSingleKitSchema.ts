import * as yup from 'yup';

const addSingleKitSchema = yup.object({
  qrCode: yup.string().required('QR Code is required'),
  expirationDate: yup.date().required('Expiration Date is required'),
  kitType: yup.number().integer().required('Kit Type is required'),
});

export default addSingleKitSchema;
