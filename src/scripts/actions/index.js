import { loginUser, logoutUser, LOGIN_ACTION_TYPE, LOGOUT_ACTION_TYPE } from './account';
import { createAnAPI, CREATEAPI_ACTION_TYPE } from './admin/api';
import { viewAnApi, VIEWAPI_ACTION_TYPE } from './admin/api';
import { viewAllApi, VIEWALLAPI_ACTION_TYPE } from './admin/api';
import { createService, CREATESERVICE_ACTION_TYPE } from './admin/service';
import { viewService, VIEWSERVICE_ACTION_TYPE } from './admin/service';
import { viewAllService, VIEWALLSERVICE_ACTION_TYPE } from './admin/service';
import { createApp, CREATEAPP_ACTION_TYPE } from './admin/application';
import { viewApp, VIEWAPP_ACTION_TYPE } from './admin/application';
import { viewAllApp, VIEWALLAPP_ACTION_TYPE } from './admin/application';
import { generateAppKeyPairs, GenAppKey_ACTION_TYPE } from './admin/application';

//user
import { createUser, CreateUser_ACTION_TYPE } from './admin/user';
import { viewUser, ViewUser_ACTION_TYPE } from './admin/user';
import { viewAllUser, ViewAllUser_ACTION_TYPE } from './admin/user';

module.exports = {
  //account
  loginUser: loginUser,
  logoutUser: logoutUser,
  LOGIN_ACTION_TYPE: LOGIN_ACTION_TYPE,
  LOGOUT_ACTION_TYPE: LOGOUT_ACTION_TYPE,
  // apis
  createAnAPI: createAnAPI,
  viewAnApi: viewAnApi,
  viewAllApi: viewAllApi,
  CREATEAPI_ACTION_TYPE: CREATEAPI_ACTION_TYPE,
  VIEWAPI_ACTION_TYPE: VIEWAPI_ACTION_TYPE,
  VIEWALLAPI_ACTION_TYPE: VIEWALLAPI_ACTION_TYPE,
  // services
  createService: createService,
  viewService: viewService,
  viewAllService: viewAllService,
  VIEWSERVICE_ACTION_TYPE: VIEWSERVICE_ACTION_TYPE,
  CREATESERVICE_ACTION_TYPE: CREATESERVICE_ACTION_TYPE,
  VIEWALLSERVICE_ACTION_TYPE: VIEWALLSERVICE_ACTION_TYPE,
  // applications
  createApp: createApp,
  viewApp: viewApp,
  viewAllApp: viewAllApp,
  generateAppKeyPairs: generateAppKeyPairs,
  VIEWAPP_ACTION_TYPE: VIEWAPP_ACTION_TYPE,
  CREATEAPP_ACTION_TYPE: CREATEAPP_ACTION_TYPE,
  VIEWALLAPP_ACTION_TYPE: VIEWALLAPP_ACTION_TYPE,
  // users
  createUser: createUser,
  viewUser: viewUser,
  viewAllUser: viewAllUser,
  CreateUser_ACTION_TYPE: CreateUser_ACTION_TYPE,
  ViewUser_ACTION_TYPE: ViewUser_ACTION_TYPE,
  ViewAllUser_ACTION_TYPE: ViewAllUser_ACTION_TYPE,
}
