import Koa from 'koa';
import process from 'process';
import http from 'http';
import route from 'koa-route';
import qs from 'qs';
import parseurl from 'parseurl';
import querystring from 'querystring';
import bodyParser from 'koa-bodyparser';
import {
    methodsMap, addressMap
}
from '../testing';
var asyncRequest = require('requisition');
const GatewayParameters = [
    'g_nonce',
    'g_timestamp',
    'g_signature',
    'g_method'
]

const app = new Koa();
app.use(bodyParser());

function rebuildGetUrl(parameters) {
    let query = {};
    for (let arg in parameters) {
        if (!GatewayParameters.includes(arg)) {
            query[arg] = parameters[arg]
        }
    }
    return querystring.stringify(query)
}


async function asyncFetch(method, options, parameters) {
    if (method == 'GET') {
        let res = await asyncRequest(options.path);
        let body = await res.json();
        return body
    }
}
app.use(async(ctx, next) => {
    if (ctx.request.url.startsWith('/platform/api')) {
        let parameters = {};
        switch (ctx.request.method) {
            case 'GET':
                parameters = qs.parse(parseurl(ctx.request).query);
                break;
            default:
                console.log(ctx.request.body)
                if (ctx.request.header['content-type'].includes(
                        'json')) {
                    parameters = JSON.parse(ctx.request.body);
                } else if (ctx.request.header['content-type'].includes(
                        'form')) {
                    parameters = qs.parse(ctx.request.body);
                } else {
                    throw Error('121212');
                }
        }

        if (!parameters.g_method) {
            ctx.throw('method args not defined', 404);
        }

        let methodArray = parameters.g_method.split('.');
        if (methodArray.length < 2) {
            ctx.throw('bad method args format', 400)
        }

        let addrKey = methodArray[methodArray.length - 2];
        let addr = addressMap.get(addrKey);

        if (!addr) {
            ctx.throw(`address not found: ${addrKey}`, 400);
        }

        let api = methodsMap.get(parameters.g_method)
        if (!api) {
            ctx.throw(`method not found: ${addrKey}`, 400);
        }

        let headers = {};
        let timeout = api.timeout || addr.timeout || 30;
        let options = {
            host: addr.host,
            port: addr.port,
            method: ctx.request.method
        }

        if (ctx.header['accept-encoding']) {
            headers['Accept-Encoding'] = ctx.header['accept-encoding']
        }

        if (ctx.header['accept-language']) {
            headers['Accept-Language'] = ctx.header['accept-language']
        }

        if (ctx.header['user-agent']) {
            headers['User-Agent'] = ctx.header['user-agent']
        }

        if (Object.keys(headers).length) {
            options['headers'] = headers;
        }

        if (ctx.request.method == 'GET') {
            let query = rebuildGetUrl(parameters);
            options['path'] = `${api.path}?${query}`;
        } else {
            options['path'] = api.path;
        }

        let body = asyncFetch(options, parameters);
        console.log(body);
    }
});

app.wait_socket = function() {
    var server = http.createServer(this.callback());

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

app.wait_socket()
