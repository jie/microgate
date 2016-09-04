import { CALL_API, Schemas } from '../middleware/api'
import cookie from '../utils/cookie'
import Settings from '../settings';
import { push } from 'react-router-redux';

const LOGIN_ACTION_TYPE = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE'
}

const LOGOUT_ACTION_TYPE = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}


function fetchUser(authInfo) {
  let body = JSON.stringify({
    "username": authInfo.username,
    "password": authInfo.password
  })
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        LOGIN_ACTION_TYPE.LOGIN_REQUEST,
        LOGIN_ACTION_TYPE.LOGIN_SUCCESS,
        LOGIN_ACTION_TYPE.LOGIN_FAILURE
      ],
      endpoint: Settings.apis.login,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      }
    }
  }
}


function loginUser(authInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchUser(authInfo)).then((action) => {
      if (action.type === LOGIN_ACTION_TYPE.LOGIN_SUCCESS) {
        let res = action.response;
        dispatch(function() {
          authInfo.router.push(action.response.nextUrl || Settings.pages.index)
        })
      }
    });
  }
}



function _logoutUser(logoutInfo) {
  let body = JSON.stringify({
    "sessionId": logoutInfo.sessionId
  })
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        LOGOUT_ACTION_TYPE.LOGOUT_REQUEST,
        LOGOUT_ACTION_TYPE.LOGOUT_SUCCESS,
        LOGOUT_ACTION_TYPE.LOGOUT_FAILURE
      ],
      endpoint: Settings.apis.logout,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      }
    }
  }
}


function logoutUser(logoutInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_logoutUser(logoutInfo))
  }
}


module.exports = {
  LOGIN_ACTION_TYPE: LOGIN_ACTION_TYPE,
  LOGOUT_ACTION_TYPE: LOGOUT_ACTION_TYPE,
  loginUser: loginUser,
  logoutUser: logoutUser
}
