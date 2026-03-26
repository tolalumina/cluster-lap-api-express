const mysql = require('mysql2/promise');


const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "St!@#20031901",
  database: "auth_exercise"
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;