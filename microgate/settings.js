import fs from 'fs';
import argh from 'argh';
import redis from 'redis';
import path from 'path';

class SettingsUtil {

    constructor() {
        this.settings = {
            RedisKeyPrefix: 'microgate',
            addressMap: {},
            methodsMap: {}
        }
    }

    static classMethod() {
        return 'hello';
    }

    loadSettingsByFile() {
        if (argh.argv.settings) {
            let curPath = path.basename(__dirname);
            let s = fs.readFileSync(path.join(curPath, argh.argv.settings));
            let settings = JSON.parse(s);

            for (let key in settings) {
                this.settings[key] = settings[key]
            }
        }

        if (argh.argv.redis) {
            for (let key in argh.argv.redis) {
                this.settings.redis[key] = argh.argv.redis[key];
            }
        }
    }

    loadFromRedis() {
        let client = redis.createClient(this.settings.redis);
        let methodsMap = client.get(
            `${this.settings.RedisKeyPrefix}:methodsMap`);

        if (methodsMap) {
            methodsMap = JSON.parse(methodsMap);
            for (let key in methodsMap) {
                this.settings.methodsMap[key] = methodsMap[key]
            }
        }

        let addressMap = client.get(
            `${this.settings.RedisKeyPrefix}:addressMap`);
        if (addressMap) {
            addressMap = JSON.parse(addressMap);
            for (let key in addressMap) {
                this.settings.addressMap[key] = addressMap[key]
            }
        }
    }

    loadSettings() {
        this.loadSettingsByFile();
        if (this.settings.redis) {
            this.loadFromRedis();
        }
        console.log('all settings loaded')
    }
}

let settings = new SettingsUtil()
settings.loadSettings()

export default settings;
