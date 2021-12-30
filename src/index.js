const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { healthMonitor } = require('@condor-labs/health-middleware');
const logger = require('@condor-labs/logger');
const { healthConfig } = require('./healthMonitor/healthConfig');
const responseTime = require('response-time');
const { myschema } = require('./graphql/schema');

const app = express();
app.use(responseTime());
healthMonitor(app, healthConfig);

// graphql middleware
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: myschema,
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome.',
  });
});

app.listen(3000, () => logger.info({ Server: 'Server on port 3000' }));

module.exports = app;
