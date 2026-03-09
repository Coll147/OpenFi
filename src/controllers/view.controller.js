const path = require('path');
const fs = require('fs').promises;

class ViewController {
  constructor() {
    this.settingsPath = path.join(__dirname, '../../config/settings.json');
  }

  // Redirect to login
  async redirectToLogin(req, res) {
    res.redirect('/login');
  }

  // Render login page
  async renderLogin(req, res) {
    try {
      const settingsData = await fs.readFile(this.settingsPath, 'utf8');
      const settings = JSON.parse(settingsData);
      
      res.render('login', {
        network_name: settings['network-name'] || 'OpenFi',
      });
    } catch (error) {
      console.error('Error reading settings:', error);
      res.render('login', {
        network_name: 'OpenFi'
      });
    }
  }

  // Render dashboard
  async renderDashboard(req, res) {
    res.render('pages/dashboard', {
      title: 'OpenFi - Dashboard',
      publicIP: '192.168.1.1'
    });
  }

  // Render topology
  async renderTopology(req, res) {
    res.render('pages/topology', {
      title: 'OpenFi - Network Topology'
    });
  }

  // Render devices
  async renderDevices(req, res) {
    res.render('pages/devices', {
      title: 'OpenFi - Devices'
    });
  }

  // Render logs
  async renderLogs(req, res) {
    res.render('pages/logs', {
      title: 'OpenFi - Logs'
    });
  }

  // Render wifi
  async renderWifi(req, res) {
    res.render('pages/wifi', {
      title: 'OpenFi - WiFi'
    });
  }

  // Render network
  async renderNetwork(req, res) {
    res.render('pages/network', {
      title: 'OpenFi - Network'
    });
  }

  // Render settings
  async renderSettings(req, res) {
    res.render('pages/settings', {
      title: 'OpenFi - Settings'
    });
  }

  // Render information
  async renderInformation(req, res) {
    res.render('pages/information', {
      title: 'OpenFi - Information'
    });
  }

  // Get settings (API)
  async getSettings(req, res) {
    try {
      const settingsData = await fs.readFile(this.settingsPath, 'utf8');
      const settings = JSON.parse(settingsData);
      res.json(settings);
    } catch (error) {
      console.error('Error reading settings:', error);
      res.status(500).json({
        error: 'Failed to read settings',
        details: error.message
      });
    }
  }

  // Update settings (API)
  async updateSettings(req, res) {
    try {
      const newSettings = req.body;
      
      await fs.writeFile(
        this.settingsPath,
        JSON.stringify(newSettings, null, 2),
        'utf8'
      );

      res.json({
        success: true,
        message: 'Settings updated successfully'
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({
        error: 'Failed to update settings',
        details: error.message
      });
    }
  }
}

module.exports = new ViewController();
