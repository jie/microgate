import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';

const CREATEAPI_ACTION_TYPE = {
  CREATEAPI_REQUEST: 'CREATEAPI_REQUEST',
  CREATEAPI_SUCCESS: 'CREATEAPI_SUCCESS',
  CREATEAPI_FAILURE: 'CREATEAPI_FAILURE'
}

function addApi(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CREATEAPI_REQUEST.CREATEAPI_REQUEST,
        CREATEAPI_SUCCESS.CREATEAPI_SUCCESS,
        CREATEAPI_FAILURE.CREATEAPI_FAILURE
      ],
      endpoint: `/portal/rest/apis/create`,
      schema: Schemas.API,
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


function createAnAPI(data, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(addApi(authInfo))
  }
}


module.exports = {
  createAnAPI: createAnAPI,
  CREATEAPI_ACTION_TYPE: CREATEAPI_ACTION_TYPE
}
