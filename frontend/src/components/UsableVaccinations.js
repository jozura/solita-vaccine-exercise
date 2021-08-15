import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function UsableVaccinations({ date }) {
  const [usableVaccinations, setUsableVaccinations] = useState({vaccineCount: 0}); 
  
  useEffect(() => {
    const fetchUsableVaccinations = async () => {
      try {
        const dateString = date.toISOString();

        const usableVaccinationsRequest =
          await axios.get(`${API_URL}/usable?datetime=${dateString}`);

        setUsableVaccinations(usableVaccinationsRequest.data);
      } catch(e) {
        console.log(e)
      };
    };

    fetchUsableVaccinations();
  }, [date]);
  return (
    <div>
      <h3>Number of usable injections</h3>
      <p>{usableVaccinations.vaccineCount}</p>
    </div>
  );
}

export default UsableVaccinations;
