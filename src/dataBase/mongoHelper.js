const mongoDbSettings = [
  {
    connectionName: "connection_mongo",
    host: "cluster0-shard-00-00.bqg6z.mongodb.net,cluster0-shard-00-01.bqg6z.mongodb.net,cluster0-shard-00-02.bqg6z.mongodb.net",
    port: "27017",
    database: "Cluster0",
    user: "jhonga",
    password: "jhonga123",
    ssl: true,
    authSource: "admin"
  }
]

const mongo = require("@condor-labs/mongodb")(mongoDbSettings);

const helper = {
  clients: {}, // In clients we will save our connections that the library send us
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    // It will connect every connection on the array "mongoDbSettings"
    for (const item of mongoDbSettings) {
      let client = await mongo.getClient(item.connectionName);
      helper.clients[item.connectionName] = client;
    }
  },
};

module.exports = helper;