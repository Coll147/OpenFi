const logService = require('../services/log.service');

class LogController {
  // Create new log
  async createLog(req, res) {
    try {
      const { logEvent, logDevice, logRisk, logInfo } = req.body;

      if (!logEvent || !logDevice || !logRisk || !logInfo) {
        return res.status(400).json({
          error: 'Missing required parameters: logEvent, logDevice, logRisk, logInfo'
        });
      }

      console.log('Creating log:', { logEvent, logDevice, logRisk, logInfo });

      const result = await logService.createLog(logEvent, logDevice, logRisk, logInfo);

      return res.json(result);
    } catch (error) {
      console.error('Error creating log:', error);
      return res.status(500).json({
        error: 'Failed to create log',
        details: error.message
      });
    }
  }

  // Get all logs
  async getAllLogs(req, res) {
    try {
      const logs = await logService.getAllLogs();
      return res.json(logs);
    } catch (error) {
      console.error('Error getting logs:', error);
      return res.status(500).json({
        error: 'Failed to get logs',
        details: error.message
      });
    }
  }

  // Get logs by risk
  async getLogsByRisk(req, res) {
    try {
      const { risk } = req.params;
      const logs = await logService.getLogsByRisk(risk);
      return res.json(logs);
    } catch (error) {
      console.error('Error getting logs by risk:', error);
      return res.status(500).json({
        error: 'Failed to get logs',
        details: error.message
      });
    }
  }

  // Get logs by device
  async getLogsByDevice(req, res) {
    try {
      const { device } = req.params;
      const logs = await logService.getLogsByDevice(device);
      return res.json(logs);
    } catch (error) {
      console.error('Error getting logs by device:', error);
      return res.status(500).json({
        error: 'Failed to get logs',
        details: error.message
      });
    }
  }

  // Update log comments
  async updateComments(req, res) {
    try {
      const { id } = req.params;
      const { comments } = req.body;

      if (comments === undefined) {
        return res.status(400).json({
          error: 'Comments parameter is required'
        });
      }

      const result = await logService.updateLogComments(id, comments);

      return res.json({
        success: true,
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('Error updating log comments:', error);
      return res.status(500).json({
        error: 'Failed to update comments',
        details: error.message
      });
    }
  }

  // Delete log
  async deleteLog(req, res) {
    try {
      const { id } = req.params;

      const result = await logService.deleteLog(id);

      return res.json({
        success: true,
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('Error deleting log:', error);
      return res.status(500).json({
        error: 'Failed to delete log',
        details: error.message
      });
    }
  }
}

module.exports = new LogController();
