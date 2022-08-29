/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieChartData }: any) => {
  const config = {
    options: {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    },
  };
  return (
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
              size: 18,
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
