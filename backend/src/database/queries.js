import pool from './dbConnection.js';
import { promisify } from 'util';
import HttpException from '../middleware/error.js';
import moment from 'moment';

const executeCountQuery = async (queryString, params) => {
  const [ rows ] = await pool.execute(queryString, params);
  return (Number(rows[0].count));
}

export const totalNumberOfArrivedOrders = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM VaccineOrder WHERE Arrived <= ?;";

  return executeCountQuery(queryString, [time]);
};

export const totalNumberOfArrivedVaccines = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count FROM VaccineOrder WHERE Arrived <= ?;";

  return executeCountQuery(queryString, [time]);
};

export const vaccinationsDone = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM Vaccination WHERE VaccinationDate <= ?;";

  return executeCountQuery(queryString, [time]);
};

export const ordersPerProducer = (at, producer) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM VaccineOrder WHERE Arrived <= ? AND Vaccine = ?;";

  return executeCountQuery(queryString, [time, producer]);
};

export const vaccinesPerProducer = async (at, producer) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count FROM VaccineOrder WHERE Arrived <= ? AND Vaccine = ?;";

  return executeCountQuery(queryString, [time, producer]);
};

export const expiredVaccines = async (at) => {
  const time = at.subtract('30d').format('YYYY-MM-DD');
  const queryString = "SELECT COUNT(*) as count from VaccineOrder WHERE Date(Arrived) = ?";

  return executeCountQuery(queryString, [time]);
};

export const totalExpired = async (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count from VaccineOrder WHERE Arrived <= ?;";

  return executeCountQuery(queryString, [time]);
};

export const usedInjectionsFromExpired = async (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) AS count from VaccineOrder INNER JOIN Vaccination ON VaccineOrder.Id = Vaccination.SourceBottle WHERE Arrived <= ?;";

  return executeCountQuery(queryString, [time]);
};

export const goingToExpire = async (fromDay, inDays) => {
  const start = moment(fromDay).subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const end = moment(fromDay).add(inDays, 'days').subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count from VaccineOrder WHERE Arrived BETWEEN ? AND ?;";

  return executeCountQuery(queryString, [start, end]);
}

export const usedInjectionsFromGoingToExpire = async (fromDay, inDays) => {
  const start = moment(fromDay).subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const end = moment(fromDay).add(inDays, 'days').subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) AS count from VaccineOrder INNER JOIN Vaccination ON VaccineOrder.Id = Vaccination.SourceBottle WHERE Arrived BETWEEN ? AND ?;";
  
  return executeCountQuery(queryString, [start, end]);
};
