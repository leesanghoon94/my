const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  database: "article",
  password: "12345678",
});

module.exports = db;
