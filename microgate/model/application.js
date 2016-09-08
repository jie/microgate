import Waterline from 'waterline'
export default Waterline.Collection.extend({
  identity: 'application',
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
    signType: {
      required: true,
      type: 'string',
      defaultsTo: function() {
        return 'rsa'
      }
    },
    appKey: {
      required: false,
      type: 'string',
    },
    appSecret: {
      required: false,
      type: 'string',
    },
    sysKey: {
      required: false,
      type: 'string',
    },
    sysSecret: {
      required: false,
      type: 'string',
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
