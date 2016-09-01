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
        isLogin: false
    };

    static propTypes = {
        isLogin: PropTypes.bool,
    };

    constructor(props) {
        super(props)
        // this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUserLogin = this.handleUserLogin.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps: ', nextProps)
    }

    handleUserLogin(e) {
        // console.log('handleUserLogin:', this.props)
        this.props.loginUser({
            username: this.refs.usernameInput.value,
            password: this.refs.passwordInput.value
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
                <RaisedButton label='Signin' primary={ true } onTouchTap={
                    this.handleUserLogin
                }/>
              </div>
            </Paper>
          </MuiThemeProvider>
        );
    }
}

AccountLoginApp.propTypes = {
  loginUser: PropTypes.func.isRequired,
}



function mapStateToProps(state, ownProps) {
    // console.log('mapStateToProps:', state, ownProps)
    return {
        isLogin: state.isLogin
    }
}

export default connect(mapStateToProps, {
    loginUser
})(AccountLoginApp)
