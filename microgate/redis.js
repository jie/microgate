import redis from 'redis';
import settings from './settings'
import coRedis from "co-redis"

let redisClient = redis.createClient(settings.settings.redis);
let coRedisClient = coRedis(redisClient);

redisClient.on("error", function(err) {
  console.log("Redis Error " + err);
});

export default coRedisClient
