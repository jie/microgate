import { RefreshType } from '../actions'
import merge from 'lodash/merge'
import Settings from '../settings'

function settingsRefreshReducer(state = {}, action) {
  const {type, data} = action;
  switch (type) {
    case RefreshType.REFRESH_SUCCESS:
      if (action.response) {
        return merge({}, state, {
          notifyStatus: {
            open: true,
            message: 'refresh settings success',
            type: 'info'
          }
        })
      }
      break;
    case RefreshType.REFRESH_FAILURE:
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

module.exports = {
  settingsRefreshReducer: settingsRefreshReducer,
}
