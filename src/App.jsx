import './App.css'
import { VMStatusFetcher } from './components/VMStatusFetcher';
import { ChartShower } from './components/ChartShower';

function App() {
  return (
    <div className='wrapper'>
      <ChartShower/>
      <VMStatusFetcher/>
    </div>
  )
}

export default App
