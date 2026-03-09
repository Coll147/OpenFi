const networkService = require('../services/network.service');

class NetworkController {
  // Ping host
  async pingHost(req, res) {
    try {
      const { host } = req.params;

      if (!host) {
        return res.status(400).json({
          error: 'Host parameter is required'
        });
      }

      const result = await networkService.pingHost(host);
      return res.json(result);
    } catch (error) {
      console.error('Ping error:', error);
      return res.status(500).json({
        error: 'Ping failed',
        details: error.message
      });
    }
  }

  // Get MAC vendor
  async getMacVendor(req, res) {
    try {
      const { mac } = req.params;

      if (!networkService.isValidMac(mac)) {
        return res.status(400).json({
          error: 'Invalid MAC address format'
        });
      }

      const result = await networkService.getMacVendor(mac);
      return res.json(result);
    } catch (error) {
      console.error('MAC vendor lookup error:', error);
      return res.status(500).json({
        error: 'Failed to lookup MAC vendor',
        details: error.message
      });
    }
  }
}

module.exports = new NetworkController();
