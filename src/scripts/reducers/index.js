import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {setCookie} from '../utils/cookie'

function loginReduce(state = {'isLogin': false}, action) {
    const { type, data } = action

    switch(type) {
        case ActionTypes.LOGIN_SUCCESS:
            if (action.response) {
                let res = action.response.entities;
                let cookieName = res.cookieName || 'microgate';
                let sessionId = res.sessionId
                let expiredays = res.expiredays || 30;
                setCookie(cookieName, sessionId, expiredays)
                return merge({}, state, {isLogin: true})
            }
            break;
        case ActionTypes.LOGIN_FAILURE:
            break;
        default:
            console.log('action type trigger: ', type)
    }

    return state
}

// function entities(state = { users: {}, repos: {} }, action) {
//     if (action.response && action.response.entities) {
//         return merge({}, state, action.response.entities)
//     }
//
//     return state
// }

const rootReducer = combineReducers({
    loginReduce,
    routing
})

export default rootReducer
