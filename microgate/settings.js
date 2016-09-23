import fs from 'fs';
import argh from 'argh';
import path from 'path';
import process from 'process'


class SettingsUtil {

  constructor() {
    this.settings = {
      RedisKeyPrefix: 'microgate',
      servicesMap: {},
      methodsMap: {},
      applicationsMap: {}
    }
  }

  setSettingsId(settingsId) {
    this.settings[this.settings.envName] = settingsId
  }

  getSettingsId() {
    return this.settings[this.settings.envName]
  }

  loadSettings() {
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
}

let settings = new SettingsUtil()
settings.loadSettings()

export default settings;
