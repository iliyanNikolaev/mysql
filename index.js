const express = require("express");
const mysql = require("mysql");

const server = express();
const port = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "node_crud",
});

// get all

server.get("/phones", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.query("SELECT * from phones", (err, rows) => {
      conn.release();

      !err ? res.send(rows) : res.status(404).send("error in db");
    });
  });
});

server.listen(port, () => console.log(`listen on port: ${port}`));
