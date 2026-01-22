const express = require("express");
const engine = require('ejs-mate');
const mysql = require('mysql2');
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
import { env, loadEnvFile } from "node:process";
loadEnvFile("./.env");


const conection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME
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
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no hay valor" });

  const hash = crypto.createHash('sha256').update(text).digest('hex');
  res.json({ hash });
});


// Web routes
webserver.get("/", (req, res) => {
  res.render("dashboard", {
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