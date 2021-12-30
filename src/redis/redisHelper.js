const settings = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const redis = require('@condor-labs/redis')(settings);
const logger = require('@condor-labs/logger');

let redisBatch;
let client;
const helper = {
  connection: async () => {
    try {
      client = await redis.getClient();
      redisBatch = client.batch();
      logger.info('Redis is connected.');
    } catch (e) {
      logger.error({ error: `Wrong connection to redis. ${e}` });
    }
  },
  set: async (key, data) => {
    try {
      await redisBatch.set(key, JSON.stringify(data));
      return redisBatch.execAsync();
    } catch (e) {
      logger.error({ error: `Redis can not set the data. ${e}` });
    }
  },
  update: async (key, data) => {
    try {
      await redisBatch.hset(key, JSON.stringify(data));
      return redisBatch.execAsync();
    } catch (e) {
      logger.error({ error: `Redis can not update the data. ${e}` });
    }
  },
  get: async (key) => {
    try {
      await redisBatch.get(key);
      const res = await redisBatch.execAsync();
      return JSON.parse(res[0]);
    } catch (e) {
      logger.error({ error: `Redis can not get the data. ${e}` });
    }
  },
  delete: async (key) => {
    try {
      await redisBatch.expire(key, 1);
      return redisBatch.execAsync();
    } catch (e) {
      logger.error({ error: `Redis can not delete the data. ${e}` });
    }
  },
};

module.exports = helper;
