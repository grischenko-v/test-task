
import { BarChart } from '@mui/x-charts/BarChart';

const CHART_DATA = [
    { data: [35, 44, 24, 34] },
    { data: [51, 6, 49, 30] },
    { data: [15, 25, 30, 50] },
    { data: [60, 50, 15, 25] },
  ]

const CHART_HEIGHT = 500;

const CHART_X_AXIS = [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]

const CHART_MARGIN = { top: 10, bottom: 30, left: 40, right: 10 }

const Chart = () => {

  return <BarChart
  series={CHART_DATA}
  height={CHART_HEIGHT}
  xAxis={CHART_X_AXIS}
  margin={CHART_MARGIN}
/>
}

export default Chart;