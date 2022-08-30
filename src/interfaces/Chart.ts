export interface BarDataI {
  x: string;
  y: number;
}

export interface objectI {
  [key: string]: number;
}

export interface PieChartDataI {
  status: string;
  count: number;
}
export interface point {
  x: string;
  y: number;
}
export interface BarChartProps {
  validData: point[];
  invalidData: point[];
  expiredData: point[];
  startingDate: string;
  endingDate: string;
}

interface pieChartDataObjectI {
  status: string;
  count: number;
}
export interface pieChartDataI {
  pieChartData: pieChartDataObjectI[];
}
export interface dataCountI {
  [key: string]: number;
}
