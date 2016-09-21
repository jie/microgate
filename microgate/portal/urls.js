import settings from '../settings';
import AccountService from '../service/account';
import ApiService from '../service/api';
import crypto from 'crypto'
import { generateKeyPairs, Signature } from '../utils/signature'

const DefaultPageSize = 20;

function digestPassword(password) {
  return crypto.createHmac('sha256', password).digest('hex')
}

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
    let data = ctx.request.body;
    let password = digestPassword(data.password)

    let user = await ctx.app.models.user.findOne({
      username: ctx.request.body.username
    })

    if (!user || !data.password) {
      ctx.throw('user not found or password not matched', 400)
    }

    if (user.password != password) {
      ctx.throw('user not found or password not matched.', 400)
    }

    let userinfo = {
      id: user.id,
      username: user.username,
      name: user.name,
      updatedAt: user.updatedAt
    }
    let sessionId = await accountService.login(userinfo)
    let response = {
      user: userinfo,
      cookieName: settings.settings.RedisKeyPrefix,
      sessionId: sessionId,
    }
    if (data.nextUrl) {
      response.nextUrl = data.nextUrl
    }
    return JSON.stringify(response)
  }
}, {
  method: 'POST',
  path: '/portal/rest/account/logout',
  handler: async function(ctx) {
    let accountService = new AccountService(settings.settings.RedisKeyPrefix)
    let result = await accountService.logout(ctx.request.body.sessionId)

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
      limit: DefaultPageSize
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
      limit: DefaultPageSize
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
    let res;
    let data = ctx.request.body;
    data.appKey = '';
    data.appSecret = '';
    if (ctx.request.body.id) {
      res = await ctx.app.models.application.update({
        id: ctx.request.body.id
      }, data)
    } else {
      if (!ctx.request.body.appKey) {
        let keyPairs = generateKeyPairs(ctx.userinfo.userId)
        data.appKey = keyPairs.appKey;
        data.appSecret = keyPairs.appSecret;
      }
      res = await ctx.app.models.application.create(data)
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
      limit: DefaultPageSize
    }).sort({
      createdAt: 'desc'
    })
    let total = await ctx.app.models.application.count()
    return JSON.stringify({
      entities: res,
      total: total
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
  path: '/portal/rest/applications/generate/key',
  matchAll: true,
  handler: async function(ctx) {
    let data = ctx.request.body;
    let signType = data.signType;
    let keyPairs = generateKeyPairs(ctx.userinfo.userId)
    data.appKey = keyPairs.appKey;
    data.appSecret = keyPairs.appSecret;

    let res = await ctx.app.models.application.update({
      id: ctx.request.body.id
    }, data)
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
    let data = ctx.request.body;

    if (data.password && data.repeatPassword) {

      if (data.password != data.repeatPassword) {
        ctx.throw('password not matched', 400)
      }

      if (data.password.length < 6) {
        ctx.throw('password length must bigger than 6', 400)
      }

      if (data.password.length > 12) {
        ctx.throw('password length must smaller than 12', 400)
      }

      data.password = digestPassword(data.password)
    }

    if (ctx.request.body.id) {
      res = await ctx.app.models.user.update({
        id: data.id
      }, data)
    } else {
      res = await ctx.app.models.user.create(data)
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
      limit: DefaultPageSize
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
