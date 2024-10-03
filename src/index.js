require('dotenv').config({ path: '../.env' });
const { app, logger } = require('./app');
const config = require('./config');
const http = require('http');
const Redis = require('./utils/lib/redis');
const CockroachDb = require('./utils/lib/cockroachdb');
const MongoDb = require('./utils/lib/mongodb');
const server = http.createServer(app);

(async () => {
    const db = new MongoDb('')
})()

server.listen(config.service.port, config.service.host, () => {
  logger.info(`Server started at ${config.service.host}:${config.service.port}`);
});