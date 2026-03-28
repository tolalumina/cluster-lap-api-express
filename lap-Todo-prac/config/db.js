const mysql = require("mysql2/promise");

// define instance object

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "St!@#20031901",
  database: "todolist",
});

async function dbConnection() {
  try {
    const connected = await pool.getConnection();
    console.log("Data connected successfully");
  } catch (error) {
    console.error(" db cannot connnected ", error.message);
  }
}



module.exports = {
    pool,
    dbConnection
}
