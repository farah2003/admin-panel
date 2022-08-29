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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarChart = ({ validData, invalidData, expiredData }: any) => {
  console.log(validData, invalidData, expiredData);
  const valid = {
    label: 'Valid',
    backgroundColor: '#7750d9',
    borderColor: '#7750d9',
    data: validData,
  };

  const invalid = {
    label: 'Invalid',
    backgroundColor: '#FDD230',
    borderColor: '#FDD230',
    data: invalidData,
  };
  const expired = {
    label: 'Expired',
    backgroundColor: '#ff3e90',
    borderColor: '#ff3e90',
    data: expiredData,
  };
  const from = new Date('2022-08-08');
  const to = new Date('2022-08-18');
  const labels = [];
  let dx = from;
  while (dx <= to) {
    labels.push(moment(dx).format('YYYY-MM-DD'));
    const newDate = dx.setDate(dx.getDate() + 1);
    dx = new Date(newDate);
  }

  const data = {
    labels,
    datasets: [valid, invalid, expired],
  };
  return (
    <Bar
      data={data}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: 'DAYS',
              align: 'end',
              color: '#000',
              font: {
                size: 18,
                weight: '900',
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'NUMBER',
              align: 'end',
              color: '#000',
              font: {
                size: 18,
                weight: '900',
              },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
            position: 'bottom',
          },
          title: {
            display: true,
            align: 'center',
            text: 'Scans per day',
            font: {
              size: 18,
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
