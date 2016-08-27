import qs from 'qs';
import parseurl from 'parseurl';

export default class Dispatcher {
    constructor(urls) {
        this.urls = urls
    }

    getUrlPath(req) {
        return parseurl(req).pathname;
    }

    async handle(ctx) {
        let pathname = this.getUrlPath(ctx.request);
        let method = ctx.request.method;
        for (let obj of this.urls) {
            if (pathname == obj.path && method == obj.method) {
                return await obj.handler(ctx);
            }
        }
    }
}
