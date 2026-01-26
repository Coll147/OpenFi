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
      if (error) {
        console.error('Read error:', error);
        return res.status(500).json({ error: error.message });
      }
      console.log(rows);
      console.log('read complete');
      return res.json(rows);
    });
  }

  else if (table && column && value && pk && id) {
    console.log('update start');
    const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    conection.query(query, [table, column, value, pk, id], (error,rows) => {
      if (error) {
        console.error('Update error:', error);
        return res.status(500).json({ error: error.message });
      }
      console.log(rows);
      console.log('update complete');
      return res.json(rows);
    });
  }

  else if (table && !column && !value && pk && id) {
    console.log('remove start');
    const query = 'DELETE FROM ?? WHERE ?? = ?';
    conection.query(query, [table, pk, id], (error,rows) => {
      if (error) {
        console.error('Remove error:', error);
        return res.status(500).json({ error: error.message });
      }
      console.log(rows);
      console.log('remove complete');
      return res.json(rows);
    });
  }
});

router.post('/log', (req, res) => {
  const { logEvent, logDevice, logRisk, logInfo } = req.body;

  if (!logEvent || !logDevice || !logRisk || !logInfo) {
    return res.status(400).json({ error: 'Faltan parámetros para el log' });
  }

  console.log('log insert start');

  // Fecha en formato SQL
  const ahora = new Date();
  const time = ahora.toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO logs (type, device, time, risk, info, comments) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [logEvent, logDevice, time, logRisk, logInfo, ""];

  conection.query(query, params, (error, result) => {
    if (error) {
      console.error('Log insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Nuevo log añadido con id', result.insertId);
    return res.json({ success: true, id: result.insertId });
  });
});


module.exports = router;
