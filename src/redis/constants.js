module.exports = {
  settings: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  keyName: 'test:condorlabs-npm-helpers:counter',
};
