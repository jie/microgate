import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../theme/theme'
import Paper from 'material-ui/Paper'
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
export class AccountLoginApp extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
              <Paper className='Login' zDepth={3}>
                <div>
                  <TextField fullWidth={true} hintText='Email' floatingLabelText='Email' />
                  <br />
                  <TextField fullWidth={true} hintText='Password' floatingLabelText='Password' />
                </div>
                <div className='LoginButton'>
                  <RaisedButton label='Signin' primary={true} />
                </div>
              </Paper>
            </MuiThemeProvider>
        );
    }
}

AccountLoginApp.title = 'AccountLoginApp';
AccountLoginApp.path = '/portal/account/login';
