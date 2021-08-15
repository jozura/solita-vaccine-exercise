import { useState } from 'react';
import './App.css';
import Totals from './components/Totals';
import GivenVaccinations from './components/GivenVaccinations';
import ExpiredVaccinations from './components/ExpiredVaccinations';
import ExpiredBeforeUse from './components/ExpiredBeforeUse';
import Usable from './components/UsableVaccinations';
import GoingToExpire from './components/GoingToExpire';
import DatePicker from "react-date-picker";

function App() {
  const [date, setdate] = useState(new Date());
  const [range, setRange] = useState(0);  
  
  return (
    <div className="App">
      <h2>Select date</h2>
      <DatePicker value={date} onChange={setdate} />
       
      <Totals date={date}/>
      <GivenVaccinations date={date}/>
      <ExpiredVaccinations date={date}/>
      <ExpiredBeforeUse date={date}/>
      <Usable date={date}/>
      
      <h2> Select range </h2>
      <input style={{marginLeft: '5px', width: '50px'}}
             value={range}
             onChange={e => setRange(e.target.value.replace(/\D/,''))}/>

      <GoingToExpire date={date} range={range}/>
    </div>
  );
}

export default App;
