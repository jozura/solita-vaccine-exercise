import pool from './db.js';
import { promisify } from 'util';
import HttpException from './middleware/error.js';
import moment from 'moment';

export const totalNumberOfArrivedOrders = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM VaccineOrder WHERE Arrived <= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(Number(result[0].count));
    });
  });
};

export const totalNumberOfArrivedVaccines = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as injectionCount FROM VaccineOrder WHERE Arrived <= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(Number(result[0].injectionCount));
    });
  });
};

export const vaccinationsDone = (at) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM Vaccination WHERE VaccinationDate <= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

export const ordersPerProducer = (at, producer) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) as count FROM VaccineOrder WHERE Arrived <= ? AND Vaccine = ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time, producer],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(Number(result[0].count));
    });
  });
};

export const vaccinesPerProducer = (at, producer) => {
  const time = at.format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count FROM VaccineOrder WHERE Arrived <= ? AND Vaccine = ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time, producer],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(Number(result[0].count));
    });
  });
};

export const expiredVaccines = (at) => {
  const time = at.subtract('30d').format('YYYY-MM-DD');
  const queryString = "SELECT COUNT(*) as count from VaccineOrder WHERE Date(Arrived) = ?";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

export const totalExpired = (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count from VaccineOrder WHERE Arrived <= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

export const usedInjectionsFromExpired = (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  console.log(time);
  const queryString = "SELECT COUNT(*) AS count from VaccineOrder INNER JOIN Vaccination ON VaccineOrder.Id = Vaccination.SourceBottle WHERE Arrived <= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

export const totalUsable = (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count from VaccineOrder WHERE Arrived >= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

export const usedInjections = (at) => {
  const time = at.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) AS count from VaccineOrder INNER JOIN Vaccination ON VaccineOrder.Id = Vaccination.SourceBottle WHERE Arrived >= ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [time],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};

// Fake shit
export const goingToExpire = (fromDay, inDays) => {
  const start = moment(fromDay).subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const end = moment(fromDay).add(inDays, 'days').subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT SUM(Injections) as count from VaccineOrder WHERE Arrived BETWEEN ? AND ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [ start, end ],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
}

export const usedInjectionsFromGoingToExpire = (fromDay, inDays) => {
  const start = moment(fromDay).subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const end = moment(fromDay).add(inDays, 'days').subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
  const queryString = "SELECT COUNT(*) AS count from VaccineOrder INNER JOIN Vaccination ON VaccineOrder.Id = Vaccination.SourceBottle WHERE Arrived BETWEEN ? AND ?;";
  return new Promise((resolve, reject) => {
  pool.query(
      queryString,
      [ start, end ],
      (err, result) => {
        if (err) return reject(err);
        if (!result) return resolve(0);
        return resolve(result[0].count);
    });
  });
};
