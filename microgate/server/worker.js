import Koa from 'koa'
import path from 'path'
import process from 'process'
import util from 'util'
import http from 'http'
import bodyParser from 'koa-bodyparser'
import handler from './handler'
import dispatcher from '../portal'
import dateutils from '../utils/dateutils'
import serve from 'koa-static-server'

const app = new Koa();
const staticPath = path.join(__dirname, '/../../public');

app.use(serve({rootDir: staticPath}))
app.use(bodyParser());

app.use(async(ctx, next) => {
    let req = ctx.request;
    let start = dateutils.nowDate();
    console.log(`[${start}] Req: ${req.method} ${req.url}`);
    if (!(req.header.accept && req.header.accept.includes('html'))) {
        if (req.method != 'GET') {
            console.log(
                `[${start}] ReqBody: ${util.inspect(req.body)}`
            );
        }
        await next();
        let end = dateutils.nowDate();
        console.log(`[${end}] Res: ${ctx.response.body}`);
    } else {
        await next();
    }
});


app.use(async(ctx, next) => {
    if (ctx.request.url.startsWith('/platform/api')) {
        let apiOptions = handler.getApiOptions(ctx);
        ctx.body = await handler.fetchApi(apiOptions);
    }

    if (ctx.request.url.startsWith('/portal')) {
        let body = await dispatcher.handle(ctx);
        ctx.body = body;
    }
});


app.wait_socket = function() {
    let server = http.createServer(this.callback());

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
