import { CREATEAPI_ACTION_TYPE, VIEWAPI_ACTION_TYPE, VIEWALLAPI_ACTION_TYPE } from '../../actions'
import { VIEWALLSERVICE_ACTION_TYPE, VIEWSERVICE_ACTION_TYPE, CREATESERVICE_ACTION_TYPE } from '../../actions'
import { VIEWALLAPP_ACTION_TYPE, VIEWAPP_ACTION_TYPE, CREATEAPP_ACTION_TYPE } from '../../actions'
import { ViewAllUser_ACTION_TYPE, ViewUser_ACTION_TYPE, CreateUser_ACTION_TYPE } from '../../actions'
import merge from 'lodash/merge'
import cookie from '../../utils/cookie'


function detailViewReducer(state = {}, action) {
  const {type, data} = action;
  let res = action.response;
  switch (type) {
    case VIEWAPI_ACTION_TYPE.VIEWAPI_SUCCESS:
      return merge({}, state, {
        entity: {
          id: res.entity.id,
          name: res.entity.name,
          path: res.entity.path,
          timeout: res.entity.timeout,
          remark: res.entity.remark,
          isInner: res.entity.isInner,
          isSign: res.entity.isSign,
          isEnable: res.entity.isEnable,
          body: res.entity.body || [],
          header: res.entity.header || []
        }
      })
      break;
    case VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_SUCCESS:
      return merge({}, state, {
        entity: {
          id: res.entity.id,
          name: res.entity.name,
          host: res.entity.host,
          port: res.entity.port,
          timeout: res.entity.timeout,
          remark: res.entity.remark,
          isInner: res.entity.isInner,
          isSign: res.entity.isSign,
          isForwarding: res.entity.isForwarding,
          isEnable: res.entity.isEnable,
          body: res.entity.body || [],
          header: res.entity.header || []
        }
      })
      break;
    case VIEWAPP_ACTION_TYPE.VIEWAPP_SUCCESS:
      return merge({}, state, {
        entity: {
          id: res.entity.id,
          name: res.entity.name,
          isEnable: res.entity.isEnable,
          signType: res.entity.signType,
          appKey: res.entity.appKey,
          appSecret: res.entity.appSecret,
          sysKey: res.entity.sysKey,
          sysSecret: res.entity.sysSecret,
          remark: res.entity.remark
        }
      })
      break;
    case ViewUser_ACTION_TYPE.ViewUser_SUCCESS:
      return merge({}, state, {
        entity: {
          id: res.entity.id,
          name: res.entity.name,
          isEnable: res.entity.isEnable,
          username: res.entity.username,
          permissions: res.entity.permissions,
          remark: res.entity.remark
        }
      })
      break;

  }
  return state
}


function listViewReducer(state = {}, action) {
  const {type, data} = action;
  let res = action.response;
  switch (type) {
    case VIEWALLAPI_ACTION_TYPE.VIEWALLAPI_SUCCESS:
      return merge({}, state, {
        entities: res.entities
      })
      break;
    case VIEWALLSERVICE_ACTION_TYPE.VIEWALLSERVICE_SUCCESS:
      return merge({}, state, {
        entities: res.entities
      })
      break;
    case VIEWALLAPP_ACTION_TYPE.VIEWALLAPP_SUCCESS:
      return merge({}, state, {
        entities: res.entities
      })
      break;
    case ViewAllUser_ACTION_TYPE.ViewAllUser_SUCCESS:
      return merge({}, state, {
        entities: res.entities
      })
      break;
  }
  return state
}


module.exports = {
  detailViewReducer: detailViewReducer,
  listViewReducer: listViewReducer
}
