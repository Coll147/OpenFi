const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get('/login', (req, res) => {
  const settingsPath = path.join(__dirname, 'settings.json');

  fs.readFile(settingsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo settings:', err);
      return res.status(500).send('Error leyendo settings');
    }

    try {
      const jsonData = JSON.parse(data);
      const networkName = jsonData['nerwork-name'];

      res.render('login', { 
        network_name: networkName 
      });

    } catch (err) {
      console.error('Error parseando settings:', err);
      res.status(500).send('Error parseando settings.json');
    }
  });
});

router.get("/dashboard/dashboard", (req, res) => {
  res.render("pages/dashboard", {
    title: "OpenFi - Dashboard",
    publicIP: "192.168.1.1"
  });
});

router.get("/dashboard/topology", (req, res) => {
  res.render("pages/topology", { title: "OpenFi - Topology" });
});

router.get("/dashboard/devices", (req, res) => {
  res.render("pages/devices", { title: "OpenFi - Devices" });
});

router.get("/dashboard/logs", (req, res) => {
  res.render("pages/logs", { title: "OpenFi - Logs" });
});

router.get("/dashboard/wifi", (req, res) => {
  res.render("pages/wifi", { title: "OpenFi - Wifi" });
});

router.get("/dashboard/network", (req, res) => {
  res.render("pages/network", { title: "OpenFi - Network" });
});

router.get("/dashboard/settings", (req, res) => {
  res.render("pages/settings", { title: "OpenFi - Settings" });
});

router.get("/dashboard/information", (req, res) => {
  res.render("pages/information", { title: "OpenFi - Information" });
});

module.exports = router;