import React from 'react'
import { connect } from 'react-redux'
import AppHeaderBar from '../../components/header'
import SideList from '../../components/sidebar'
import BaseReactComponent from '../../components/base'
import NotifyBar from '../../components/notify'
import { loginUser } from '../../actions'
import { logoutUser } from '../../actions'
import cookie from '../../utils/cookie'
import Settings from '../../settings'


class MainApp extends BaseReactComponent {

  constructor(props) {
    super(props);
    this.state = {
      notifyStatus: {
        open: false,
        type: 'info',
        message: ''
      }
    }
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  handleSignOut(e) {
    let sessionId = cookie.get(Settings.cookie.name)

    if (sessionId) {
      this.props.logoutUser({
        sessionId: sessionId,
        router: this.context.router
      })
    }
    cookie.set(Settings.cookie.name, null, {
      maxage: -1,
      path: Settings.cookie.path
    })
    this.context.router.push(Settings.pages.login)
  };

  handleNotifyActionTouchTap = () => {
    this.setState({
      notifyStatus: {
        open: false,
        message: ''
      }
    })
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      notifyStatus: nextProps.notifyStatus
    })
  }


  render() {
    // const {
    //   location,
    //   children,
    // } = this.props;

    return (
      <div>
        <AppHeaderBar appTitle="Microgate" onSignOut={ this.handleSignOut } />
        <div className="admin-body">
          <div className="sidebar">
            <SideList location={ this.props.location } onChangeList={ this.handleChangeList } />
          </div>
          <div className="mainbar">
            { this.props.children }
          </div>
        </div>
        <NotifyBar status={ this.state.notifyStatus } handleActionTouchTap={ this.handleNotifyActionTouchTap } />
      </div>
    )
  }
}


MainApp.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  notifyStatus: React.PropTypes.object,
  logoutUser: React.PropTypes.func.isRequired
}




function mapStateToProps(state, ownProps) {
  let {adminNotifyReducer} = state
  console.log('adminNotifyReducer:', adminNotifyReducer)
  return {
    notifyStatus: adminNotifyReducer.notifyStatus
  }
}

export default connect(mapStateToProps, {
  logoutUser
})(MainApp)
