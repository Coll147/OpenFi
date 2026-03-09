const ping = require('ping');

class NetworkService {
  // Ping a host
  async pingHost(host, timeout = 2) {
    try {
      const result = await ping.promise.probe(host, { timeout });
      return {
        host,
        alive: result.alive,
        status: result.alive ? 'Online' : 'Offline',
        time: result.time,
        min: result.min,
        max: result.max,
        avg: result.avg
      };
    } catch (error) {
      console.error('Ping error:', error);
      return {
        host,
        alive: false,
        status: 'Error',
        error: error.message
      };
    }
  }

  // Get MAC vendor information
  async getMacVendor(mac) {
    try {
      const response = await fetch(`https://api.maclookup.app/v2/macs/${mac}`);
      const data = await response.json();
      return {
        success: true,
        vendor: data.company || 'Unknown',
        data: data
      };
    } catch (error) {
      console.error('Error fetching MAC vendor:', error);
      return {
        success: false,
        vendor: 'Unknown',
        error: error.message
      };
    }
  }

  // Validate IP address format
  isValidIp(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;

    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  // Validate MAC address format
  isValidMac(mac) {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  }

  // Normalize MAC address format
  normalizeMac(mac) {
    return mac.toUpperCase().replace(/[:-]/g, ':');
  }
}

module.exports = new NetworkService();
