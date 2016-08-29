import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {AccountLoginApp} from './apps/account'
import {
    AdminApp,
    AdminApisApp,
    AdminAddressApp,
    AdminDashboardApp,
    AdminApplicationApp
} from './apps/admin'
import './app.css'

injectTapEventPlugin()

console.log(AdminDashboardApp.path);

render((
  <Router history={browserHistory}>
    <Route path={AdminApp.path} component={AdminApp}>
      <Route path={AdminDashboardApp.path} component={AdminDashboardApp} />
      <Route path={AdminApisApp.path} component={AdminApisApp} />
      <Route path={AdminAddressApp.path} component={AdminAddressApp} />
      <Route path={AdminApplicationApp.path} component={AdminApplicationApp} />
    </Route>
    <Route>
      <Route path={AccountLoginApp.path} component={AccountLoginApp} />
    </Route>
  </Router>
  ), document.getElementById('app'))
