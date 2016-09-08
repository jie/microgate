import settings from '../settings';
import redis from 'redis';
import coRedis from "co-redis";
import AccountService from './service/account';
import ApiService from './service/api';
import co from 'co';

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
}, {
  method: 'POST',
  path: '/portal/rest/apis/create',
  matchAll: true,
  handler: async function(ctx) {
    let res
    if (ctx.request.body.id) {
      res = await ctx.app.models.api.update({
        id: ctx.request.body.id
      }, ctx.request.body)
    } else {
      res = await ctx.app.models.api.create(ctx.request.body)
    }
    return JSON.stringify({
      pk: res.id
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
  method: 'POST',
  path: '/portal/rest/apis/query',
  matchAll: true,
  handler: async function(ctx) {
    let page = ctx.request.body.page || 1;
    let res = await ctx.app.models.api.find().paginate({
      page: page,
      limit: 20
    }).sort({
      createdAt: 'desc'
    })
    return JSON.stringify({
      entities: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/apis/view',
  matchAll: true,
  handler: async function(ctx) {
    let res = await ctx.app.models.api.findOne({
      name: ctx.request.body.name
    })
    return JSON.stringify({
      entity: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/services/create',
  matchAll: true,
  handler: async function(ctx) {
    let res
    if (ctx.request.body.id) {
      res = await ctx.app.models.service.update({
        id: ctx.request.body.id
      }, ctx.request.body)
    } else {
      res = await ctx.app.models.service.findOrCreate({
        name: ctx.request.body.name
      }, ctx.request.body)
    }
    return JSON.stringify({
      pk: res.id
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/services/delete',
  matchAll: true,
  handler: async function(ctx) {
    return JSON.stringify({
      'success': true,
      'message': 'ok'
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/services/query',
  matchAll: true,
  handler: async function(ctx) {
    let page = ctx.request.body.page || 1;
    let res = await ctx.app.models.service.find().paginate({
      page: page,
      limit: 20
    }).sort({
      createdAt: 'desc'
    })
    return JSON.stringify({
      entities: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/services/view',
  matchAll: true,
  handler: async function(ctx) {
    let res = await ctx.app.models.service.findOne({
      name: ctx.request.body.name
    })
    return JSON.stringify({
      entity: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/applications/create',
  matchAll: true,
  handler: async function(ctx) {
    let res
    if (ctx.request.body.id) {
      res = await ctx.app.models.application.update({
        id: ctx.request.body.id
      }, ctx.request.body)
    } else {
      res = await ctx.app.models.application.create(ctx.request.body)
    }
    return JSON.stringify({
      pk: res.id
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/applications/delete',
  matchAll: true,
  handler: async function(ctx) {
    return JSON.stringify({
      'success': true,
      'message': 'ok'
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/applications/query',
  matchAll: true,
  handler: async function(ctx) {
    let page = ctx.request.body.page || 1;
    let res = await ctx.app.models.application.find().paginate({
      page: page,
      limit: 20
    }).sort({
      createdAt: 'desc'
    })
    return JSON.stringify({
      entities: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/applications/view',
  matchAll: true,
  handler: async function(ctx) {
    let res = await ctx.app.models.application.findOne({
      id: ctx.request.body.id
    })
    return JSON.stringify({
      entity: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/applications/gen_key_pair',
  matchAll: true,
  handler: async function(ctx) {
    let signType = ctx.body.signType
    let res = await ctx.app.models.application.findOne({
      id: ctx.request.body.id
    })
    return JSON.stringify({
      entity: res
    })
  }

}, {
  method: 'POST',
  path: '/portal/rest/users/create',
  matchAll: true,
  handler: async function(ctx) {
    let res
    if (ctx.request.body.id) {
      res = await ctx.app.models.user.update({
        id: ctx.request.body.id
      }, ctx.request.body)
    } else {
      res = await ctx.app.models.user.create(ctx.request.body)
    }
    return JSON.stringify({
      pk: res.id
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/users/delete',
  matchAll: true,
  handler: async function(ctx) {
    return JSON.stringify({
      'success': true,
      'message': 'ok'
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/users/query',
  matchAll: true,
  handler: async function(ctx) {
    let page = ctx.request.body.page || 1;
    let res = await ctx.app.models.user.find().paginate({
      page: page,
      limit: 20
    }).sort({
      createdAt: 'desc'
    })
    return JSON.stringify({
      entities: res
    })
  }
}, {
  method: 'POST',
  path: '/portal/rest/users/view',
  matchAll: true,
  handler: async function(ctx) {
    let res = await ctx.app.models.user.findOne({
      id: ctx.request.body.id
    })
    return JSON.stringify({
      entity: res
    })
  }

}]
