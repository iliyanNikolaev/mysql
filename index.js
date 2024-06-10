const express = require("express");
const mysql = require("mysql");
const ejsLayout = require("express-ejs-layouts");

const server = express();
const port = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.static("public"));
server.use(ejsLayout);
server.set("view engine", "ejs");

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
      console.log(rows);
      !err
        ? res.status(200).render("index", { phones: rows })
        : res.status(404).render("404");
    });
  });
});

server.get("/phones/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.query("SELECT * from phones where id = ?", [req.params.id], (err, rows) => {
      conn.release();
      console.log(rows);
      !err
        ? res.status(200).render("product", { phone: rows[0] })
        : res.status(404).render("404");
    });
  });
});

server.listen(port, () => console.log(`listen on port: ${port}`));
