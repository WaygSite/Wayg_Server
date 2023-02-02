const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3001;

const mysql = require("mysql2");
require("dotenv").config({ path: "./.env" });

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());

app.get("/", async (req, res) => {
  try {
    let serviceKey = `${process.env.OPEN_API_SERVICE_KEY}`;
    let response = await axios.get(`${process.env.OPEN_API_KEY}`, {
      params: {
        serviceKey: serviceKey,
      },
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);

    response.data.data.forEach(function (school) {
      const Institution = school["설립구분"];
      const MaW = school["남녀공학구분"];
      const Type = school["고교유형"];
      const SchoolName = school["학교"];
      const Addr = school["학교도로명주소"];
      const PhNum = school["학교전화번호"];
      const FoundDate = school["설립일자"];

      connection.connect();
      const query =
        "INSERT INTO schoolinfo" +
        "(Institution, MaW, Type, SchoolName, Addr, PhNum, FoundDate)" +
        "VALUES (?,?,?,?,?,?,?)";
      const values = [
        Institution,
        MaW,
        Type,
        SchoolName,
        Addr,
        PhNum,
        FoundDate,
      ];

      connection.query(query, values, function (error, results) {
        if (error) throw error;
        console.log("1 record inserted");
      });
    });
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
