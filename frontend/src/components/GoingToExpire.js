import { useSelector } from 'react-redux';

const GoingToExpire = () => {
  const goingToExpire = useSelector(state => state.queries.goingToExpire.count); 
  
  return (
    <div>
      <h3>Number of vaccinations about to expire in given days</h3>
      <p>{goingToExpire}</p>
    </div>
  );
}

export default GoingToExpire;
