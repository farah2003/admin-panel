/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from 'react-chartjs-2';

import { pieChartDataI, dataCountI } from '../../interfaces';

const PieChart = ({ pieChartData }: pieChartDataI) => {
  const dataCount: dataCountI = {};
  pieChartData.forEach((element) => {
    dataCount[element.status] = element.count;
  });

  const dataset = [];
  if (pieChartData.length) {
    dataset.push({
      data: [dataCount.Valid, dataCount.Invalid, dataCount.Expired],
      backgroundColor: ['#7750d9', '#FDD230', '#FF6992'],
    });
  } else {
    dataset.push({
      data: [1],
      backgroundColor: ['#d0d0f5'],
    });
  }
  const data: any = {};
  if (pieChartData.length) {
    data.labels = ['Valid', 'Invalid', 'Expired'];
    data.datasets = dataset;
  } else {
    data.labels = [];
    data.datasets = dataset;
  }

  return (
    <Pie
      data={data}
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
