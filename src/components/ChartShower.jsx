import { Suspense, lazy, useState, useTransition } from 'react'
import { Button, CircularProgress } from '@mui/material'
import messages from '../messages';

const LazyChart = lazy(() => import('./Chart')
.then(module => {
    return { default: module.Chart };
    }),
);

export const ChartShower = () => {
  const [, startShowChartTransition] = useTransition();
  const [showChart, setShowChart] = useState(false);

  const loadChart = () => {
    startShowChartTransition(() => {
      setShowChart(true);
    });
  }

  return (
    <>
      <div>
        <Button variant="contained" onClick={loadChart}>
          {messages.chartLoadButtonLabel()}
        </Button>
      </div>
      {showChart && <Suspense fallback={<CircularProgress/>}>
          <LazyChart/>
      </Suspense>}
    </>
  )
}
