import './App.css'
import { VMData } from './components/VMStatusFetcher';
import { ChartShower } from './components/ChartShower';

function App() {
  return (
    <div className='wrapper'>
      <ChartShower/>
      <VMData/>
    </div>
  )
}

export default App
