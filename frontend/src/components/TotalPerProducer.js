import { useSelector } from 'react-redux';

const TotalPerProducer = () => {
  const totalPerProducer = useSelector(state => state.queries.totalPerProducer);

  return (
    <div>
        <h3>Total number of arrived injections by producer</h3> 
        {Object.keys(totalPerProducer).map((producer) => 
          <div key={producer} style={{display: "inline-block"}}>
            <h4 style={{margin: "5px"}}>{producer} </h4>
            <p>{totalPerProducer[producer].injectionCount}</p>
          </div>
        )}
      </div>
  )
}

export default TotalPerProducer;
