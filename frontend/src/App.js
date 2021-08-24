import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Total from './components/Total';
import TotalPerProducer from './components/TotalPerProducer';
import GivenVaccinations from './components/GivenVaccinations';
import ExpiredVaccinations from './components/ExpiredVaccinations';
import ExpiredBeforeUse from './components/ExpiredBeforeUse';
import GoingToExpire from './components/GoingToExpire';
import DatePicker from "react-date-picker";
import { getNumberOfExpiredBottles,
         getNumberOfExecutedVaccinations,
         getNumberOfExpiredBeforeUsed,
         getTotalNumberOfArrivedInjections,
         getTotalNumberOfArrivedInjectionsPerProducer,
         getNumberOfGoingToExpireInNDays } from './reducers/queryReducer.js';

function App() {
  const dispatch = useDispatch();
  const [date, setdate] = useState(new Date());
  const [range, setRange] = useState(0);  

  useEffect(() => {
    const dateString = date.toISOString();
    dispatch(getNumberOfExpiredBottles(dateString)); 
    dispatch(getNumberOfExecutedVaccinations(dateString));
    dispatch(getNumberOfExpiredBeforeUsed(dateString));
    dispatch(getTotalNumberOfArrivedInjections(dateString));
    dispatch(getTotalNumberOfArrivedInjectionsPerProducer(dateString));
  }, [dispatch, date])

  useEffect(() => {
    const dateString = date.toISOString();
    dispatch(getNumberOfGoingToExpireInNDays(dateString, range)); 
  }, [dispatch, date, range])
  return (
    <div className="App">
      <h2>Select date</h2>
      <DatePicker value={date} onChange={setdate} />
       
      <Total/>
      <TotalPerProducer/>
      <GivenVaccinations/>
      <ExpiredVaccinations/>
      <ExpiredBeforeUse/>
      
      <h2> Select range </h2>
      <input style={{marginLeft: '5px', width: '50px'}}
             value={range}
             onChange={e => setRange(e.target.value.replace(/\D/,''))}/>

      <GoingToExpire/>
    </div>
  );
}

export default App;
