import { RedisClient } from 'redis';

export default interface RedisType extends RedisClient {
  getAsync?: Function;
}
