const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoDbHelper = require('./dataBase/mongoHelper');
const { settings } = require('./redis/constants');
const { healthMonitor } = require('@condor-labs/health-middleware');
const logger = require('@condor-labs/logger');
const redis = require('@condor-labs/redis')(settings);
const { healthConfig } = require('./healthMonitor/healthConfig');
const responseTime = require('response-time');

const app = express();
app.use(responseTime());
healthMonitor(app, healthConfig);

(async () => {
  try {
    //conexion to the database and redis.
    await mongoDbHelper.connect();
    const client = await redis.getClient();
    const { myschema } = require('./graphql/schema');
    logger.info({ DataBase: 'Data base is conected.' });

    //graphql middleware
    app.use('/graphql', () => {
      return graphqlHTTP({
        graphiql: true,
        schema: myschema,
        context: {
          client,
        },
      });
    });
  } catch (e) {
    logger.error(`Data base is No conected. ${e}`);
  }
})();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome.',
  });
});

app.listen(3000, () => logger.info({ Server: 'Server on port 3000' }));

module.exports = app;
