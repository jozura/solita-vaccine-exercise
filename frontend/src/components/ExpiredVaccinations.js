import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function ExpiredVaccinations({ date }) {
  const [expiredVaccinations, setExpiredVaccinations] = useState({bottleCount: 0}); 
  
  useEffect(() => {
    const fetchExpiredVaccinations = async () => {
      try {
        const dateString = date.toISOString();

        const expiredVaccinationsRequest =
          await axios.get(`${API_URL}/expiredBottles?datetime=${dateString}`);

        setExpiredVaccinations(expiredVaccinationsRequest.data);
      } catch(e) {
        console.log(e)
      };
    };

    fetchExpiredVaccinations();
  }, [date]);
  return (
    <div>
      <h3>Number of expired bottles on the given day</h3>
      <p>{expiredVaccinations.bottleCount}</p>
    </div>
  );
}

export default ExpiredVaccinations;
