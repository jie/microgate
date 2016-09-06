import Waterline from 'waterline'
import mysqlAdapter from 'sails-mysql'
import settings from '../settings'
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


let api = Waterline.Collection.extend({

  identity: 'api',
  connection: 'mysql',
  attributes: {
    id: {
      primaryKey: true,
      type: 'integer'
    },
    name: {
      required: true,
      type: 'string',
      unique: true
    },
    path: {
      required: true,
      type: 'string'
    },
    timeout: {
      required: false,
      type: 'string',
      defaultsTo: function() {
        return '30'
      }
    },
    remark: {
      required: false,
      type: 'string',
      defaultsTo: function() {
        return ''
      }
    },
    isInner: {
      required: true,
      type: 'boolean',
      defaultsTo: function() {
        return false
      }
    },
    isSign: {
      required: true,
      type: 'boolean',
      defaultsTo: function() {
        return false
      }
    },
    header: {
      required: false,
      type: 'array',
      defaultsTo: function() {
        return JSON.stringify([])
      }
    },
    body: {
      required: false,
      type: 'array',
      defaultsTo: function() {
        return JSON.stringify([])
      }
    },
    owner: {
      type: 'string',
      required: false
    },
    isEnable: {
      type: 'boolean',
      required: false,
      defaultsTo: function() {
        return true
      }
    }
  }
});

orm.loadCollection(api);

module.exports = {
  orm: orm,
  config: config
}
