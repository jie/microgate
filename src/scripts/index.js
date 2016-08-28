import React from 'react'
import {
    render
}
from 'react-dom'
import {
    browserHistory, Router, Route, Link
}
from 'react-router';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {
    deepOrange500
}
from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import './app.css'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

const AppBarExampleIconMenu = () => ( < AppBar title = "Title"
    iconElementLeft = {
        <IconButton><NavigationClose /></IconButton>
    }
    iconElementRight = { < IconMenu
        iconButtonElement = {
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin = {
            {
                horizontal: 'right',
                vertical: 'top'
            }
        }
        anchorOrigin = {
                {
                    horizontal: 'right',
                    vertical: 'top'
                }
            } >
            <MenuItem primaryText="Refresh" /> < MenuItem primaryText =
            "Help" / >
            <MenuItem primaryText="Sign out" /> < /IconMenu>
    }
    />
);

export default AppBarExampleIconMenu;


const App = ({
    children, routes
}) => {
    const depth = routes.length

    return (
        <div>
      <aside>
        <ul>
          <li><Link to={Products.path}>Products</Link></li>
          <li><Link to={Orders.path}>Orders</Link></li>
        </ul>
      </aside>
      <main>
        <ul className="breadcrumbs-list">
          {routes.map((item, index) =>
            <li key={index}>
              <Link
                onlyActiveOnIndex={true}
                activeClassName="breadcrumb-active"
                to={item.path || ''}>
                {item.component.title}
              </Link>
              {(index + 1) < depth && '\u2192'}
            </li>
          )}
        </ul>
        {children}
      </main>
    </div>
    )
}

App.title = 'Home'
App.path = '/portal/board'


const Products = () => (
    <div className="Page">
    <h1>Products</h1>
  </div>
)

Products.title = 'Products'
Products.path = '/portal/board/products'

const Orders = () => (
    <div className="Page">
    <h1>Orders</h1>
  </div>
)

Orders.title = 'Orders'
Orders.path = '/portal/board/orders'


const AccountLogin = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Paper className="Login" zDepth={3} >
            <div>
                <TextField
                  fullWidth={true}
                  hintText="Email"
                  floatingLabelText="Email"
                /><br />
                <TextField
                  fullWidth={true}
                  hintText="Password"
                  floatingLabelText="Password"
                />
            </div>
            <div className="LoginButton">
                <RaisedButton label="Signin" primary={true} />
            </div>
        </Paper>
    </MuiThemeProvider>
)

AccountLogin.title = 'Login'
AccountLogin.path = '/portal/account/login'

render((
    <Router history={browserHistory}>
    <Route path={App.path} component={App}>
      <Route path={Products.path} component={Products} />
      <Route path={Orders.path} component={Orders} />
    </Route>
    <Route>
      <Route path={AccountLogin.path} component={AccountLogin} />
    </Route>
  </Router>
), document.getElementById('app'))
