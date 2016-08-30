import render from './render'

export default [{
    method: 'GET',
    path: '/portal/admin',
    matchAll: true,
    handler: async function(ctx) {
        let body = await render('index', { title: 'title' });
        return body
    }
},{
    method: 'POST',
    path: '/portal/rest/apis/create',
    matchAll: true,
    handler: async function(ctx) {
        console.log(ctx.request.body.firstName)
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'POST',
    path: '/portal/rest/apis/update',
    matchAll: true,
    handler: async function(ctx) {
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'POST',
    path: '/portal/rest/apis/delete',
    matchAll: true,
    handler: async function(ctx) {
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
},{
    method: 'GET',
    path: '/portal/rest/apis/query',
    matchAll: true,
    handler: async function(ctx) {
        return JSON.stringify({'success': true, 'message': 'ok'})
    }
}]
