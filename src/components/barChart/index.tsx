import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { http } from '../../services';
import { dataI, objectI } from '../../interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [validData, setValidData] = useState<Array<dataI>>([]);
  const [invalidData, setInvalidData] = useState<Array<dataI>>([]);
  const [expiredData, setExpiredData] = useState<Array<dataI>>([]);

  const fillData = (keys: Array<string>, object: objectI) =>
    keys.map((key) => ({ x: key, y: object[key] }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { expired, invalid, valid },
        } = await http.get(
          'api/v1/scans-records-day?from=2022-07-30T18:54:54.374Z&to=2022-08-10T18:54:54.374Z'
        );

        setExpiredData(fillData(Object.keys(expired), expired));
        setInvalidData(fillData(Object.keys(invalid), invalid));
        setValidData(fillData(Object.keys(valid), valid));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const valid = {
    label: 'valid',
    backgroundColor: '#5d6bff',
    borderColor: '#5d6bff',
    data: validData,
  };

  const invalid = {
    label: 'invalid',
    backgroundColor: '#7e00cd',
    borderColor: '#7e00cd',
    data: invalidData,
  };
  const expired = {
    label: 'expired',
    backgroundColor: '#ff3e90',
    borderColor: '#ff3e90',
    data: expiredData,
  };
  const from = new Date('2022-08-5');
  const to = new Date('2022-08-10');
  const labels = [];
  let dx = from;
  while (dx <= to) {
    labels.push(moment(dx).format('YYYY-MM-DD'));
    const newDate = dx.setDate(dx.getDate() + 1);
    dx = new Date(newDate);
  }

  const data = {
    labels,
    datasets: [valid, expired, invalid],
  };
  return <Bar data={data} />;
};

export default BarChart;
