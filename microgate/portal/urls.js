import settings from '../settings';
import redis from 'redis';
import coRedis from "co-redis";

let redisClient = redis.createClient(settings.settings.redis);
let coRedisClient = coRedis(redisClient);
let apiMethodMapKey = `${settings.settings.RedisKeyPrefix}:methodsMap`;
let apiAddressMapKey = `${settings.settings.RedisKeyPrefix}:apiAddressMapKey`;

redisClient.on("error", function (err) {
    console.log("Redis Error "+ err);
});

export default [{
    method: 'GET',
    path: '/portal/admin',
    matchAll: true,
    handler: async function(ctx) {
        ctx.body = await render('index', { title: 'title' });
    }
},{
    method: 'POST',
    path: '/portal/rest/account/login',
    matchAll: true,
    handler: async function(ctx) {
        console.log(ctx.body);
        return JSON.stringify({
            entities:{
                user: {username: 'zhouyang', id: 1},
                cookieName: 'microgate',
                sessionId: '123456789'
            }
        })
    }
},{
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
        let redisRes = redisClient.set(apiMethodMapKey, JSON.stringify(settings.settings.methodsMap));
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'POST',
    path: '/portal/rest/apis/update',
    matchAll: true,
    handler: async function(ctx) {
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'POST',
    path: '/portal/rest/apis/delete',
    matchAll: true,
    handler: async function(ctx) {
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'GET',
    path: '/portal/rest/apis/query',
    matchAll: true,
    handler: async function(ctx) {
        console.log(ctx.request.search)
        return await coRedisClient.get(apiMethodMapKey);
    }
}]
