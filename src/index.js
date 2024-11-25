require('dotenv').config();
const http = require('http');
const { app, logger } = require('./app');
const config = require('./config');

const server = http.createServer(app);

server.listen(config.service.port, config.service.host, () => {
  logger.info(`Server started at ${config.service.host}:${config.service.port}`);
});