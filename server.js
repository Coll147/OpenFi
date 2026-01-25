const express = require("express");
const engine = require('ejs-mate');
const mysql = require('mysql2');
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { loadEnvFile } = require('node:process');
loadEnvFile("./.env");


const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

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
webserver.post('/api/hash', (req, res) => {
  const { value } = req.body;

  const hash = crypto.createHash('sha256').update(value).digest('hex');
  res.json({ hash });
  console.log(hash)
});
  
webserver.post('/api/storage', (req, res) => {
  const { table, column, value, pk, id } = req.body;

  if (table && !column && !value) {
    console.log('read start')
    const query = 'SELECT * FROM ??'
    conection.query(query, [table], (error,rows) => {
      console.log(rows)
      console.log('read complete')
      return res.json(rows);
    })
  }

  else if (table && column && value && pk && id) {
    console.log('update start')
    const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
    //UPDATE userdata SET email = 'coll147@example.com' WHERE username = 'coll147';
    conection.query(query, [table, column, value, pk, id], (error,rows) => {
      console.log(rows)
      console.log('update complete')
      return res.json(rows);
    })
  }

  else if (table && !column && !value && pk && id) {
    console.log('delete start')
    const query = 'DELETE FROM ?? WHERE ?? = ?'
    //DELETE FROM nombre_tabla WHERE id = X;
    conection.query(query, [table, pk, id], (error,rows) => {
      console.log(rows)
      console.log('delete complete')
      return res.json(rows);
    })
  }
})

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


// Web routes
webserver.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "OpenFi",
    publicIP: "192.168.1.1"
  });
});

webserver.get("/dashboard/dashboard", (req, res) => {
  res.render("pages/dashboard", {
    title: "OpenFi - Dashboard",
    publicIP: "192.168.1.1"
  });
});
webserver.get("/dashboard/topology", (req, res) => {
  res.render("pages/topology", {
    title: "OpenFi - Topology",
  });
});
webserver.get("/dashboard/devices", (req, res) => {
  res.render("pages/devices", {
    title: "OpenFi - Devices",
  });
});
webserver.get("/dashboard/logs", (req, res) => {
  res.render("pages/logs", {
    title: "OpenFi - Logs",
  });
});
webserver.get("/dashboard/wifi", (req, res) => {
  res.render("pages/wifi", {
    title: "OpenFi - Wifi",
  });
});
webserver.get("/dashboard/network", (req, res) => {
  res.render("pages/network", {
    title: "OpenFi - Network",
  });
});
webserver.get("/dashboard/settings", (req, res) => {
  res.render("pages/settings", {
    title: "OpenFi - Settings",
  });
});
webserver.get("/dashboard/information", (req, res) => {
  res.render("pages/information", {
    title: "OpenFi - Information",
  });
});


// INICIO SERVIDOR
webserver.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});