import parseurl from './thirdparty/parseurl';
import qs from 'qs';
import path from 'path';

export class RequestHandler {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    parseURL() {
        let parsedUrl = parseurl(this.req);
        let query = qs.parse(parsedUrl.query);
        console.log('query:', parsedUrl.pathname);
        let basepath = path.parse(parsedUrl.pathname);
        console.log('basepath:', basepath.base)
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
        this.parseURL();
        // send response to client
        let host = this.req.headers.host,
            ip = this.req.headers['x-forwarded-for'] || this.req.connection
            .remoteAddress;
        console.log("client ip:" + ip + ", host:" + host);
        this.res.end('Welcome to my server!');
    }
}
