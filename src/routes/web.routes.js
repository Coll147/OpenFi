const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view.controller');

// Root redirect
router.get('/', (req, res) => viewController.redirectToLogin(req, res));

// Login page
router.get('/login', (req, res) => viewController.renderLogin(req, res));

// Dashboard pages
router.get('/dashboard/dashboard', (req, res) => viewController.renderDashboard(req, res));
router.get('/dashboard/topology', (req, res) => viewController.renderTopology(req, res));
router.get('/dashboard/devices', (req, res) => viewController.renderDevices(req, res));
router.get('/dashboard/logs', (req, res) => viewController.renderLogs(req, res));
router.get('/dashboard/wifi', (req, res) => viewController.renderWifi(req, res));
router.get('/dashboard/network', (req, res) => viewController.renderNetwork(req, res));
router.get('/dashboard/settings', (req, res) => viewController.renderSettings(req, res));
router.get('/dashboard/information', (req, res) => viewController.renderInformation(req, res));

module.exports = router;
