const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: '34.159.111.167',
  user: 'SuperAdmin123',
  password: 'admin-123',
  database: 'mediplus',
});

const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

connection.on('error', (err) => {
  console.error('Database error:', err);
});

module.exports = { connection, query };
