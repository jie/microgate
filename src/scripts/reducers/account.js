import { LOGIN_ACTION_TYPE, LOGOUT_ACTION_TYPE } from '../actions'
import merge from 'lodash/merge'
import cookie from '../utils/cookie'
import Settings from '../settings'


function loginReducer(state = {}, action) {
  const {type, data} = action;
  switch (type) {
    case LOGIN_ACTION_TYPE.LOGIN_SUCCESS:
      if (action.response) {
        let res = action.response;
        cookie.set(Settings.cookie.name, res.sessionId, {
          path: Settings.cookie.path,
          expdays: Settings.cookie.expiredays
        })
        return merge({}, state, {
          notifyStatus: {
            open: false,
            message: '',
            type: 'info'
          }
        })
      }
      break;
    case LOGIN_ACTION_TYPE.LOGIN_FAILURE:
      return merge({}, state, {
        notifyStatus: {
          open: true,
          message: action.error,
          type: 'error'
        }
      })
  }

  return state
}

function logoutReducer(state = {}, action) {
  const {type, data} = action;
  switch (type) {
    case LOGOUT_ACTION_TYPE.LOGOUT_SUCCESS:
      break;
    case LOGOUT_ACTION_TYPE.LOGOUT_FAILURE:
      break;
  }
  return state
}


module.exports = {
  loginReducer: loginReducer,
  logoutReducer: logoutReducer
}
