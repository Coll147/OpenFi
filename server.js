const express = require("express");
const engine = require('ejs-mate');
const crypto = require("crypto");
const { client } = require('ssh2');
const fs = require("fs");
const path = require("path");
const mysql = require('mysql2');
const ping = require('ping');
const { loadEnvFile } = require('node:process');
loadEnvFile("./.env");


const webserver = express();
const PORT = process.env.PORT || 3000;

webserver.use(express.json());

// Static files
webserver.use(express.static("public"));

// Views & EJS
webserver.engine('ejs', engine);
webserver.set('views', path.join(__dirname, 'views'));
webserver.set('view engine', 'ejs');


// API
webserver.use('/api/storage', require('./backend/api/database'));

webserver.get('/api/settings', (req, res) => {
  const settingsPath = path.join(__dirname, 'backend/settings.json');

  fs.readFile(settingsPath, 'utf8', (err, data) => {
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      console.error('Error parseando settings:', err);
      res.status(500).json({ error: 'Error parseando settings.json' });
    }
  });
});


webserver.post('/api/hash', (req, res) => {
  const { value } = req.body;

  const hash = crypto.createHash('sha256').update(value).digest('hex');
  res.json({ hash });
  console.log(hash)
});


webserver.post('/login', (req, res) => {
  const { password_input } = req.body;

  const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  const hash = crypto.createHash('sha256').update(password_input).digest('hex');

  const query = 'SELECT password FROM userdata WHERE username = ?';
  conection.query(query, ['admin'], (error, rows) => {
    // Always close the connection
    conection.end();

    if (error) {
      console.error('Read error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (rows.length === 0) {
      return res.status(401).json({ response: 'no', error: 'Usuario no encontrado' });
    }

    const actual_password = rows[0].password;

    if (hash === actual_password) {
      console.log('Access granted');
      return res.json({ response: 'yes' });
    } else {
      console.log('Access NOT granted');
      return res.json({ response: 'no' });
    }
  });
});

webserver.get('/api/mac/:mac', async (req, res) => {
  const mac = req.params.mac;
  try {
    const response = await fetch(`https://api.maclookup.app/v2/macs/${mac}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching MAC vendor' });
  }
});

webserver.get('/api/ping/:host', async (req, res) => {
    const { host } = req.params;

    try {
        const result = await ping.promise.probe(host, { timeout: 2 });
        // Devuelve status online/offline
        res.json({
            host,
            status: result.alive ? 'Online' : 'Offline'
        });
    } catch (error) {
        res.status(500).json({ error: 'Ping failed', details: error.message });
    }
});


// Web Routes
webserver.use('/', require('./backend/routes'));


// INICIO SERVIDOR
webserver.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('ready')
});