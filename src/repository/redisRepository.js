const redisHelper = require('../redis/redisHelper');

module.exports = class RedisRepository {
  constructor() {
    this.redis = redisHelper;
    this.redis.connection();
  }

  async set(key, data) {
    return await this.redis.set(key, data);
  }

  async update(key, data) {
    return await this.redis.update(key, data);
  }

  async get(key) {
    return await this.redis.get(key);
  }

  async delete(key) {
    return await this.redis.delete(key);
  }
};
