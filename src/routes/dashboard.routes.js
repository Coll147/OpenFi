const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
  res.render('pages/dashboard/main', {
    title: 'OpenFi - Dashboard'
  });
});

router.get('/devices', (req, res) => {
  res.render('pages/dashboard/devices', {
    title: 'OpenFi - Devices'
  });
});


router.get('/logs', (req, res) => {
  res.render('pages/dashboard/logs', {
    title: 'OpenFi - Logs'
  });
});


router.get('/wifi', (req, res) => {
  res.render('pages/dashboard/wifi', {
    title: 'OpenFi - WiFi'
  });
});


router.get('/networks', (req, res) => {
  res.render('pages/dashboard/networks', {
    title: 'OpenFi - Networks'
  });
});

router.get('/system', (req, res) => {
  res.render('pages/dashboard/system', {
    title: 'OpenFi - System'
  });
});

module.exports = router;
