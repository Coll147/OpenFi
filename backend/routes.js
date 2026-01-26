const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "OpenFi",
    publicIP: "192.168.1.1"
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
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