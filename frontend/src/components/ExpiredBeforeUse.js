import { useSelector } from 'react-redux';

const ExpiredBeforeUse = () => {
  const expiredBeforeUse = useSelector(state => state.queries.expiredBeforeUse.count); 
   
  return (
    <div>
      <h3>Total number of expired injections</h3>
      <p>{expiredBeforeUse}</p>
    </div>
  );
}

export default ExpiredBeforeUse;
