import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Input, Button, PieChart, BarChart } from '../../components';
import { http } from '../../services';
import * as styles from './style';
import { dataI, objectI } from '../../interfaces';
import { timePeriodSchema } from '../../utils/validation';

const Charts = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  interface PieChartDataI {
    status: string;
    count: number;
  }
  const [pieChartData, setPieChartData] = useState<PieChartDataI[]>([]);
  const [loading, setLoading] = useState(false);
  const [validData, setValidData] = useState<Array<dataI>>([]);
  const [invalidData, setInvalidData] = useState<Array<dataI>>([]);
  const [expiredData, setExpiredData] = useState<Array<dataI>>([]);

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

  const fillData = (keys: Array<string>, object: objectI) =>
    keys.map((key) => ({ x: key, y: object[key] }));

  const getBarChartData = async (startingDate: string, endingDate: string) => {
    try {
      const {
        data: { expired, invalid, valid },
      } = await http.get(
        `api/v1/scans-records-day?from=${startingDate}T00:00:00.000Z&to=${endingDate}T23:59:59.999Z`
      );

      setExpiredData(fillData(Object.keys(expired), expired));
      setInvalidData(fillData(Object.keys(invalid), invalid));
      setValidData(fillData(Object.keys(valid), valid));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const startingDate = moment(Date.now())
      .subtract(30, 'd')
      .format('YYYY-MM-DD');
    const endingDate = moment(Date.now()).format('YYYY-MM-DD');

    getPieChartData(startingDate, endingDate);
  }, []);

  useEffect(() => {
    const startingDate = moment(Date.now())
      .subtract(30, 'd')
      .format('YYYY-MM-DD');
    const endingDate = moment(Date.now()).format('YYYY-MM-DD');
    getBarChartData(startingDate, endingDate);
  }, []);

  const formik = useFormik({
    initialValues: {
      startingDate: moment(Date.now())
        .subtract(7, 'd')
        .format('YYYY-MM-DD')
        .toString(),
      endingDate: moment(Date.now()).format('YYYY-MM-DD').toString(),
    },

    onSubmit: async ({
      startingDate,
      endingDate,
    }: {
      startingDate: string;
      endingDate: string;
    }) => {
      const start = moment(startingDate).format('YYYY-MM-DD');
      const end = moment(endingDate).format('YYYY-MM-DD');
      getPieChartData(start, end);
      getBarChartData(start, end);
    },
    validationSchema: timePeriodSchema,
  });

  return (
    <Box sx={{ height: '85%' }}>
      <Backdrop sx={styles.Backdrop} open={loading}>
        <CircularProgress color="primary" size="5rem" />
      </Backdrop>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <Typography color="primary" variant="h5" sx={styles.Title}>
          Scans Analysis
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.Form}>
            <Box>
              <Typography variant="h5" sx={styles.Typography}>
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
              <Typography variant="h5" sx={styles.Typography}>
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
            <Button type="submit" customstyle={styles.Button}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: '0 10px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Carousel
          animation="slide"
          autoPlay={false}
          sx={styles.carousel}
          navButtonsProps={{
            style: {
              backgroundColor: '#7750d9',
              width: 60,
              height: 60,
            },
          }}
          indicatorIconButtonProps={{
            style: {
              display: 'none',
            },
          }}
          next={(next, active) =>
            console.log(`we left ${active}, and are now at ${next}`)
          }
          prev={(prev, active) =>
            console.log(`we left ${active}, and are now at ${prev}`)
          }
          navButtonsAlwaysVisible
        >
          {pieChartData.length ? (
            <Box sx={styles.PieContainer}>
              <PieChart pieChartData={pieChartData} />
            </Box>
          ) : (
            'no data found'
          )}
          <Box
            sx={{
              width: '90%',
              height: '100%',
              marginLeft: '5%',
              marginTop: {
                xl: '3%',
                lg: '15%',
                md: '15%',
                sm: '15%',
                xs: '15%',
              },
            }}
          >
            <BarChart
              validData={validData}
              invalidData={invalidData}
              expiredData={expiredData}
            />
          </Box>
        </Carousel>
      </Box>
    </Box>
  );
};
export default Charts;
