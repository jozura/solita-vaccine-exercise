import fs from 'fs';
import readline from 'readline';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME 
});

const orderToDb = async (values) => {
  values = values.map(val => {
    let { id, healthCareDistrict, orderNumber, responsiblePerson, arrived, vaccine, injections } = val;
    arrived = arrived.replace('T', ' ');
    arrived = arrived.slice(0, arrived.indexOf('.'))

    return `("${id}", "${healthCareDistrict}", "${orderNumber}", "${responsiblePerson}", "${arrived}", "${vaccine}", "${injections}")`
  }).join();

  let queryString = `INSERT INTO VaccineOrder VALUES${values}`
  dbConnection.query(queryString, function (error, results, fields) {
    if (error) throw error;
  });
};

const vaccinationToDb = async (values) => {
  values = values.map(val => {
    let { sourceBottle, gender, vaccinationDate } = val;
    let id = val['vaccination-id'];
    vaccinationDate = vaccinationDate.replace('T', ' ');
    vaccinationDate = vaccinationDate.slice(0, vaccinationDate.indexOf('.'))

    return `("${id}", "${sourceBottle}", "${gender}", "${vaccinationDate}")`
  }).join();

  let queryString = `INSERT INTO Vaccination VALUES${values}`
  return new Promise((resolve, reject) => {
    dbConnection.query(queryString, function (error, results, fields) {
      if (error) reject(error);
      resolve();
    });
  });
};

const processLineByLine = async (fn, toDb) => {
  const fileStream = fs.createReadStream(fn);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const values = [];
  for await (const line of rl) {
    values.push((JSON.parse(line)));
  }

  return toDb(values);
}

await processLineByLine('./resources/Antiqua.source', orderToDb);
await processLineByLine('./resources/SolarBuddhica.source', orderToDb);
await processLineByLine('./resources/Zerpfy.source', orderToDb);
await processLineByLine('./resources/vaccinations.source', vaccinationToDb);
process.exit(0);
