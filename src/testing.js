let methodsMap = new Map([
    ['usercenter.api1', '/api/1'],
    ['usercenter.api2', '/api/2'],
    ['usercenter.api3', '/api/3'],
]);

let addressMap = new Map([
    ['usercenter', {
        'host': '127.0.0.1',
        'port': 1330
    }]
]);


module.exports = {
    methodsMap: methodsMap,
    addressMap: addressMap
}
