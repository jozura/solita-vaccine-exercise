import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';


const GivenVaccinations = ({ date }) => {
  const [vaccinationsDone, setVaccinationsDone] = useState({vaccinationCount: 0});

  useEffect(() => {
    const fetchVaccinationCount = async () => {
      try {
        const dateString = date.toISOString();

        const vaccinationsDoneRequest =
          await axios.get(`${API_URL}/vaccinationsDone?datetime=${dateString}`);

        setVaccinationsDone(vaccinationsDoneRequest.data);
      } catch(e) {
        console.log(e)
      };
    };

    fetchVaccinationCount();
  }, [date]);

  return (
    <div>
      <h3>Total number of given vaccinations</h3>
      <p>{vaccinationsDone.vaccinationCount}</p>
    </div>
  )
}

export default GivenVaccinations;
