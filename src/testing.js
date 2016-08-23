let methodsMap = new Map([
    ['usercenter.getUserInfo', '/user/get_user_info'],
    ['usercenter.updateUser', '/user/update'],
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
