const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { healthMonitor } = require('@condor-labs/health-middleware');
const logger = require('@condor-labs/logger');
const mongoDbHelper = require('./dataBase/mongoHelper');
const { settings } = require('./redis/constants');
const redis = require('@condor-labs/redis')(settings);
const responseTime = require('response-time');

const app = express();
app.use(responseTime());
healthMonitor(app);

(async () => {
  try {
    await mongoDbHelper.connect();
    const client = await redis.getClient();
    const { myschema } = require('./graphql/schema');
    logger.info({ DataBase: 'Data base is conected.' });

    app.get('/', (req, res) => {
      res.json({
        message: 'Welcome.',
      });
    });

    app.use(
      '/graphql',
      graphqlHTTP({
        graphiql: true,
        schema: myschema,
        context: {
          client,
        },
      })
    );
  } catch (e) {
    logger.error(`Data base is No conected. ${e}`);
    console.log(e);
  }
})();

app.listen(3000, () => logger.info({ Server: 'Server on port 3000' }));
