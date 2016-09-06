import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './app.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin()

render(
  <Root store={ store } history={ history } />,
  document.getElementById('app')
)
