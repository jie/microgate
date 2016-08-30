import React from 'react';
import muiTheme from '../theme/theme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import BaseReactComponent from '../components/base'

export default class AccountLoginApp extends BaseReactComponent {

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Paper className='Login' zDepth={ 3 }>
          <div>
            <TextField fullWidth={ true } hintText='Email' floatingLabelText='Email' />
            <br />
            <TextField fullWidth={ true } hintText='Password' floatingLabelText='Password' />
          </div>
          <div className='LoginButton'>
            <RaisedButton label='Signin' primary={ true } />
          </div>
        </Paper>
      </MuiThemeProvider>
      );
  }
}
