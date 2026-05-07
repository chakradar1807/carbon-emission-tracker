const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@2006",
  database: "emission_calculator"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;