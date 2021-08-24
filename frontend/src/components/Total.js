import { useSelector } from 'react-redux';

const Total = () => {
  const total = useSelector(state => state.queries.total.injectionCount);

  return (
    <div>
    <h3>Total number of arrived injections</h3>
      <p>{total}</p>
    </div>
  )
}

export default Total;
