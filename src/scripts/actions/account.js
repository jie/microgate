import { CALL_API, Schemas } from '../middleware/api'
import cookie from '../utils/cookie'
import { push } from 'react-router-redux';

export const LOGIN_ACTION_TYPE = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE'
}

export const LOGOUT_ACTION_TYPE = {
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}


function fetchUser(authInfo) {
    let body = JSON.stringify({
        "username": authInfo.username,
        "password": authInfo.password
    })
    return {
        [CALL_API]: {
            method: "POST",
            types: [
                LOGIN_ACTION_TYPE.LOGIN_REQUEST,
                LOGIN_ACTION_TYPE.LOGIN_SUCCESS,
                LOGIN_ACTION_TYPE.LOGIN_FAILURE
            ],
            endpoint: `/portal/rest/account/login`,
            schema: Schemas.USER,
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


export function loginUser(authInfo, requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchUser(authInfo)).then((action) => {
            if (action.type === LOGIN_ACTION_TYPE.LOGIN_SUCCESS) {
                let res = action.response;
                let nextUrl = res.nextUrl || '/portal/admin/dashboard';
                // dispatch(push(nextUrl));
                dispatch(function() {
                    authInfo.router.push(nextUrl)
                })
            }
        });
    }
}



function _logoutUser(logoutInfo) {
    let body = JSON.stringify({
        "sessionId": logoutInfo.sessionId
    })
    return {
        [CALL_API]: {
            method: "POST",
            types: [
                LOGOUT_ACTION_TYPE.LOGOUT_REQUEST,
                LOGOUT_ACTION_TYPE.LOGOUT_SUCCESS,
                LOGOUT_ACTION_TYPE.LOGOUT_FAILURE
            ],
            endpoint: `/portal/rest/account/logout`,
            schema: Schemas.USER,
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


export function logoutUser(logoutInfo, requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(_logoutUser(logoutInfo)).then((action) => {
            if (action.type === LOGOUT_ACTION_TYPE.LOGOUT_SUCCESS) {
                let res = action.response;
                let nextUrl = res.nextUrl || '/portal/account/login';
                dispatch(function() {
                    logoutInfo.router.push(nextUrl)
                })
            }
            console.log('cookie: ', cookie);
            cookie.set(res.cookieName || 'microgate', '')
        })
    }
}
