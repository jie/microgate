import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';
import Settings from '../../settings';

const CREATEAPP_ACTION_TYPE = {
  CREATEAPP_REQUEST: 'CREATEAPP_REQUEST',
  CREATEAPP_SUCCESS: 'CREATEAPP_SUCCESS',
  CREATEAPP_FAILURE: 'CREATEAPP_FAILURE'
}

const VIEWAPP_ACTION_TYPE = {
  VIEWAPP_REQUEST: 'VIEWAPP_REQUEST',
  VIEWAPP_SUCCESS: 'VIEWAPP_SUCCESS',
  VIEWAPP_FAILURE: 'VIEWAPP_FAILURE'
}

const VIEWALLAPP_ACTION_TYPE = {
  VIEWALLAPP_REQUEST: 'VIEWALLAPP_REQUEST',
  VIEWALLAPP_SUCCESS: 'VIEWALLAPP_SUCCESS',
  VIEWALLAPP_FAILURE: 'VIEWALLAPP_FAILURE'
}

const GenAppKey_ACTION_TYPE = {
  GenAppKey_REQUEST: 'GenAppKey_REQUEST',
  GenAppKey_SUCCESS: 'GenAppKey_SUCCESS',
  GenAppKey_FAILURE: 'GenAppKey_FAILURE'
}


function _createApp(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CREATEAPP_ACTION_TYPE.CREATEAPP_REQUEST,
        CREATEAPP_ACTION_TYPE.CREATEAPP_SUCCESS,
        CREATEAPP_ACTION_TYPE.CREATEAPP_FAILURE
      ],
      endpoint: Settings.api.applications.create,
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


function createApp(appInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_createApp(appInfo))
  }
}


function _viewApp(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWAPP_ACTION_TYPE.VIEWAPP_REQUEST,
        VIEWAPP_ACTION_TYPE.VIEWAPP_SUCCESS,
        VIEWAPP_ACTION_TYPE.VIEWAPP_FAILURE
      ],
      endpoint: Settings.api.applications.view,
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



function viewApp(appInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewApp(appInfo))
  }
}


function _viewAllApp(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWALLAPP_ACTION_TYPE.VIEWALLAPP_REQUEST,
        VIEWALLAPP_ACTION_TYPE.VIEWALLAPP_SUCCESS,
        VIEWALLAPP_ACTION_TYPE.VIEWALLAPP_FAILURE
      ],
      endpoint: Settings.api.applications.list,
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



function viewAllApp(appInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewAllApp(appInfo))
  }
}



function _generateAppKeyPairs(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        GenAppKey_ACTION_TYPE.GenAppKey_REQUEST,
        GenAppKey_ACTION_TYPE.GenAppKey_SUCCESS,
        GenAppKey_ACTION_TYPE.GenAppKey_FAILURE
      ],
      endpoint: Settings.api.applications.generate_app_key_pair,
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

function generateAppKeyPairs(appInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_generateAppKeyPairs(appInfo))
  }
}

module.exports = {
  createApp: createApp,
  viewApp: viewApp,
  generateAppKeyPairs: generateAppKeyPairs,
  viewAllApp: viewAllApp,
  GenAppKey_ACTION_TYPE: GenAppKey_ACTION_TYPE,
  VIEWALLAPP_ACTION_TYPE: VIEWALLAPP_ACTION_TYPE,
  CREATEAPP_ACTION_TYPE: CREATEAPP_ACTION_TYPE,
  VIEWAPP_ACTION_TYPE: VIEWAPP_ACTION_TYPE
}
