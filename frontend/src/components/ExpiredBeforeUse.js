import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function ExpiredBeforeUse({ date }) {
  const [expiredBeforeUse, setExpiredBeforeUse] = useState({vaccineCount: 0}); 
  
  useEffect(() => {
    const fetchExpiredBeforeUse = async () => {
      try {
        const dateString = date.toISOString();

        const expiredBeforeUseRequest =
          await axios.get(`${API_URL}/expiredBeforeUse?datetime=${dateString}`);

        setExpiredBeforeUse(expiredBeforeUseRequest.data);
      } catch(e) {
        console.log(e)
      };
    };

    fetchExpiredBeforeUse();
  }, [date]);
  return (
    <div>
      <h3>Total number of expired injections</h3>
      <p>{expiredBeforeUse.vaccineCount}</p>
    </div>
  );
}

export default ExpiredBeforeUse;
