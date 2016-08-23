import argh from 'argh';
import http from 'http';
import net from 'net';
import url from 'url';
import apiRouters from './testing';
import {
    RequestHandler
}


from './handler';

export class Application {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }

    serverCallback(req, res) {
        var host = req.headers.host,
            ip = req.headers['x-forwarded-for'] || req.connection
            .remoteAddress;
        console.log("client ip:" + ip + ", host:" + host);
    }

    startUp() {
        let server = http.createServer(function(req, res) {
            console.log(apiRouters);
            let handler = new RequestHandler(req, res);
            handler.sendResponse();
        })
        server.listen(this.port, this.host)
    }
}
