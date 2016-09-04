import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './account'
import { notifyBarReducer } from './admin/api'


const rootReducer = combineReducers({
  loginReducer,
  logoutReducer,
  notifyBarReducer,
  routing
})

export default rootReducer
