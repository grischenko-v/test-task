import './App.css';
import { VMData } from './components/VMStatusFetcher';
import { ChartShower } from './components/ChartShower';
import messages from "./messages";

function App() {
  return (
    <div className='wrapper'>
      <div className='task1'>
         <h2>{messages.task1Title()}</h2>
          <ChartShower/>
      </div>
      <div className='task2'>
        <h2>{messages.task2Title()}</h2>
        <VMData/>
      </div>
    </div>
  )
}

export default App
