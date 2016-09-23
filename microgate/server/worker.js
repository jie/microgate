import Koa from 'koa'
import path from 'path'
import process from 'process'
import util from 'util'
import http from 'http'
import bodyParser from 'koa-bodyparser'
import handler from './handler'
import dispatcher from '../portal'
import dateutils from '../utils/dateutils'
import serve from 'koa-static-server'
import settings from '../settings'
import { orm, config } from '../model'
import AccountService from '../service/account'
import coRedisClient from '../redis'
const app = new Koa();
const staticPath = path.join(__dirname, '/../../public');


app.use(serve({
  rootDir: staticPath
}))
app.use(bodyParser());

app.use(async(ctx, next) => {
  let req = ctx.request;
  let start = dateutils.nowDate();
  console.log(`[${start}] Req: ${req.method} ${req.url}`);
  if (!(req.header.accept && req.header.accept.includes('html'))) {
    if (req.method != 'GET') {
      console.log(
        `[${start}] ReqBody: ${util.inspect(req.body)}`
      );
    }
    await next();
    let end = dateutils.nowDate();
    console.log(`[${end}] Res: ${ctx.response.body}`);
  } else {
    await next();
  }
});


app.use(async(ctx, next) => {
  let settingsId = await coRedisClient.get(settings.settings.envName)
  console.log('settingsId in redis: ', settingsId)
  console.log('settingsId: ', settings.getSettingsId())
  if (!settingsId || settingsId != settings.getSettingsId()) {
    let apisAll = await ctx.app.models.api.find({
      isEnable: 1
    })
    if (apisAll) {
      for (let item of apisAll) {
        settings.settings.methodsMap[item.name] = item;
      }
    }
    // console.log('apis', settings.settings.methodsMap)
    let servicesAll = await ctx.app.models.service.find({
      isEnable: 1
    })
    if (servicesAll) {
      for (let item of servicesAll) {
        settings.settings.servicesMap[item.name] = item
      }
    }
    // console.log('servicesAll', settings.settings.servicesMap)

    let appsAll = await ctx.app.models.application.find({
      isEnable: 1
    })

    if (appsAll) {
      for (let item of appsAll) {
        if (item.appKey) {
          settings.settings.applicationsMap[item.appKey] = item
        }
      }
    }
    // console.log('appsAll', settings.settings.applicationsMap)
    settings.setSettingsId(settingsId)
  }

  if (ctx.request.url.startsWith('/platform/api')) {
    let apiOptions = handler.getApiOptions(ctx);
    console.log('apiOptions:', apiOptions)
    ctx.body = await handler.fetchApi(apiOptions);
  }

  if (ctx.request.url.startsWith('/portal')) {
    if (!ctx.request.url.startsWith('/portal/rest/account')) {
      let sessionId = ctx.cookies.get('microgate')
      if (!sessionId) {
        ctx.throw('auth failed', 400)
      } else {
        let accountService = new AccountService(settings.settings.RedisKeyPrefix)
        let userinfo = await accountService.getUserBySessionId(sessionId)
        if (!userinfo || !userinfo.id) {
          ctx.throw('user session not found', 400)
        } else {
          ctx.userinfo = {
            sessionId: sessionId,
            userId: userinfo.id
          }
        }
      }
    }
    let body = await dispatcher.handle(ctx);
    ctx.body = body;
  }
});


app.wait_socket = function() {
  let server = http.createServer(this.callback());

  process.on("message", function(msg, socket) {
    process.nextTick(function() {
      if (msg == 'c' && socket) {
        socket.readable = socket.writable = true;
        socket.resume();
        socket.server = server;
        server.emit("connection", socket);
        server.emit("connect");
      }
    });
  });

  return server.listen.apply(server, arguments);
}


orm.initialize(config, function(err, models) {
  if (err)
    throw err;

  app.models = models.collections;
  app.connections = models.connections;

  app.wait_socket()
});
