const deviceService = require('../services/device.service');
const networkService = require('../services/network.service');

class DeviceController {
  // Add new device
  async addDevice(req, res) {
    try {
      const { deviceIp, deviceNick } = req.body;

      if (!deviceIp) {
        return res.status(400).json({
          error: 'Device IP is required'
        });
      }

      // Validate IP format
      if (!networkService.isValidIp(deviceIp)) {
        return res.status(400).json({
          error: 'Invalid IP address format'
        });
      }

      console.log('Adding device:', { deviceIp, deviceNick });

      const result = await deviceService.addDevice(deviceIp, deviceNick);

      return res.json(result);
    } catch (error) {
      console.error('Error adding device:', error);
      return res.status(500).json({
        error: 'Failed to add device',
        details: error.message
      });
    }
  }

  // Get all devices
  async getAllDevices(req, res) {
    try {
      const devices = await deviceService.getAllDevices();
      return res.json(devices);
    } catch (error) {
      console.error('Error getting devices:', error);
      return res.status(500).json({
        error: 'Failed to get devices',
        details: error.message
      });
    }
  }

  // Get device by MAC
  async getDeviceByMac(req, res) {
    try {
      const { mac } = req.params;

      if (!networkService.isValidMac(mac)) {
        return res.status(400).json({
          error: 'Invalid MAC address format'
        });
      }

      const device = await deviceService.getDeviceByMac(mac);

      if (!device) {
        return res.status(404).json({
          error: 'Device not found'
        });
      }

      return res.json(device);
    } catch (error) {
      console.error('Error getting device:', error);
      return res.status(500).json({
        error: 'Failed to get device',
        details: error.message
      });
    }
  }

  // Update device
  async updateDevice(req, res) {
    try {
      const { mac } = req.params;
      const { field, value } = req.body;

      if (!field || value === undefined) {
        return res.status(400).json({
          error: 'Field and value are required'
        });
      }

      const result = await deviceService.updateDevice(mac, field, value);

      return res.json({
        success: true,
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('Error updating device:', error);
      return res.status(500).json({
        error: 'Failed to update device',
        details: error.message
      });
    }
  }

  // Delete device
  async deleteDevice(req, res) {
    try {
      const { mac } = req.params;

      const result = await deviceService.deleteDevice(mac);

      return res.json({
        success: true,
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('Error deleting device:', error);
      return res.status(500).json({
        error: 'Failed to delete device',
        details: error.message
      });
    }
  }
}

module.exports = new DeviceController();
