import http from 'http';
import child_process from 'child_process';
import net from 'net';
import process from 'process';
import error from '../error';
import {
    nowDate
}
from '../utils/dateutils';
import {
    RequestHandler
}
from '../handler';


class ServerWorker {

    constructor(middlewares) {
        this.middlewares = middlewares || [];
        this.startUp()
    }

    sendError(res, statusCode, statusMessage) {
        res.statusCode = statusCode;
        res.statusMessage = statusMessage;
        res.end(statusMessage)
    }

    logReq(req) {
        console.log(
            `${nowDate()}: ${req.method} ${req.connection.remoteAddress} ${req.url}`
        )
    }

    logRes(handler) {
        console.log(
            `${nowDate()}: ${handler.res.statusCode} ${handler.res.statusMessage} ${handler.chunk || ''}`
        )
    }

    startUp() {
        let self = this;
        let wokerServer = http.createServer(function(req, res) {
            self.logReq(req);
            let handler = new RequestHandler(req, res);
            let body = [];

            req.on('data', function(chunk) {
                body.push(chunk);
            }).on('end', function() {
                body = Buffer.concat(body).toString();
                try {
                    handler.sendResponse(body);
                } catch (e) {
                    console.log(e);
                    self.sendError(res, e.statusCode || 500,
                        e.statusMessage || e.message)
                }
            });

            res.on('finish', function() {
                self.logRes(handler);
            });
        })

        process.on("message", function(msg, socket) {
            process.nextTick(function() {
                if (msg == 'c' && socket) {
                    socket.readable = socket.writable =
                        true;
                    socket.resume();
                    socket.server = wokerServer;
                    wokerServer.emit("connection", socket);
                    wokerServer.emit("connect");
                }
            });
        });
    }
}

new ServerWorker()
