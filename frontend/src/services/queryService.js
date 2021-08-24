import axios from 'axios';
const API_URL = 'http://localhost:5100';

const getNumberOfExpiredBeforeUsed = async (dateString) => {
  const response = await axios.get(`${API_URL}/expiredBeforeUse?datetime=${dateString}`);
  return(response.data);
}

const getNumberOfExecutedVaccinations = async (dateString) => {
  const response = await axios.get(`${API_URL}/vaccinationsDone?datetime=${dateString}`);
  return(response.data);
}

const getNumberOfExpiredBottles = async (dateString) => {
  const response = await axios.get(`${API_URL}/expiredBottles?datetime=${dateString}`);
  return(response.data);
}

const getNumberOfGoingToExpireInNDays = async (dateString, range) => {
  const response = await axios.get(`${API_URL}/goingToExpire?datetime=${dateString}&range=${range}`);
  return(response.data);
}

const getTotalNumberOfArrivedInjectionsPerProducer = async (dateString) => {
  const response = await axios.get(`${API_URL}/totalPerProducer?datetime=${dateString}`);
  return(response.data);
}

const getTotalNumberOfArrivedInjections = async (dateString) => {
  const response = await axios.get(`${API_URL}/total?datetime=${dateString}`);
  return(response.data);
}

const queryService = {getNumberOfExpiredBeforeUsed,
                      getNumberOfExpiredBottles,
                      getNumberOfExecutedVaccinations,
                      getNumberOfGoingToExpireInNDays,
                      getTotalNumberOfArrivedInjectionsPerProducer,
                      getTotalNumberOfArrivedInjections }

export default queryService;
