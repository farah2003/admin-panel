import { Pie } from 'react-chartjs-2';

import { pieChartDataI, dataCountI } from '../../interfaces';

const PieChart = ({ pieChartData }: pieChartDataI) => {
  const dataCount: dataCountI = {};

  pieChartData.forEach((element) => {
    dataCount[element.status] = element.count;
  });

  return (
    <Pie
      data={{
        labels: ['Valid', 'Invalid', 'Expired'],
        datasets: [
          {
            data: [dataCount.valid, dataCount.invalid, dataCount.expired],
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
