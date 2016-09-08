import cookie from './utils/cookie'
import React from 'react'
import { Router, Route } from 'react-router'
import AccountLoginApp from './containers/account'
import { MainApp } from './containers/admin'
import { DashboardApp } from './containers/admin'
import { ApiCreateApp, ApisListApp } from './containers/admin'
import { ApplicationsApp, ApplicationsCreateApp } from './containers/admin'
import { ServicesApp, ServicesCreateApp } from './containers/admin'
import { UsersApp, UsersCreateApp } from './containers/admin'


// account
AccountLoginApp.title = 'AccountLoginApp';
AccountLoginApp.path = '/portal/account/login';
// admin
MainApp.title = 'MainApp';
MainApp.path = '/portal/admin';
// api
ApiCreateApp.title = 'ApiCreateApp';
ApiCreateApp.path = '/portal/admin/apis/create';
ApisListApp.title = 'ApisListApp';
ApisListApp.path = '/portal/admin/apis';
// service
ServicesApp.title = 'ServicesApp';
ServicesApp.path = '/portal/admin/services';
ServicesCreateApp.title = 'ServicesCreateApp';
ServicesCreateApp.path = '/portal/admin/services/create';
// dashboard
DashboardApp.title = 'DashboardApp';
DashboardApp.path = '/portal/admin/dashboard';
// application
ApplicationsApp.title = 'ApplicationsApp';
ApplicationsApp.path = '/portal/admin/applications';
ApplicationsCreateApp.title = 'ApplicationsCreateApp';
ApplicationsCreateApp.path = '/portal/admin/applications/create';
// user
UsersApp.title = 'UsersApp';
UsersApp.path = '/portal/admin/users';
UsersCreateApp.title = 'UsersCreateApp';
UsersCreateApp.path = '/portal/admin/users/create';

const authenticate = function(next, replace, callback) {
  const authenticated = !!cookie.get('microgate')
  if (!authenticated && next.location.pathname != '/portal/account/login') {
    replace('/portal/account/login')
  }
  callback()
}


export default (
<Router>
  <Route path={ MainApp.path } component={ MainApp }>
    <Route path={ DashboardApp.path } component={ DashboardApp } />
    <Route path={ ApiCreateApp.path } component={ ApiCreateApp } />
    <Route path={ ApisListApp.path } component={ ApisListApp } />
    <Route path={ ServicesApp.path } component={ ServicesApp } />
    <Route path={ ServicesCreateApp.path } component={ ServicesCreateApp } />
    <Route path={ ApplicationsApp.path } component={ ApplicationsApp } />
    <Route path={ ApplicationsCreateApp.path } component={ ApplicationsCreateApp } />
    <Route path={ UsersApp.path } component={ UsersApp } />
    <Route path={ UsersCreateApp.path } component={ UsersCreateApp } />
  </Route>
  <Route>
    <Route path={ AccountLoginApp.path } component={ AccountLoginApp } />
  </Route>
</Router>
)
