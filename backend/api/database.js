const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

router.post('/', (req, res) => {
  const { table, column, value, pk, id } = req.body;

  if (table && !column && !value) {
    console.log('read start');
    const query = 'SELECT * FROM ??';
    conection.query(query, [table], (error,rows) => {
      console.log(rows);
      console.log('read complete');
      return res.json(rows);
    });
  }

  else if (table && column && value && pk && id) {
    console.log('update start');
    const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    conection.query(query, [table, column, value, pk, id], (error,rows) => {
      console.log(rows);
      console.log('update complete');
      return res.json(rows);
    });
  }

  else if (table && !column && !value && pk && id) {
    console.log('delete start');
    const query = 'DELETE FROM ?? WHERE ?? = ?';
    conection.query(query, [table, pk, id], (error,rows) => {
      console.log(rows);
      console.log('delete complete');
      return res.json(rows);
    });
  }
});

module.exports = router;
