const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { randomUUID } = require('crypto');
const pino = require('pino');
const loggerMiddleware = require('pino-http');
const config = require('./config');
const router = require('./routes');
const MongoDb = require('./utils/lib/mongodb');
const Redis = require('./utils/lib/redis');

const app = express();
const logger = pino();
const mongoDb = new MongoDb(config.mongo.url);
const redisClient = new Redis({ host: config.redis.host, port: config.redis.port, password: config.redis.password });

(async () => {
  try {
    await mongoDb.init();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser(config.cookie.secret));
app.use(cors(config.cors));
app.use(
  loggerMiddleware({
    logger,
    genReqId: (req) => req.headers['x-request-id'] || randomUUID(),
    useLevel: 'info',
  })
);

app.use((req, res, next) => {
  req.mongoDb = mongoDb;
  req.redis = redisClient;
  next();
});

app.use(`/${config.service.endpoint}`, router);

module.exports = { app, logger };