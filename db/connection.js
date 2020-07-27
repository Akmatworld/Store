const mysql = require('mysql');
const config = require('./db.config.js');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
   
    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;