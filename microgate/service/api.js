import crypto from 'crypto'
import nowDate from '../utils/dateutils'
import uuid from 'node-uuid'
import coRedisClient from './redis'

export default class ApiService {
  constructor(prefix) {
    this.prefix = prefix
    this.key = `${prefix}:methodsMap`;
    this.coRedisClient = coRedisClient;
  }

  async update(methodsMap) {
    await this.coRedisClient.set(this.key, JSON.stringify(methodsMap));
    return {
      success: true
    }
  }

  async query(searchKey) {
    let methodsMap = await this.coRedisClient.get(this.key);
    if (!methodsMap) {
      return {
        success: false,
        message: `Redis Key: ${this.key} not found`
      }
    }
    return {
      success: true,
      methodsMap: JSON.parse(methodsMap)
    }
  }
  async getByName(name) {
    let methodsMap = await this.coRedisClient.get(this.key);
    methodsMap = JSON.parse(methodsMap)
    let _api;
    for (let _api in methodsMap) {
      if (methodsMap[_api].name == name) {
        methodsMap[_api].name = name
        return {
          success: true,
          method: methodsMap[_api]
        }
      }
    }

    return {
      success: false,
      message: `Method: ${name} not found`
    }

  }
}
