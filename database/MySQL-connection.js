const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: '34.78.111.5',
  user: 'root',
  password: 'SuperAdmin_@',
  database: 'users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const query = util.promisify(pool.query).bind(pool);

module.exports = { pool, query };
