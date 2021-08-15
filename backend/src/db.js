import mysql from 'mysql2';

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const dbConnectionPool = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME 
});

export default dbConnectionPool;
