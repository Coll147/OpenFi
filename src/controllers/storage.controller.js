const databaseService = require('../services/database.service');

class StorageController {
  // Generic database operations
  async handleOperation(req, res) {
    try {
      const { table, column, value, pk, id } = req.body;

      // FULL TABLE READ
      if (table && !column && !value && !pk && !id) {
        console.log('Reading full table:', table);
        const rows = await databaseService.findAll(table);
        return res.json(rows);
      }

      // VALUE UPDATE
      else if (table && column && value && pk && id) {
        console.log('Updating:', { table, column, value, pk, id });
        const result = await databaseService.update(table, column, value, pk, id);
        console.log('Update complete, affected rows:', result.affectedRows);
        return res.json({
          success: true,
          affectedRows: result.affectedRows
        });
      }

      // REMOVE ENTRY
      else if (table && !column && !value && pk && id) {
        console.log('Deleting from:', table);
        const result = await databaseService.delete(table, pk, id);
        return res.json({
          success: true,
          affectedRows: result.affectedRows
        });
      }

      // SPECIFIC READ
      else if (table && column && !value && pk && id) {
        console.log('Specific read:', { column, table, pk, id });
        const row = await databaseService.findColumn(table, column, pk, id);
        return res.json(row ? [row] : []);
      }

      else {
        return res.status(400).json({
          error: 'Invalid operation parameters'
        });
      }

    } catch (error) {
      console.error('Storage operation error:', error);
      return res.status(500).json({
        error: 'Database operation failed',
        details: error.message
      });
    }
  }
}

module.exports = new StorageController();
