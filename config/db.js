import mysql from 'mysql';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

export default db;
