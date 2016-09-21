import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';
import Settings from '../../settings';

const CREATEAPI_ACTION_TYPE = {
  CREATEAPI_REQUEST: 'CREATEAPI_REQUEST',
  CREATEAPI_SUCCESS: 'CREATEAPI_SUCCESS',
  CREATEAPI_FAILURE: 'CREATEAPI_FAILURE'
}

const VIEWAPI_ACTION_TYPE = {
  VIEWAPI_REQUEST: 'VIEWAPI_REQUEST',
  VIEWAPI_SUCCESS: 'VIEWAPI_SUCCESS',
  VIEWAPI_FAILURE: 'VIEWAPI_FAILURE'
}

const VIEWALLAPI_ACTION_TYPE = {
  VIEWALLAPI_REQUEST: 'VIEWALLAPI_REQUEST',
  VIEWALLAPI_SUCCESS: 'VIEWALLAPI_SUCCESS',
  VIEWALLAPI_FAILURE: 'VIEWALLAPI_FAILURE'
}

function addApi(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CREATEAPI_ACTION_TYPE.CREATEAPI_REQUEST,
        CREATEAPI_ACTION_TYPE.CREATEAPI_SUCCESS,
        CREATEAPI_ACTION_TYPE.CREATEAPI_FAILURE
      ],
      endpoint: `/portal/rest/apis/create`,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
        credentials: 'include'
      }
    }
  }
}


function createAnAPI(apiInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(addApi(apiInfo))
  }
}


function viewApi(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWAPI_ACTION_TYPE.VIEWAPI_REQUEST,
        VIEWAPI_ACTION_TYPE.VIEWAPI_SUCCESS,
        VIEWAPI_ACTION_TYPE.VIEWAPI_FAILURE
      ],
      endpoint: Settings.api.apis.view,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
        credentials: 'include'
      }
    }
  }
}



function viewAnApi(apiInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(viewApi(apiInfo))
  }
}


function _viewAllApi(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWALLAPI_ACTION_TYPE.VIEWALLAPI_REQUEST,
        VIEWALLAPI_ACTION_TYPE.VIEWALLAPI_SUCCESS,
        VIEWALLAPI_ACTION_TYPE.VIEWALLAPI_FAILURE
      ],
      endpoint: Settings.api.apis.list,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
        credentials: 'include'
      }
    }
  }
}



function viewAllApi(apiInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewAllApi(apiInfo))
  }
}


module.exports = {
  createAnAPI: createAnAPI,
  viewAnApi: viewAnApi,
  viewAllApi: viewAllApi,
  VIEWALLAPI_ACTION_TYPE: VIEWALLAPI_ACTION_TYPE,
  CREATEAPI_ACTION_TYPE: CREATEAPI_ACTION_TYPE,
  VIEWAPI_ACTION_TYPE: VIEWAPI_ACTION_TYPE
}
