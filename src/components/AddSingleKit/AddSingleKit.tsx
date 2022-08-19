import { useState, useContext } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Input } from '../../components';
import { http } from '../../services';
import './styles.css';
import { addSingleKitSchema } from '../../utils';
import { AddSingleKitI } from '../../interfaces';
import { KitsContext, UserContext } from '../../context';

const AddSingleKit = () => {
  const { kits, setKits } = useContext(KitsContext);
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: AddSingleKitI) => {
    setLoading(true);
    try {
      const date = new Date(values.expirationDate);
      const expirationDate = date.toISOString().split('T')[0];

      const response = await http.post('api/v1/kits/', {
        kitsQR: [
          {
            code: values.qrCode,
            expirationDate,
            kitType: values.kitType,
          },
        ],
      });
      setLoading(false);
      setError('');
      setKits([
        ...kits,
        {
          id: response.data[0].id,
          qrCode: response.data[0].information.code,
          expirationDate,
          kitType: values.kitType as number,
          createdBy: `${user.firstName} ${user.lastName}`,
          updatedBy: `${user.firstName} ${user.lastName}`,
        },
      ]);
      toast.success('Kit added successfully');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
    }
  };
  const formik = useFormik({
    initialValues: { qrCode: '', expirationDate: '', kitType: '' },
    validationSchema: addSingleKitSchema,
    onSubmit,
  });
  return (
    <Box sx={{ width: '350px' }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h5"
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          Qr Code
        </Typography>
        <Input
          id="qrCode"
          label="Enter Kit QR Code"
          name="qrCode"
          value={formik.values.qrCode}
          onChange={formik.handleChange}
          error={formik.touched.qrCode && !!formik.errors.qrCode}
          helperText={formik.touched.qrCode && formik.errors.qrCode}
          fullWidth
        />
        <Typography
          variant="h5"
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          Expiration Date
        </Typography>
        <Input
          id="expirationDate"
          type="date"
          name="expirationDate"
          value={formik.values.expirationDate}
          onChange={formik.handleChange}
          error={
            formik.touched.expirationDate && !!formik.errors.expirationDate
          }
          helperText={
            formik.touched.expirationDate && formik.errors.expirationDate
          }
          fullWidth
        />
        <Typography
          variant="h5"
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          Kit Type
        </Typography>
        <Input
          id="kitType"
          name="kitType"
          value={formik.values.kitType}
          onChange={formik.handleChange}
          error={formik.touched.kitType && !!formik.errors.kitType}
          label="Enter kit type"
          fullWidth
          helperText={formik.touched.kitType && formik.errors.kitType}
        />

        <Button color="primary" type="submit" fullWidth>
          Add Single Kit
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
export default AddSingleKit;
