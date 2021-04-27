/* eslint-disable no-console */
import redis, { RedisClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
})

class Redis {
  redis: RedisClient;

  constructor() {
    this.redis = redis
      .createClient({
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6367,
        password: process.env.REDIS_PASSWORD || '1234',
        prefix: 'cynet:'
      })
      .on('connect', () => {
        console.log('[REDIS]: Connection Work')
      })
      .on('error', () => {
        console.log('[REDIS]: Connection Error')
      })
  }
}
export default new Redis()
