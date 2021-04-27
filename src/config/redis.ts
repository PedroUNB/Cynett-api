import redis, { RedisClient } from 'redis'

class Redis {
  redis: RedisClient

  constructor() {
    this.redis = redis
      .createClient({
        host: process.env.REDIS_HOST || 'localhost',
        password: '1234',
        prefix: 'cynet:',
      })
      .on('connect', () => {
        console.log('Redis Work')
      })
      .on('error', () => {
        console.log('Redis Error')
      })
  }
}
export default new Redis()
