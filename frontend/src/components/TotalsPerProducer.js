import { useSelector } from 'react-redux';

const TotalPerProducer = () => {
  const totals = useSelector(state => state.queries.totalPerProducer);

  return (
    <div>
      {totals.map((producer) => 
        <div key={producer} style={{display: "inline-block"}}>
          <h4 style={{margin: "5px"}}>{producer} </h4>
          <p>{queries[`total${producer}`]['injectionCount']}</p>
        </div>
      )}
    </div>
  )
}

export default TotalPerProducer;
