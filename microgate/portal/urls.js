import settings from '../settings';
import redis from 'redis';
import coRedis from "co-redis";
import AccountService from './service/account';
import ApiService from './service/api';

let redisClient = redis.createClient(settings.settings.redis);
let coRedisClient = coRedis(redisClient);


redisClient.on("error", function(err) {
  console.log("Redis Error " + err);
});

export default [{
  method: 'GET',
  path: '/portal/admin',
  matchAll: true,
  handler: async function(ctx) {
    ctx.body = await render('index', {
      title: 'title'
    });
  }
}, {
  method: 'POST',
  path: '/portal/rest/account/login',
  matchAll: true,
  handler: async function(ctx) {
    // return JSON.stringify({
    //   user: {
    //     username: 'zhouyang'
    //   },
    //   cookieName: 'microgate',
    //   sessionId: '1212121212122'
    // })
    let accountService = new AccountService(settings.settings.RedisKeyPrefix)
    let result = await accountService.login(ctx.request.body.username, ctx.request.body.password)
    if (!result.success) {
      ctx.throw(result.message, 400)
    }
    console.log('sessionId: ', result.sessionId)
    return JSON.stringify({
      user: {
        username: result.userinfo.username,
        createAt: result.userinfo.createAt,
        updateAt: result.userinfo.updateAt,
        type: result.userinfo.type
      },
      cookieName: 'microgate',
      sessionId: result.sessionId
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/account/logout',
  handler: async function(ctx) {
    let accountService = new AccountService(settings.settings.RedisKeyPrefix)
    let result = await accountService.logout(ctx.request.body.sessionId)
    console.log('result: ', result);
    if (!result.success) {
      ctx.throw(result.message, 400)
    }
    return JSON.stringify({
      success: true,
      message: 'logout successful'
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/apis/create',
  matchAll: true,
  handler: async function(ctx) {
    let body = ctx.request.body;
    settings.settings['methodsMap'][body['name']] = {
      'path': body.path,
      'timeout': body.timeout,
      'body': body.bodyItems,
      'header': body.headerItems
    }
    let apiService = new ApiService(settings.settings.RedisKeyPrefix)
    let result = await apiService.create(settings.settings.methodsMap)
    if (!result.success) {
      ctx.throw(result.message, 400)
    }
    return JSON.stringify(result)
  }
}, {
  method: 'POST',
  path: '/portal/rest/apis/update',
  matchAll: true,
  handler: async function(ctx) {
    return JSON.stringify({
      'success': true,
      'message': 'ok'
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/apis/delete',
  matchAll: true,
  handler: async function(ctx) {
    return JSON.stringify({
      'success': true,
      'message': 'ok'
    })
  }
}, {
  method: 'GET',
  path: '/portal/rest/apis/query',
  matchAll: true,
  handler: async function(ctx) {
    let apiService = new ApiService(settings.settings.RedisKeyPrefix)
    let result = await apiService.query(ctx.body.search)
    if (!result.success) {
      ctx.throw(result.message, 400)
    }
    return JSON.stringfiy(result);
  }
}, {
  method: 'POST',
  path: '/portal/rest/user/create',
  matchAll: true,
  handler: async function(ctx) {
    let accountService = new AccountService(settings.settings.RedisKeyPrefix)
    let result = await accountService.create(ctx.request.body.username, {
      password: ctx.request.body.password
    })
    if (!result.success) {
      ctx.throw(result.message, 400)
    }

    return JSON.stringify(result)
  }
}]
