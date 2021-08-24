import { useSelector } from 'react-redux';

const ExpiredVaccinations = () => {
  const expiredBottles = useSelector(state => state.queries['expiredBottles']['count']); 

  return (
    <div>
      <h3>Number of expired bottles on the given day</h3>
      <p>{expiredBottles}</p>
    </div>
  );
}

export default ExpiredVaccinations;
