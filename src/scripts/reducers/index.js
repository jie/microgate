import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './account'
import { detailViewReducer, listViewReducer } from './admin'
import { adminNotifyReducer } from './admin/notify'
import { settingsRefreshReducer } from './settings'


const rootReducer = combineReducers({
  loginReducer,
  logoutReducer,
  detailViewReducer,
  listViewReducer,
  adminNotifyReducer,
  settingsRefreshReducer,
  routing
})

export default rootReducer
