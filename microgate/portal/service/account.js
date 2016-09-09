import settings from '../../settings';
import redis from 'redis';
import coRedis from "co-redis";
import crypto from 'crypto'
import { nowDate } from '../../utils/dateutils'
import uuid from 'node-uuid';

export default class AccountService {

  constructor(prefix) {
    this.prefix = prefix
    this.coRedisClient = coRedis(redis.createClient(settings.settings.redis));
  }

  getUserKey(username) {
    return `${this.prefix}:user:${username}`
  }

  getSessionKey(sessionId) {
    return `${this.prefix}:session:${sessionId}`
  }

  digestPassword(password) {
    return crypto.createHmac('sha256', password).digest('hex')
  }

  async login(userinfo) {
    let userKey = this.getUserKey(userinfo.username)
    let sessionId = uuid.v4();
    let sessionKey = this.getSessionKey(sessionId);
    await this.coRedisClient.set(sessionKey, JSON.stringify(userinfo))
    await this.coRedisClient.expire(sessionKey, 3600 * 24 * 7)
    return sessionId
  }

  async logout(sessionId) {
    let sessionKey = this.getSessionKey(sessionId)
    let sessionData = await this.coRedisClient.get(sessionKey)
    let session = JSON.parse(sessionData)

    if (!sessionData) {
      return {
        success: false,
        message: 'session not found'
      }
    }
    await this.coRedisClient.del(sessionKey)
    return {
      success: true
    }
  }
}
