import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';
import Settings from '../../settings';

const CREATESERVICE_ACTION_TYPE = {
  CREATESERVICE_REQUEST: 'CREATESERVICE_REQUEST',
  CREATESERVICE_SUCCESS: 'CREATESERVICE_SUCCESS',
  CREATESERVICE_FAILURE: 'CREATESERVICE_FAILURE'
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

function _createService(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CREATESERVICE_ACTION_TYPE.CREATESERVICE_REQUEST,
        CREATESERVICE_ACTION_TYPE.CREATESERVICE_SUCCESS,
        CREATESERVICE_ACTION_TYPE.CREATESERVICE_FAILURE
      ],
      endpoint: Settings.api.services.create,
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


function createService(serviceInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_createService(serviceInfo))
  }
}


function _viewService(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_REQUEST,
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_SUCCESS,
        VIEWSERVICE_ACTION_TYPE.VIEWSERVICE_FAILURE
      ],
      endpoint: Settings.api.services.view,
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



function viewService(serviceInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewService(serviceInfo))
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
      endpoint: Settings.api.services.list,
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
