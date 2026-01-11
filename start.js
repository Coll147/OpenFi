const port = process.argv[2] || 3000;
process.env.PORT = port;

require('./backend/server.js');