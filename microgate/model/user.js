import Waterline from 'waterline'
export default Waterline.Collection.extend({
  identity: 'user',
  connection: 'mysql',
  attributes: {
    id: {
      primaryKey: true,
      type: 'integer'
    },
    name: {
      required: true,
      type: 'string'
    },
    username: {
      required: true,
      type: 'string',
      unique: true
    },
    password: {
      required: true,
      type: 'string',
      unique: true
    },
    permissions: {
      required: false,
      type: 'array',
      defaultsTo: function() {
        return []
      }
    },
    remark: {
      required: false,
      type: 'string',
      defaultsTo: function() {
        return ''
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
