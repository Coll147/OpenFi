const databaseService = require('./database.service');
const emailService = require('./email.service');

class LogService {
  // Create new log entry
  async createLog(logEvent, logDevice, logRisk, logInfo) {
    try {
      const time = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const logData = {
        type: logEvent,
        device: logDevice,
        time: time,
        risk: logRisk,
        info: logInfo,
        comments: ''
      };

      const result = await databaseService.insert('logs', logData);
      console.log('New log added with id:', result.insertId);

      // Send email notification in background
      this.sendLogNotification(logEvent, logDevice, logRisk, logInfo, time)
        .catch(err => console.error('Error sending log notification:', err));

      return { success: true, id: result.insertId };
    } catch (error) {
      console.error('Error creating log:', error);
      throw error;
    }
  }

  // Send email notification for log
  async sendLogNotification(logEvent, logDevice, logRisk, logInfo, time) {
    try {
      // Get admin email
      const admin = await databaseService.findOne('userdata', 'username', 'admin');
      
      if (!admin || !admin.email) {
        console.error('Admin email not found');
        return;
      }

      await emailService.sendLogAlert(
        admin.email,
        logEvent,
        logDevice,
        logRisk,
        logInfo,
        time
      );
    } catch (error) {
      console.error('Error in sendLogNotification:', error);
    }
  }

  // Get all logs
  async getAllLogs() {
    return await databaseService.findAll('logs');
  }

  // Get logs by risk level
  async getLogsByRisk(riskLevel) {
    const sql = 'SELECT * FROM logs WHERE risk = ? ORDER BY time DESC';
    return await databaseService.query(sql, [riskLevel]);
  }

  // Get logs by device
  async getLogsByDevice(device) {
    const sql = 'SELECT * FROM logs WHERE device = ? ORDER BY time DESC';
    return await databaseService.query(sql, [device]);
  }

  // Update log comments
  async updateLogComments(logId, comments) {
    return await databaseService.update('logs', 'comments', comments, 'id', logId);
  }

  // Delete log
  async deleteLog(logId) {
    return await databaseService.delete('logs', 'id', logId);
  }
}

module.exports = new LogService();
