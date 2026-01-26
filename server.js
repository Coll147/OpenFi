const express = require("express");
const engine = require('ejs-mate');
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
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


// Web Routes
webserver.use('/', require('./backend/routes'));


// INICIO SERVIDOR
webserver.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});