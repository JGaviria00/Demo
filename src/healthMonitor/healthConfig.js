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
        port: 6379,
      },
    },
    {
      service: dependencyServices.MONGODB,
      componentName: 'MyMongoDB',
      connection: {
        host: 'cluster0-shard-00-00.bqg6z.mongodb.net,cluster0-shard-00-01.bqg6z.mongodb.net,cluster0-shard-00-02.bqg6z.mongodb.net',
        port: 27017,
        database: 'Cluster0',
        user: 'jhonga',
        password: 'jhonga123',
        ssl: true,
        authSource: 'admin',
      },
    },
  ],
};

module.exports = healthConfig;
