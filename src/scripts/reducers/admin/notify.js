import { CREATEAPI_ACTION_TYPE, VIEWAPI_ACTION_TYPE } from '../../actions'
import merge from 'lodash/merge'
import cookie from '../../utils/cookie'


function adminNotifyReducer(state = {}, action) {
  const {type, data} = action;
  switch (type) {
    case VIEWAPI_ACTION_TYPE.VIEWAPI_FAILURE:
      return merge({}, state, {
        notifyStatus: {
          open: true,
          message: action.error,
          type: 'error'
        }
      })
    case CREATEAPI_ACTION_TYPE.CREATEAPI_FAILURE:
      return merge({}, state, {
        notifyStatus: {
          open: true,
          message: action.error,
          type: 'error'
        }
      })
    case CREATEAPI_ACTION_TYPE.CREATEAPI_SUCCESS:
      return merge({}, state, {
        notifyStatus: {
          open: true,
          message: action.response.message || 'ok',
          type: 'info'
        }
      })
  }
  return state
}

module.exports = {
  adminNotifyReducer: adminNotifyReducer
}
