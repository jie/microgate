let methodsMap = new Map([
    ['usercenter.api1', {
        path: '/usercenter/api/1',
        timeout: 10
    }],
    ['usercenter.api2', {
        path: '/usercenter/api/2',
        timeout: 20
    }],
    ['usercenter.api3', {
        path: '/usercenter/api/3',
        timeout: 30
    }],
]);

let addressMap = new Map([
    ['usercenter', {
        'host': '127.0.0.1',
        'port': 1330,
        'timeout': 30
    }]
]);


module.exports = {
    methodsMap: methodsMap,
    addressMap: addressMap
}
