module.exports = {
  service: {
    port: 4000,
    host: '127.0.0.1',
    endpoint: 'sample', 
  },
  cookie: {
    secret: 'COOKIE_KEY',
  },
  cors: {
    origin: "http://localhost:5000", 
    allowedHeaders: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
  redis: {
    host: '127.0.0.1', 
    port: 6379,
    password: 'REDIS_PASSWORD',
  },
  // tU5co5QcskrcIAKF
  mongo: {
    url: 'mongodb+srv://tandonkartikey11:tU5co5QcskrcIAKF@cluster0.niyqm.mongodb.net/', 
    database: 'myapp', 
  },
  cockroach: {
    user: 'root', 
    maxPoolSize: 10, 
    host: '127.0.0.1', 
    port: 26257, 
  },
};