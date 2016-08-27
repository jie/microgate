import Koa from 'koa';
import process from 'process';
import http from 'http';
import route from 'koa-route';
import qs from 'qs';
import parseurl from 'parseurl';
import querystring from 'querystring';
import bodyParser from 'koa-bodyparser';
import asyncRequest from 'requisition';
import argh from 'argh';
import settings from '../settings';

const GatewayParameters = [
    'g_nonce',
    'g_timestamp',
    'g_signature',
    'g_method'
]

function rebuildParameters(parameters) {
    let query = {};
    for (let arg in parameters) {
        if (!GatewayParameters.includes(arg)) {
            query[arg] = parameters[arg]
        }
    }
    return querystring.stringify(query)
}

function getApiOptions(ctx) {
    let apiParams = {};
    let apiUrl;
    let method = ctx.request.method;
    let contentType = ctx.request.header['content-type'];
    console.log('contentType: ', contentType)
    switch (method) {
        case 'GET':
            apiParams = qs.parse(parseurl(ctx.request).query);
            break;
        default:
            if (!contentType.includes('json') && !contentType.includes('form')) {
                ctx.throw('unsupported content-type for platform', 400);
            }
            apiParams = ctx.request.body;
    }

    if (!apiParams.g_method) {
        ctx.throw('method args not defined', 404);
    }

    let methodArray = apiParams.g_method.split('.');
    if (methodArray.length < 2) {
        ctx.throw('bad method args format', 400)
    }

    let addrKey = methodArray[methodArray.length - 2];
    let addr = settings.settings.addressMap[addrKey];

    if (!addr) {
        ctx.throw(`address not found: ${addrKey}`, 400);
    }

    let api = settings.settings.methodsMap[apiParams.g_method]
    if (!api) {
        ctx.throw(`method not found: ${addrKey}`, 400);
    }

    let timeout = api.timeout || addr.timeout || 30;

    let apiHeaders = {};
    if (ctx.header['accept-encoding']) {
        apiHeaders['Accept-Encoding'] = ctx.header['accept-encoding']
    }

    if (ctx.header['accept-language']) {
        apiHeaders['Accept-Language'] = ctx.header['accept-language']
    }

    if (ctx.header['user-agent']) {
        apiHeaders['User-Agent'] = ctx.header['user-agent']
    }

    apiParams = rebuildParameters(apiParams)
    apiUrl = `http://${addr.host}:${addr.port}${api.path}`;
    if (method == 'GET' && Object.keys(apiParams).length) {
        let urlargs = querystring.stringify(apiParams)
        if (urlargs) {
            apiUrl = `${apiUrl}?${urlargs}`;
        }
    }

    return {
        apiContentType: contentType,
        apiUrl: apiUrl,
        apiHeaders: apiHeaders,
        apiMethod: method,
        apiParams: apiParams
    }
}


async function fetchApi(options) {
    let body = JSON.stringify(options.apiParams);
    let myReq = await asyncRequest[options.apiMethod.toLowerCase()](
            options.apiUrl)
        .type(options.contentType)
        .set(options.apiHeaders)
        .send(options.apiParams);
    return await myReq.text();
}

module.exports = {
    fetchApi: fetchApi,
    getApiOptions: getApiOptions
}
