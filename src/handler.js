import parseurl from './thirdparty/parseurl';
import qs from 'qs';
import path from 'path';
import apiRouters from './testing';
import {
    HttpClient
}
from './httpclient';
import {
    methodsMap, addressMap
}
from './testing';


export class RequestHandler {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.parameters = {};
    }

    getGatewayArguments() {
        let parameters = {};
        switch (this.req.method) {
            case 'GET':
                this.parameters = qs.parse(parseurl(this.req).query);
                break;
            default:
                if (this.req['Content-Type'].include('json')) {
                    this.parameters = JSON.parse(req.body);
                } else if (this.req['Content-Type'].include('urlencoded')) {
                    this.parameters = qs.parse(req.body);
                } else {
                    console.log(
                        `content_type: ${this.req['Content-Type']} not supported`
                    )
                }

        }
        console.log('parameters:', parameters)
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

    sendResponse() {
        this.getGatewayArguments();
        // send response to client
        let host = this.req.headers.host,
            ip = this.req.headers['x-forwarded-for'] || this.req.connection
            .remoteAddress;
        console.log("client ip:" + ip + ", host:" + host);

        let addr = addressMap.get('usercenter');
        let method = methodsMap.get('usercenter.getUserInfo');
        let options = {
            host: addr.host,
            port: addr.port,
            path: method,
            method: this.req.method,
            headers: {
                'content-type': this.req.headers['content-type'],
                'accept-encoding': this.req.headers['accept-encoding'],
                'accept-language': this.req.headers['accept-language'],
                'user-agent': this.req.headers['user-agent']
            }
        }

        let self = this;
        let httpclient = new HttpClient(options);

        httpclient.fetch(function(chunk) {
            self.res.end(chunk);
        })
    }
}
