import Waterline from 'waterline'
export default Waterline.Collection.extend({
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
