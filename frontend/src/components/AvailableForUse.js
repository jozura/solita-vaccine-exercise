import { useSelector } from 'react-redux';

const ExpiredBeforeUse = () => {
  const expiredBeforeUse = useSelector(state => state.queries.expiredBeforeUse.count);
  const total = useSelector(state => state.queries.total.injectionCount);
  const executed = useSelector(state => state.queries.executedVaccinations.count);
  
  return (
    <div>
      <h3>Available vaccinations</h3>
      <p>{total - executed - expiredBeforeUse}</p>
    </div>
  );
}

export default ExpiredBeforeUse;
