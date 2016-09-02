import React, {PropTypes} from 'react';

import { loginUser } from '../../actions'
import { connect } from 'react-redux'
import muiTheme from '../../components/theme/theme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BaseReactComponent from '../../components/base'

export default class AccountLoginApp extends BaseReactComponent {

    static defaultProps = {
        authenticated: false
    };

    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.handleUserLogin = this.handleUserLogin.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps: ', nextProps)
    }

    handleUserLogin(e) {
        console.log('this.refs.usernameInput: ', this.refs.usernameInput)
        this.props.loginUser({
            username: this.refs.usernameInput.input.value,
            password: this.refs.passwordInput.input.value,
            router: this.context.router
        })
    }

    render() {
        return (
          <MuiThemeProvider muiTheme={ muiTheme }>
            <Paper className='Login' zDepth={ 3 }>
              <div>
                <TextField ref="usernameInput" name="username" fullWidth={ true } hintText='Email' floatingLabelText='Email' />
                <br />
                <TextField ref="passwordInput" name="password" fullWidth={ true } hintText='Password' floatingLabelText='Password' />
              </div>
              <div className='LoginButton'>
                <RaisedButton label='Signin' primary={ true } onTouchTap={this.handleUserLogin} />
              </div>
            </Paper>
          </MuiThemeProvider>
        );
    }
}

AccountLoginApp.propTypes = {
  loginUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}


function mapStateToProps(state, ownProps) {
    // console.log('mapStateToProps:', state, ownProps)
    return {
        authenticated: ownProps.authenticated
    }
}

export default connect(mapStateToProps, {
    loginUser
})(AccountLoginApp)
