import Waterline from 'waterline'
import mysqlAdapter from 'sails-mysql'
import settings from '../settings'
import api from './api'
import service from './service'
import application from './application'
import user from './user'

let orm = new Waterline();

let config = {

  adapters: {
    'default': mysqlAdapter,
    mysql: mysqlAdapter
  },

  connections: {
    mysql: settings.settings.waterline.mysql
  },

  defaults: {
    migrate: 'safe'
  }

};

orm.loadCollection(api);
orm.loadCollection(service);
orm.loadCollection(application);
orm.loadCollection(user);

module.exports = {
  orm: orm,
  config: config
}
