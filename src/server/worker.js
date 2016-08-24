import http from 'http';
import child_process from 'child_process';
import net from 'net';
import process from 'process';
import error from '../error';
import {
    RequestHandler
}
from '../handler';

class ServerWorker {

    constructor() {
        this.startUp()
    }

    sendError(res, statusCode, statusMessage) {
        res.statusCode = statusCode;
        res.statusMessage = statusMessage;
        res.end(statusMessage)
    }

    startUp() {
        let self = this;
        let wokerServer = http.createServer(function(req, res) {
            let handler = new RequestHandler(req, res);
            if (req.method == 'GET') {
                try {
                    handler.sendResponse();
                } catch (e) {
                    if (e.eName == 'GatewayLogicError') {
                        self.sendError(res, e.statusCode, e.statusMessage);
                    } else {
                        self.sendError(res, 500, e.message);
                    }
                }
            } else {
                let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                }).on('end', function() {
                    body = Buffer.concat(body).toString();
                    try {
                        handler.sendResponse(body);
                    } catch (e) {
                        if (e.eName == 'GatewayLogicError') {
                            self.sendError(res, e.statusCode,
                                e.statusMessage);
                        } else {
                            self.sendError(res, 500, e.message)
                        }
                    }
                });
            }
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
