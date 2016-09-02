import {
    loginUser,
    logoutUser,
    LOGIN_ACTION_TYPE,
    LOGOUT_ACTION_TYPE
} from './account';

import {
    createAnAPI,
    CREATEAPI_ACTION_TYPE
} from './admin/api';


module.exports = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    createAnAPI: createAnAPI,
    LOGIN_ACTION_TYPE: LOGIN_ACTION_TYPE,
    LOGOUT_ACTION_TYPE: LOGOUT_ACTION_TYPE,
    CREATEAPI_ACTION_TYPE: CREATEAPI_ACTION_TYPE
}
