const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const config = require('./config');
const databaseService = require('./services/database.service');

// Import routes
const apiRoutes = require('./routes/api.routes');
const webRoutes = require('./routes/web.routes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Initialize database connection
databaseService.initialize();

// Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    ...(config.server.env === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start server
const PORT = config.server.port;

const server = app.listen(PORT, () => {
  console.log(`
=================
  OpenFI Server
=================
URL: http://localhost:${PORT}
  `);
  console.log('ready');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(async () => {
    console.log('HTTP server closed');
    await databaseService.close();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT received, closing server gracefully...');
  server.close(async () => {
    console.log('HTTP server closed');
    await databaseService.close();
    process.exit(0);
  });
});

module.exports = app;
