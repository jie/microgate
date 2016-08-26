import parseurl from 'parseurl';
import qs from 'qs';
import path from 'path';
import apiRouters from './testing';
import querystring from 'querystring';
import error from './error';
import {
    HttpClient
}
from './httpclient';
import {
    methodsMap, addressMap
}
from './testing';

const GatewayParameters = [
    'g_nonce',
    'g_timestamp',
    'g_signature',
    'g_method'
]


export class ApiHandler {

    constructor(ctx) {
        this.ctx = ctx;
        this.apiRouters = apiRouters;
    }

    handleApi() {
        switch (this.ctx.request.method) {
            case 'GET':
                this.parameters = qs.parse(parseurl(this.ctx.request).query);
                break;
            default:
                if (this.req.headers['content-type'].includes('json')) {
                    this.parameters = JSON.parse(this.req.body);
                } else if (this.req.headers['content-type'].includes('form')) {
                    this.parameters = qs.parse(body);
                } else {
                    this.sendError(500,
                        `content_type: ${this.req.headers['content-type']} not supported`
                    )
                }
        }
    }

    getGatewayArguments(body) {

    }

    rebuildGetUrl() {
        let query = {};
        for (let arg in this.parameters) {
            if (!GatewayParameters.includes(arg)) {
                query[arg] = this.parameters[arg]
            }
        }
        return querystring.stringify(query)
    }

    verifySignature() {
        // return if signature is valid
    }

    getForwardApi() {
        // using module name and method find forward api path
    }

    forwardRequest() {
        // send request to forward api
    }

    getApiAddress(body) {
        this.getGatewayArguments(body);

        if (!this.parameters.g_method) {
            this.sendError(404, 'method args not defined');
        }

        let methodArray = this.parameters.g_method.split('.');
        if (methodArray.length < 2) {
            this.sendError(400, 'bad method args format')
        }

        let addrKey = methodArray[methodArray.length - 2];
        let addr = addressMap.get(addrKey);

        if (!addr) {
            this.sendError(400, `address not found: ${addrKey}`);
        }

        let api = methodsMap.get(this.parameters.g_method)
        if (!api) {
            this.sendError(400, `method not found: ${addrKey}`);
        }
        return {
            addr: addr,
            api: api
        }
    }

    getTimeout(apiInfo) {
        return apiInfo.api.timeout || apiInfo.addr.timeout || 30
    }

    sendResponse(body) {
        let self = this;
        let headers = {}
        let apiInfo = this.getApiAddress(body);
        let timeout = this.getTimeout(apiInfo);
        let options = {
            host: apiInfo.addr.host,
            port: apiInfo.addr.port,
            method: this.req.method
        }

        if (this.req.headers['accept-encoding']) {
            headers['Accept-Encoding'] = this.req.headers['accept-encoding']
        }

        if (this.req.headers['accept-language']) {
            headers['Accept-Language'] = this.req.headers['accept-language']
        }

        if (this.req.headers['user-agent']) {
            headers['User-Agent'] = this.req.headers['user-agent']
        }

        if (Object.keys(headers).length) {
            options['headers'] = headers;
        }

        if (this.req.method == 'GET') {
            let query = this.rebuildGetUrl();
            options['path'] = `${apiInfo.api.path}?${query}`;
        } else {
            options['path'] = apiInfo.api.path;
        }

        let httpclient = new HttpClient(options);

        httpclient.fetch(timeout, function(response, chunk) {
            self.chunk = chunk
            self.res.end(chunk);
        }, function(err) {
            self.res.statusCode = 500;
            self.res.statusMessage = err.message;
            self.res.end(err.message);
        })
    }
}
