const mysql = require('mysql2/promise');
const config = require('../config');

class DatabaseService {
  constructor() {
    this.config = config.database;
    this.pool = null;
  }

  // Initialize connection pool
  initialize() {
    this.pool = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('>> Database connection pool ready');
  }

  // Get connection from pool
  async getConnection() {
    if (!this.pool) {
      this.initialize();
    }
    return await this.pool.getConnection();
  }

  // Execute query
  async query(sql, params = []) {
    const connection = await this.getConnection();
    try {
      const formattedSql = mysql.format(sql, params);
      const [rows] = await connection.execute(formattedSql);
      return rows;
    } finally {
      connection.release();
    }
  }

  // Get all records from a table
  async findAll(table) {
    const sql = 'SELECT * FROM ??';
    return await this.query(sql, [table]);
  }

  // Find specific record
  async findOne(table, column, value) {
    const sql = 'SELECT * FROM ?? WHERE ?? = ?';
    const results = await this.query(sql, [table, column, value]);
    return results[0] || null;
  }

  // Find specific column value
  async findColumn(table, selectColumn, whereColumn, value) {
    const sql = 'SELECT ?? FROM ?? WHERE ?? = ?';
    const results = await this.query(sql, [selectColumn, table, whereColumn, value]);
    return results[0] || null;
  }

  // Update record
  async update(table, column, value, pkColumn, pkValue) {
    const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    const result = await this.query(sql, [table, column, value, pkColumn, pkValue]);
    return result;
  }

  // Delete record
  async delete(table, pkColumn, pkValue) {
    const sql = 'DELETE FROM ?? WHERE ?? = ?';
    const result = await this.query(sql, [table, pkColumn, pkValue]);
    return result;
  }

  // Insert record
  async insert(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');
    
    const sql = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = await this.query(sql, [table, ...values]);
    return result;
  }

  // Close pool
  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('Database connection pool closed');
    }
  }
}

module.exports = new DatabaseService();
