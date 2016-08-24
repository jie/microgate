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


export class RequestHandler {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.parameters = new Map();
    }

    sendError(statusCode, statusMessage) {
        let e = new error.GatewayLogicError(statusCode, statusMessage);
        throw e;
    }

    getGatewayArguments(body) {
        switch (this.req.method) {
            case 'GET':
                this.parameters = qs.parse(parseurl(this.req).query);
                console.log(this.parameters)
                break;
            default:
                if (this.req.headers['content-type'].includes('json')) {
                    this.parameters = JSON.parse(this.req.body);
                } else if (this.req.headers['content-type'].includes(
                        'urlencoded')) {
                    this.parameters = qs.parse(body);
                } else {
                    this.sendError(500,
                        `content_type: ${this.req.headers['content-type']} not supported`
                    )
                }
        }
    }

    rebuildGetUrl() {
        let query = {};
        for (let arg in this.parameters) {
            if (!GatewayParameters.includes(arg)) {
                query[arg] = this.parameters[arg]
            }
        }
        console.log('query, ', query)
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

        let methodPath = methodsMap.get(this.parameters.g_method)
        if (!methodPath) {
            this.sendError(400, `method not found: ${addrKey}`);
        }
        return {
            addr: addr,
            path: methodPath
        }
    }

    sendResponse(body) {
        let self = this;
        let headers = {}
        let apiAddress = this.getApiAddress(body)
        let options = {
            host: apiAddress.addr.host,
            port: apiAddress.addr.port,
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
            options['path'] = `${apiAddress.path}?${query}`;
        } else {
            options['path'] = apiAddress.path;
        }

        let httpclient = new HttpClient(options);

        httpclient.fetch(function(response, chunk) {
            self.res.end(chunk);
        }, function(err) {
            self.res.statusCode = 500;
            self.res.statusMessage = err;
            self.res.end(err);
        })
    }
}
