import cookie from './utils/cookie'
import React from 'react'
import { Router, Route } from 'react-router'
import AccountLoginApp from './containers/account'
import { MainApp, ApiCreateApp, ApisListApp, DashboardApp, ApplicationsApp, ApplicationsCreateApp, ServicesApp, ServicesCreateApp } from './containers/admin'


// account
AccountLoginApp.title = 'AccountLoginApp';
AccountLoginApp.path = '/portal/account/login';
// admin
MainApp.title = 'MainApp';
MainApp.path = '/portal/admin';
ApiCreateApp.title = 'ApiCreateApp';
ApiCreateApp.path = '/portal/admin/apis/create';
ApisListApp.title = 'ApisListApp';
ApisListApp.path = '/portal/admin/apis';
ServicesApp.title = 'ServicesApp';
ServicesApp.path = '/portal/admin/services';
ServicesCreateApp.title = 'ServicesCreateApp';
ServicesCreateApp.path = '/portal/admin/services/create';
DashboardApp.title = 'DashboardApp';
DashboardApp.path = '/portal/admin/dashboard';
ApplicationsApp.title = 'ApplicationsApp';
ApplicationsApp.path = '/portal/admin/applications';
ApplicationsCreateApp.title = 'ApplicationsCreateApp';
ApplicationsCreateApp.path = '/portal/admin/applications/create';

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
  </Route>
  <Route>
    <Route path={ AccountLoginApp.path } component={ AccountLoginApp } />
  </Route>
</Router>
)
