import { Suspense, lazy, useState, useTransition } from 'react'
import './App.css'
import { Button, CircularProgress } from '@mui/material'
import { StatusFetcher } from './components/StatusFetcher';
import messages from './messages';

const LazyChart = lazy(() => import('./components/Chart'));

function App() {
  const [, startShowChartTransition] = useTransition();
  const [showChart, setShowChart] = useState(false);

  const loadChart = () => {
    startShowChartTransition(() => {
      setShowChart(true);
    });
  }

  return (
    <>
      <StatusFetcher/>
      <div>
        <Button variant="contained" onClick={loadChart}>
          {messages.chartLoadButtonLabler()}
        </Button>
      </div>
      {showChart && <Suspense fallback={<CircularProgress/>}>
          <LazyChart/>
      </Suspense>}
      
    </>
  )
}

export default App
