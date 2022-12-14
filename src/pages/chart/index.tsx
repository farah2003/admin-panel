import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { Input, Button, PieChart, BarChart } from '../../components';
import { http } from '../../services';
import { BarDataI, objectI, PieChartDataI } from '../../interfaces';
import { timePeriodSchema } from '../../utils/validation';
import * as styles from './style';

const Charts = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [pieChartData, setPieChartData] = useState<PieChartDataI[]>([]);
  const [loading, setLoading] = useState(false);
  const [validData, setValidData] = useState<Array<BarDataI>>([]);
  const [invalidData, setInvalidData] = useState<Array<BarDataI>>([]);
  const [expiredData, setExpiredData] = useState<Array<BarDataI>>([]);
  const [current, setCurrent] = useState(0);
  const [starting, setStarting] = useState(
    moment(Date.now()).subtract(14, 'd').format('YYYY-MM-DD')
  );
  const [ending, setEnding] = useState(moment(Date.now()).format('YYYY-MM-DD'));

  const changeCurrentSlide = () => {
    if (current) setCurrent(0);
    else setCurrent(1);
  };

  const getPieChartData = async (startingDate: string, endingDate: string) => {
    setLoading(true);
    const {
      data: { rows },
    } = await http.get(
      `api/v1/scans-records?from=${startingDate}T00:00:00.000Z&to=${endingDate}T23:59:59.999Z`
    );
    if (!rows) {
      setPieChartData([]);
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
      const { data } = await http.get(
        `api/v1/scans-records-day?from=${startingDate}T00:00:00.000Z&to=${endingDate}T23:59:59.999Z`
      );

      const { Expired, Invalid, Valid } = data;
      setExpiredData(fillData(Object.keys(Expired || {}), Expired));
      setInvalidData(fillData(Object.keys(Invalid || {}), Invalid));
      setValidData(fillData(Object.keys(Valid || {}), Valid));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPieChartData(starting, ending);
    getBarChartData(starting, ending);
  }, []);

  const formik = useFormik({
    initialValues: {
      startingDate: moment(Date.now())
        .subtract(14, 'd')
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
      setStarting(start);
      setEnding(end);
    },
    validationSchema: timePeriodSchema,
  });

  return (
    <Box>
      <Backdrop sx={styles.Backdrop} open={loading}>
        <CircularProgress color="primary" size="5rem" />
      </Backdrop>
      <Box sx={styles.HeaderSection}>
        <Typography color="primary" variant="h5" sx={styles.Title}>
          Scans Analysis
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.Form}>
            <Box>
              <Typography variant="h6" sx={styles.Typography}>
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
              <Typography variant="h6" sx={styles.Typography}>
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
      <Box sx={styles.CarsouselContainer}>
        <Box sx={styles.Carousel}>
          {current === 0 ? (
            <Box sx={styles.ChartContainer}>
              <Box sx={styles.PieContainer}>
                <PieChart pieChartData={pieChartData} />
                {!pieChartData.length && (
                  <Typography variant="h6">no data found</Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Box sx={styles.ChartContainer}>
              <Box sx={styles.BarChartContainer}>
                <BarChart
                  validData={validData}
                  invalidData={invalidData}
                  expiredData={expiredData}
                  startingDate={starting}
                  endingDate={ending}
                />
              </Box>
            </Box>
          )}

          <ArrowBackIos
            onClick={changeCurrentSlide}
            sx={{
              ...styles.Icons,
              ...styles.prev,
            }}
          />
          <ArrowForwardIos
            onClick={changeCurrentSlide}
            sx={{
              ...styles.Icons,
              ...styles.next,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Charts;
