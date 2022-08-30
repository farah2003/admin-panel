/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieChartData }: any) => {
  const values: any = {};

  pieChartData.forEach((element: any) => {
    values[element.status] = element.count;
  });

  return (
    <Pie
      data={{
        labels: ['Valid', 'Invalid', 'Expired'],
        datasets: [
          {
            data: [values.valid, values.invalid, values.expired],
            backgroundColor: ['#7750d9', '#FDD230', '#FF6992'],
          },
        ],
      }}
      options={{
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
            text: 'Total  Scans',
            font: {
              size: 22,
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
