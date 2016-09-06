import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';
import Settings from '../../settings';

const CREATESERVICE_ACTION_TYPE = {
  CREATEAPI_REQUEST: 'CREATEAPI_REQUEST',
  CREATEAPI_SUCCESS: 'CREATEAPI_SUCCESS',
  CREATEAPI_FAILURE: 'CREATEAPI_FAILURE'
}

const VIEWSERVICE_ACTION_TYPE = {
  VIEWSERVICE_REQUEST: 'VIEWSERVICE_REQUEST',
  VIEWSERVICE_SUCCESS: 'VIEWSERVICE_SUCCESS',
  VIEWSERVICE_FAILURE: 'VIEWSERVICE_FAILURE'
}

const VIEWALLSERVICE_ACTION_TYPE = {
  VIEWALLSERVICE_REQUEST: 'VIEWALLSERVICE_REQUEST',
  VIEWALLSERVICE_SUCCESS: 'VIEWALLSERVICE_SUCCESS',
  VIEWALLSERVICE_FAILURE: 'VIEWALLSERVICE_FAILURE'
}

function addService(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CREATESERVICE_ACTION_TYPE.CREATEAPI_REQUEST,
        CREATESERVICE_ACTION_TYPE.CREATEAPI_SUCCESS,
        CREATESERVICE_ACTION_TYPE.CREATEAPI_FAILURE
      ],
      endpoint: `/portal/rest/service/create`,
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


function createService(apiInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(addService(apiInfo))
  }
}


function viewApi(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_REQUEST,
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_SUCCESS,
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_FAILURE
      ],
      endpoint: Settings.api.service.view,
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



function viewService(apiInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(viewApi(apiInfo))
  }
}


function _viewAllService(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWALLSERVICE_ACTION_TYPE.VIEWALLSERVICE_REQUEST,
        VIEWALLSERVICE_ACTION_TYPE.VIEWALLSERVICE_SUCCESS,
        VIEWALLSERVICE_ACTION_TYPE.VIEWALLSERVICE_FAILURE
      ],
      endpoint: Settings.api.service.list,
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



function viewAllService(serviceInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewAllService(serviceInfo))
  }
}


module.exports = {
  createService: createService,
  viewService: viewService,
  viewAllService: viewAllService,
  VIEWALLSERVICE_ACTION_TYPE: VIEWALLSERVICE_ACTION_TYPE,
  CREATESERVICE_ACTION_TYPE: CREATESERVICE_ACTION_TYPE,
  VIEWSERVICE_ACTION_TYPE: VIEWSERVICE_ACTION_TYPE
}
