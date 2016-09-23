import { CALL_API, Schemas } from '../middleware/api'
import cookie from '../utils/cookie'
import Settings from '../settings';
import { push } from 'react-router-redux';

const RefreshType = {
  REFRESH_REQUEST: 'REFRESH_REQUEST',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_FAILURE: 'REFRESH_FAILURE'
}

function _refreshSettings(args) {
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        RefreshType.REFRESH_REQUEST,
        RefreshType.REFRESH_SUCCESS,
        RefreshType.REFRESH_FAILURE
      ],
      endpoint: Settings.api.settings.refresh,
      schema: Schemas.USER,
      settings: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {},
        credentials: 'include'
      }
    }
  }
}


function refreshSettings(args, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_refreshSettings(args))
  }
}


module.exports = {
  refreshSettings: refreshSettings,
  RefreshType: RefreshType
}
