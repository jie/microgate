import settings from '../../settings';
import redis from 'redis';
import coRedis from "co-redis";
import crypto from 'crypto'
import {nowDate} from '../../utils/dateutils'
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

    async login(username, password) {
        let userKey = this.getUserKey(username)
        let userRaw = await this.coRedisClient.get(userKey)

        if(!userRaw) {
            return {
                success: false,
                message: 'username not found'
            }
        }

        let userinfo = JSON.parse(userRaw)
        let hashPwd = this.digestPassword(password)

        if (userinfo.password != hashPwd) {
            return {
                success: false,
                message: 'password not match'
            }
        }

        let sessionId = uuid.v4();
        console.log('v4:', sessionId)
        let sessionData = {
            username: userinfo.username,
            type: userinfo.type,
            createAt: userinfo.createAt,
            updateAt: userinfo.updateAt
        }

        let sessionKey = this.getSessionKey(sessionId);
        await this.coRedisClient.set(sessionKey, JSON.stringify(sessionData))
        await this.coRedisClient.expire(sessionKey, 3600 * 24 * 7)
        return {
            success: true,
            userinfo: userinfo,
            sessionId: sessionId
        }
    }

    async logout(sessionId) {
        let sessionKey = this.getSessionKey(sessionId)
        let sessionData = await this.coRedisClient.get(sessionKey)
        let session = JSON.parse(sessionData)

        if(!sessionData) {
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

    async create(username, userinfo) {
        if(!userinfo.password) {
            return {
                success: false,
                message: 'must give user password'
            }
        }

        let userKey = this.getUserKey(username);
        let user = await this.coRedisClient.get(userKey);
        if(user) {
            return {
                success: false,
                message: 'username existed'
            }
        }
        let hashPwd = this.digestPassword(userinfo.password);
        userinfo['password'] = hashPwd;
        userinfo['createAt'] = nowDate();
        userinfo['updateAt'] = nowDate();
        await this.coRedisClient.set(userKey, JSON.stringify(userinfo))
        return {
            success: true
        }
    }

    async update(username, userinfo) {
        let userKey = this.getUserKey(username);
        let userRaw = await this.coRedisClient.get(userKey);
        if(!userRaw) {
            return {
                success: false,
                message: 'user not found'
            }
        }

        let _userinfo = JSON.parse(userRaw);
        userinfo.password = _userinfo.password;
        await this.coRedisClient.set(userKey, JSON.stringify(userinfo));
        return {
            success: true
        }
    }

    async changePassword(username, password, newPassword) {
        let userKey = this.getUserKey(username);
        let userRaw = await this.coRedisClient.get(userKey);
        if(!userRaw) {
            return {
                success: false,
                message: 'user not found'
            }
        }
        let userinfo = JSON.parse(userRaw)
        let hashPwd = this.digestPassword(password)
        if(hashPwd!=userinfo.password) {
            return {
                success: false,
                message: 'password not match'
            }
        }

        let hashNewPwd = this.digestPassword(newPassword);
        userinfo['password'] = hashNewPwd;
        await this.coRedisClient.set(userKey, JSON.stringify(userinfo))
        return {
            success: true
        }
    }
}
