const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/auth.controller');
const deviceController = require('../controllers/device.controller');
const storageController = require('../controllers/storage.controller');
const logController = require('../controllers/log.controller');
const networkController = require('../controllers/network.controller');
const viewController = require('../controllers/view.controller');

// Auth routes
router.post('/hash', (req, res) => authController.hashPassword(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Storage/Database routes
router.post('/storage', (req, res) => storageController.handleOperation(req, res));

// Log routes
router.post('/storage/log', (req, res) => logController.createLog(req, res));
router.get('/logs', (req, res) => logController.getAllLogs(req, res));
router.get('/logs/risk/:risk', (req, res) => logController.getLogsByRisk(req, res));
router.get('/logs/device/:device', (req, res) => logController.getLogsByDevice(req, res));
router.put('/logs/:id/comments', (req, res) => logController.updateComments(req, res));
router.delete('/logs/:id', (req, res) => logController.deleteLog(req, res));

// Device routes
router.post('/storage/device', (req, res) => deviceController.addDevice(req, res));
router.get('/devices', (req, res) => deviceController.getAllDevices(req, res));
router.get('/devices/:mac', (req, res) => deviceController.getDeviceByMac(req, res));
router.put('/devices/:mac', (req, res) => deviceController.updateDevice(req, res));
router.delete('/devices/:mac', (req, res) => deviceController.deleteDevice(req, res));

// Network routes
router.get('/ping/:host', (req, res) => networkController.pingHost(req, res));
router.get('/mac/:mac', (req, res) => networkController.getMacVendor(req, res));

// Settings routes
router.get('/settings', (req, res) => viewController.getSettings(req, res));
router.put('/settings', (req, res) => viewController.updateSettings(req, res));

module.exports = router;
