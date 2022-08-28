import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Input, Button } from '../../components';
import { http } from '../../services';

const Charts = () => {
  const [pieChartData, setPieChartData] = useState<
    {
      status: string;
      count: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const getPieChartData = async (startingDate: string, endingDate: string) => {
    setLoading(true);
    const {
      data: { rows },
    } = await http.get(
      `api/v1/scans-records?from=${startingDate}T00:00:00.000Z&to=${endingDate}T23:59:59.999Z`
    );
    if (!rows) {
      setPieChartData([
        {
          status: 'valid',
          count: 0,
        },
        {
          status: 'expired',
          count: 0,
        },
        {
          status: 'invalid',
          count: 0,
        },
      ]);
      setLoading(false);
      return;
    }

    setPieChartData(rows);
    setLoading(false);
  };
  useEffect(() => {
    const startingDate = new Date(Date.now()).toISOString().split('T')[0];
    const endingDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    getPieChartData(startingDate, endingDate);
  }, []);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const formik = useFormik({
    initialValues: {
      startingDate: new Date(Date.now()).toISOString().split('T')[0],
      endingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    },

    onSubmit: async (values: { startingDate: string; endingDate: string }) => {
      const startingDate = values.startingDate.split('T')[0];
      const endingDate = values.endingDate.split('T')[0];

      getPieChartData(startingDate, endingDate);
    },
    validationSchema: Yup.object({
      startingDate: Yup.date().required('Starting date is required'),
      endingDate: Yup.date()
        .required('Ending date is required')
        .min(
          Yup.ref('startingDate'),
          'Ending date must be greater than starting date'
        ),
    }),
  });

  return (
    <Box>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 999,
        }}
        open={loading}
      >
        <CircularProgress color="primary" size="5rem" />
      </Backdrop>
      <Box sx={{ width: '100%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              gap: { xl: 5, lg: 5, md: 2, sm: 0, xs: 0 },
              justifyContent: 'flex-end',
              flexDirection: {
                xl: 'row',
                lg: 'row',
                md: 'row',
                sm: 'colum',
                xs: 'column',
              },
              alignItems: {
                xl: 'center',
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start',
              },

              marginRight: { xl: 5, lg: 5, md: 2, sm: 1, xs: 1 },
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  alignSelf: 'flex-start',
                  marginBottom: '0.3rem',
                }}
              >
                Starting Date
              </Typography>
              <Input
                id="startingDate"
                name="startingDate"
                type="date"
                value={formik.values.startingDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.startingDate && !!formik.errors.startingDate
                }
                helperText={
                  formik.touched.startingDate && formik.errors.startingDate
                }
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  alignSelf: 'flex-start',
                  marginBottom: '0.3rem',
                }}
              >
                Ending Date
              </Typography>
              <Input
                id="endingDate"
                name="endingDate"
                type="date"
                value={formik.values.endingDate}
                onChange={formik.handleChange}
                error={formik.touched.endingDate && !!formik.errors.endingDate}
                helperText={
                  formik.touched.endingDate && formik.errors.endingDate
                }
              />
            </Box>
            <Button
              type="submit"
              customstyle={{
                marginBottom: 0,

                p: 1.4,
                marginTop: '0.8rem',
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      {pieChartData.length ? (
        <Box sx={{ height: '300px', width: '300px' }}>
          <Pie
            data={{
              labels: ['Valid', 'Invalid', 'Expired'],
              datasets: [
                {
                  data: [
                    pieChartData[0].count,
                    pieChartData[2].count,
                    pieChartData[1].count,
                  ],
                  backgroundColor: ['#458CFD', '#FDD230', '#FF6992'],
                },
              ],
            }}
          />
        </Box>
      ) : (
        'no data found'
      )}
    </Box>
  );
};
export default Charts;
