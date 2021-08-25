import { useSelector } from 'react-redux';

const AvailableForUse = () => {
  const expiredBeforeUse = useSelector(state => state.queries.expiredBeforeUse.count);
  const total = useSelector(state => state.queries.total.injectionCount);
  const executed = useSelector(state => state.queries.executedVaccinations.count);

  const calculateAvailable = () => {
    if(expiredBeforeUse !== undefined &&
       total !== undefined &&
       executed !== undefined) {
      return (total - executed - expiredBeforeUse)
    }

    return "loading..."
  }
  return (
    <div>
      <h3>Available vaccinations</h3>
      <p>{calculateAvailable()}</p>
    </div>
  );
}

export default AvailableForUse;
