import crypto from 'crypto'
import Hashids from 'hashids'


const RequiredArgs = new Set([
  'g_nonce',
  'g_timestamp',
  'g_method',
  'g_appkey'
])

const DefaultSecretLength = 20

function generateKeyPairs(userId) {
  let hashids = new Hashids('', 16, 'abcdefghijklmnopqrstuvwxyz0123456789');
  let appKey = hashids.encode(userId);
  return {
    appKey: appKey,
    appSecret: crypto.randomBytes(DefaultSecretLength).toString('hex')
  }
}

class Signature {

  constructor(secret) {
    this.secret = secret;
    this.hmac = crypto.createHmac('sha256', secret);
  }

  create(args) {
    let keys = Object.keys(args);
    let intersect = new Set([...keys].filter(x => RequiredArgs.has(x)));
    if (intersect.length != 3 || !args.g_nonce || !args.g_timestamp || !args.g_method || !args.g_appkey) {
      return false
    }

    keys = keys.sort();
    let newArgs = {};
    keys.forEach(function(key) {
      newArgs[key.toLowerCase()] = args[key];
    });

    let s = '';
    for (let k in newArgs) {
      s += '&' + k + '=' + newArgs[k];
    }
    s = s.substr(1);
    this.hmac.update(s);
    s = this.hmac.digest('hex');
    return Buffer.from(s).toString('base64');
  }

  verify(args, signature) {
    let newArgs = {}
    for (let k in args) {
      if (k != 'g_signature') {
        newArgs[k] = args[k]
      }
    }

    let _signature = this.createSign(newArgs)
    if (signature != _signature) {
      return false
    } else {
      return true
    }
  }
}


module.exports = {
  RequiredArgs,
  generateKeyPairs,
  Signature
}
