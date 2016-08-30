import React from 'react';
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AccountLoginApp from './account'
import {
    MainApp,
    ApiCreateApp,
    ApisListApp,
    AddressApp,
    DashboardApp,
    ApplicationApp
} from './admin'
import './app.css'

injectTapEventPlugin()

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
AddressApp.title = 'AddressApp';
AddressApp.path = '/portal/admin/address';
DashboardApp.title = 'DashboardApp';
DashboardApp.path = '/portal/admin/dashboard';
ApplicationApp.title = 'ApplicationApp';
ApplicationApp.path = '/portal/admin/application';

render((
  <Router history={browserHistory}>
    <Route path={MainApp.path} component={MainApp}>
      <Route path={DashboardApp.path} component={DashboardApp} />
      <Route path={ApiCreateApp.path} component={ApiCreateApp} />
      <Route path={ApisListApp.path} component={ApisListApp} />
      <Route path={AddressApp.path} component={AddressApp} />
      <Route path={ApplicationApp.path} component={ApplicationApp} />
    </Route>
    <Route>
      <Route path={AccountLoginApp.path} component={AccountLoginApp} />
    </Route>
  </Router>
  ), document.getElementById('app'))
