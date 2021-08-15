import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

const PRODUCERS = ['Antiqua', 'SolarBuddhica', 'Zerpfy'];

const Totals = ({ date }) => {
  const [total, setTotal] = useState({injectionCount: 0, orderCount: 0});
  const [producerTotals, setProducerTotals] = useState(PRODUCERS.map(() => 0));
  
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const dateString = date.toISOString();

        const totalRequest = await axios.get(`${API_URL}/total?datetime=${dateString}`);
        const producerTotalRequests = await Promise.all(PRODUCERS.map(async producer =>
          (await axios.get(`${API_URL}/total?datetime=${dateString}&producer=${producer}`)).data));

        setTotal(totalRequest.data);
        setProducerTotals(producerTotalRequests);
      } catch(e) {
        console.log(e)
      };
    };

    fetchTotals();
  }, [date]);

  return (
    <div>
    <h3>Total number of arrived injections</h3>
      <p>{total.injectionCount}</p>
      <h3>Total number of arrived injections by producer</h3> 
      <div>
        {PRODUCERS.map((producer, i) => 
          <div key={i} style={{display: "inline-block"}}>
            <h4 style={{margin: "5px"}}>{producer} </h4>
            <p>{producerTotals[i].injectionCount}</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Totals;
