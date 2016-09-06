import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './account'
import { detailViewReducer, listViewReducer } from './admin'
import { adminNotifyReducer } from './admin/notify'


const rootReducer = combineReducers({
  loginReducer,
  logoutReducer,
  detailViewReducer,
  listViewReducer,
  adminNotifyReducer,
  routing
})

export default rootReducer
