import React, { PropTypes } from 'react';

import { loginUser } from '../../actions'
import { connect } from 'react-redux'
import muiTheme from '../../components/theme/theme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BaseReactComponent from '../../components/base'
import NotifyBar from '../../components/notify'
import Snackbar from 'material-ui/Snackbar';

class AccountLoginApp extends BaseReactComponent {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static defaultProps = {
    notifyStatus: {
      open: false,
      message: '',
      type: 'info'
    }
  }

  constructor(props) {
    super(props)
    this.handleUserLogin = this.handleUserLogin.bind(this)
    this.state = {
      notifyStatus: props.notifyStatus,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      notifyStatus: nextProps.notifyStatus,
    })
  }

  handleUserLogin(e) {
    this.props.loginUser({
      username: this.refs.usernameInput.input.value,
      password: this.refs.passwordInput.input.value,
      router: this.context.router,
      nextUrl: this.props.location.query.nextUrl
    })
  }

  handleNotifyActionTouchTap = () => {
    this.setState({
      notifyStatus: {
        open: false,
        message: ''
      }
    })
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Paper className='Login' zDepth={ 3 }>
          <div>
            <TextField ref="usernameInput"
              name="username"
              fullWidth={ true }
              hintText='Username'
              floatingLabelText='Username' />
            <br />
            <TextField ref="passwordInput"
              name="password"
              fullWidth={ true }
              hintText='Password'
              floatingLabelText='Password' />
          </div>
          <div className='LoginButton'>
            <RaisedButton label='Signin' primary={ true } onTouchTap={ this.handleUserLogin } />
          </div>
          <NotifyBar status={ this.state.notifyStatus } handleActionTouchTap={ this.handleNotifyActionTouchTap } />
        </Paper>
      </MuiThemeProvider>
      );
  }
}

AccountLoginApp.propTypes = {
  loginUser: PropTypes.func.isRequired,
  notifyStatus: PropTypes.object
}


function mapStateToProps(state, ownProps) {
  let {loginReducer} = state
  return {
    notifyStatus: loginReducer.notifyStatus
  }
}

export default connect(mapStateToProps, {
  loginUser
})(AccountLoginApp)
