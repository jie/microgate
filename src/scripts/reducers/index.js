import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import loginReducer from './account'
import logoutReducer from './account'



const rootReducer = combineReducers({
    loginReducer,
    routing
})

export default rootReducer
