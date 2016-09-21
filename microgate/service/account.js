import crypto from 'crypto'
import { nowDate } from '../utils/dateutils'
import uuid from 'node-uuid'
import coRedisClient from './redis'

export default class AccountService {

  constructor(prefix) {
    this.prefix = prefix
    this.coRedisClient = coRedisClient;
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

  async getUserBySessionId(sessionId) {
    let sessionKey = this.getSessionKey(sessionId);
    let res = await this.coRedisClient.get(sessionKey)
    return JSON.parse(res)
  }

  async login(userinfo) {
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
