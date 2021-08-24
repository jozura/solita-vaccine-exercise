import { useSelector } from 'react-redux';

const GivenVaccinations = () => {
  const executedVaccinations = useSelector(state => state.queries['executedVaccinations']['count']); 

  return (
    <div>
      <h3>Total number of given vaccinations</h3>
      <p>{executedVaccinations}</p>
    </div>
  )
}

export default GivenVaccinations;
