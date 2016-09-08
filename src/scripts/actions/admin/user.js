import { CALL_API, Schemas } from '../../middleware/api'
import { push } from 'react-router-redux';
import Settings from '../../settings';

const CreateUser_ACTION_TYPE = {
  CreateUser_REQUEST: 'CreateUser_REQUEST',
  CreateUser_SUCCESS: 'CreateUser_SUCCESS',
  CreateUser_FAILURE: 'CreateUser_FAILURE'
}

const ViewUser_ACTION_TYPE = {
  ViewUser_REQUEST: 'ViewUser_REQUEST',
  ViewUser_SUCCESS: 'ViewUser_SUCCESS',
  ViewUser_FAILURE: 'ViewUser_FAILURE'
}

const ViewAllUser_ACTION_TYPE = {
  ViewAllUser_REQUEST: 'ViewAllUser_REQUEST',
  ViewAllUser_SUCCESS: 'ViewAllUser_SUCCESS',
  ViewAllUser_FAILURE: 'ViewAllUser_FAILURE'
}

function _createUser(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        CreateUser_ACTION_TYPE.CreateUser_REQUEST,
        CreateUser_ACTION_TYPE.CreateUser_SUCCESS,
        CreateUser_ACTION_TYPE.CreateUser_FAILURE
      ],
      endpoint: Settings.api.users.create,
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


function createUser(userInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_createUser(userInfo))
  }
}


function _viewUser(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        ViewUser_ACTION_TYPE.ViewUser_REQUEST,
        ViewUser_ACTION_TYPE.ViewUser_SUCCESS,
        ViewUser_ACTION_TYPE.ViewUser_FAILURE
      ],
      endpoint: Settings.api.users.view,
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



function viewUser(userInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewUser(userInfo))
  }
}


function _viewAllUser(data) {
  let body = JSON.stringify(data)
  return {
    [CALL_API]: {
      method: "POST",
      types: [
        ViewAllUser_ACTION_TYPE.ViewAllUser_REQUEST,
        ViewAllUser_ACTION_TYPE.ViewAllUser_SUCCESS,
        ViewAllUser_ACTION_TYPE.ViewAllUser_FAILURE
      ],
      endpoint: Settings.api.users.list,
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



function viewAllUser(userInfo, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(_viewAllUser(userInfo))
  }
}


module.exports = {
  createUser: createUser,
  viewUser: viewUser,
  viewAllUser: viewAllUser,
  ViewAllUser_ACTION_TYPE: ViewAllUser_ACTION_TYPE,
  CreateUser_ACTION_TYPE: CreateUser_ACTION_TYPE,
  ViewUser_ACTION_TYPE: ViewUser_ACTION_TYPE
}
