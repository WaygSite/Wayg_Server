const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
require("dotenv").config({ path: "./.env" });
const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

con.connect((err) => {
  if (err) console.log("MySQL 연결 실패 : ", err);
  console.log("MySQL Connected!!!");
});
app.get("/api/schoolinfo", function (req, res) {
  con.query("SELECT * FROM schoolinfo", function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.listen(port, () => console.log("Server Running. . ."));
