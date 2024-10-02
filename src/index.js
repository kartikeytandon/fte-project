require('dotenv').config({ path: '../.env' });
const { app, logger } = require('./app');
const config = require('./config');
const http = require('http');
const Redis = require('./utils/lib/redis');
const CockroachDb = require('./utils/lib/cockroachdb');
const server = http.createServer(app);

(async () => {
  const db = new CockroachDb(config.cockroach);
  const s = await db.query('CREATE DATABASE sample;');
  // const s1 = await db.query('USE sample;');
  console.log(s, s1)
})()

server.listen(config.service.port, config.service.host, () => {
  logger.info(`Server started at ${config.service.host}:${config.service.port}`);
});