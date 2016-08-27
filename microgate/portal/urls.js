export default [{
    method: 'GET',
    path: '/platform/portal',
    handler: async function(ctx) {
        return '<html><body><h1>index</h1></body></html>';
    }
}, {
    method: 'GET',
    path: '/platform/portal/login',
    handler: async function(ctx) {
        return 'login';
    }
}, {
    method: 'GET',
    path: '/platform/portal/logout',
    handler: async function(ctx) {
        return 'logout';
    }
}]
