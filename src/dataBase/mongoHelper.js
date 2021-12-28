const mongoDbSettings = [
  {
    connectionName: 'connection_mongo',
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: true,
    authSource: 'admin',
  },
];

const mongo = require('@condor-labs/mongodb')(mongoDbSettings);

const helper = {
  clients: {}, // In clients we will save our connections that the library send us
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    // It will connect every connection on the array "mongoDbSettings"
    for (const item of mongoDbSettings) {
      const client = await mongo.getClient(item.connectionName);
      helper.clients[item.connectionName] = client;
    }
  },
};

module.exports = helper;
