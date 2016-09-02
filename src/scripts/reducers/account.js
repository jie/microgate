import LOGIN_ACTION_TYPE from '../actions'
import merge from 'lodash/merge'
import cookie from '../utils/cookie'

export default function loginReducer(state = {'authenticated': false}, action) {
    const { type, data } = action;
    switch(type) {
        case LOGIN_ACTION_TYPE.LOGIN_SUCCESS:
            if (action.response) {
                let res = action.response;
                cookie.set(res.cookieName || 'microgate', res.sessionId, {
                    path: '/',
                    expdays: res.expiredays || 7
                })
                return merge({}, state, {authenticated: true})
            }
            break;
        case LOGIN_ACTION_TYPE.LOGIN_FAILURE:
            break;
        default:
            console.log('action type trigger: ', type)
    }

    return state
}
