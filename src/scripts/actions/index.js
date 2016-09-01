import { CALL_API, Schemas } from '../middleware/api'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
    let body = JSON.stringify({
        "username": login.username,
        "password": login.password
    })
    return {
        [CALL_API]: {
            method: "POST",
            types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
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


export function loginUser(login, requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchUser(login))
    }
}
