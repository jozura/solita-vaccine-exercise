import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function GoingToExpire({ date, range }) {
  const [goingToExpire, setGoingToExpire] = useState({vaccineCount: 0}); 
  
  useEffect(() => {
    const fetchGoingToExpire = async () => {
      try {
        const dateString = date.toISOString();

        const usableVaccinationsRequest =
          await axios.get(`${API_URL}/goingToExpire?datetime=${dateString}&range=${range}`);

        setGoingToExpire(usableVaccinationsRequest.data);
      } catch(e) {
        console.log(e)
      };
    };

    fetchGoingToExpire();
  }, [date, range]);
  return (
    <div>
      <h3>Number of vaccinations about to expire in given days</h3>
      <p>{goingToExpire.vaccineCount}</p>
    </div>
  );
}

export default GoingToExpire;
