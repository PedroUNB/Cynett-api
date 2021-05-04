/* eslint-disable no-console */
import redis from 'redis';
import dotenv from 'dotenv';
import { promisify } from 'util';
import RedisType from 'src/@types/redis';
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
});

class Redis {
  redis: RedisType;

  constructor() {
    this.redis = redis
      .createClient({
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6367,
        password: process.env.REDIS_PASSWORD || '1234',
        prefix: 'cynet:',
      })
      .on('connect', () => {
        console.log('[REDIS]: Connection Work');
      })
      .on('error', () => {
        console.log('[REDIS]: Connection Error');
      });

    this.redis.getAsync = this.getAsync();
  }

  private getAsync() {
    return promisify(this.redis.get).bind(this.redis);
  }
}

export default new Redis().redis;
