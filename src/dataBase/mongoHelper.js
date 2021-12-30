const mongoDbSettings = {
  connectionName: 'connection_mongo',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: true,
  authSource: 'admin',
};
const mongo = require('@condor-labs/mongodb')(mongoDbSettings);
const logger = require('@condor-labs/logger');

const helper = {
  clients: {}, // In clients we will save our connections that the library send us
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    // It will connect every connection on the array "mongoDbSettings"

    const client = await mongo.getClient();
    helper.clients = client;
    logger.info('Database is connected.');
    return mongo;
  },
};

module.exports = helper;
