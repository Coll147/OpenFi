const express = require("express");
const engine = require('ejs-mate');

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");



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
webserver.get('/', (req, res) => {
  res.redirect('/dashboard');
});

webserver.get("/dashboard", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard",
    publicIP: "192.168.1.1"
  });
});
webserver.get("/topology", (req, res) => {
  res.render("pages/topology", {
    title: "topology",
  });
});
webserver.get("/devices", (req, res) => {
  res.render("pages/devices", {
    title: "devices",
  });
});
webserver.get("/logs", (req, res) => {
  res.render("pages/logs", {
    title: "logs",
  });
});
webserver.get("/wifi", (req, res) => {
  res.render("pages/wifi", {
    title: "wifi",
  });
});
webserver.get("/network", (req, res) => {
  res.render("pages/network", {
    title: "network",
  });
});
webserver.get("/settings", (req, res) => {
  res.render("pages/settings", {
    title: "settings",
  });
});
webserver.get("/information", (req, res) => {
  res.render("pages/information", {
    title: "information",
  });
});

// INICIO SERVIDOR
webserver.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});