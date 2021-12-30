const { dependencyServices } = require('@condor-labs/health-middleware');
const healthConfig = {
  //only need modify params that you need it
  service: 'The Library',
  description: 'Appi that can create, update, delete, list books',
  dependencies: [
    // by default cacheTTL will be 10 seconds
    {
      service: dependencyServices.REDIS,
      componentName: 'MyRedis',
      connection: {
        prefix: 'demo',
        host: '127.0.0.1',
        port: process.env.REDIS_PORT,
      },
    },
    {
      service: dependencyServices.MONGODB,
      componentName: 'MyMongoDB',
      connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        ssl: true,
        authSource: 'admin',
      },
    },
  ],
};

module.exports = healthConfig;
