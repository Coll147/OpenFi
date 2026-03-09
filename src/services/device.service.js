const databaseService = require('./database.service');
const sshService = require('./ssh.service');

class DeviceService {
  // Get all devices
  async getAllDevices() {
    return await databaseService.findAll('devices');
  }

  // Get device by MAC address
  async getDeviceByMac(mac) {
    return await databaseService.findOne('devices', 'mac', mac);
  }

  // Get device by IP
  async getDeviceByIp(ip) {
    return await databaseService.findOne('devices', 'ip', ip);
  }

  // Add new device
  async addDevice(deviceIp, deviceNick) {
    try {
      // Get device info via SSH
      const deviceJson = await sshService.getDeviceInfo(deviceIp);
      
      const [key] = Object.keys(deviceJson);
      const macAddr = key.split('@')[1];
      const deviceModel = deviceJson[key].Device;

      const deviceData = {
        mac: macAddr,
        ip: deviceIp,
        nick: deviceNick,
        model: deviceModel,
        specs: JSON.stringify(deviceJson)
      };

      const result = await databaseService.insert('devices', deviceData);

      return {
        success: true,
        id: result.insertId,
        device: deviceData
      };
    } catch (error) {
      console.error('Error adding device:', error);
      throw error;
    }
  }

  // Update device
  async updateDevice(mac, field, value) {
    return await databaseService.update('devices', field, value, 'mac', mac);
  }

  // Delete device
  async deleteDevice(mac) {
    return await databaseService.delete('devices', 'mac', mac);
  }

  // Get device specs
  async getDeviceSpecs(mac) {
    const device = await this.getDeviceByMac(mac);
    if (device && device.specs) {
      return JSON.parse(device.specs);
    }
    return null;
  }

  // Update device nickname
  async updateDeviceNickname(mac, nickname) {
    return await this.updateDevice(mac, 'nick', nickname);
  }

  // Check if device exists
  async deviceExists(mac) {
    const device = await this.getDeviceByMac(mac);
    return !!device;
  }
}

module.exports = new DeviceService();
