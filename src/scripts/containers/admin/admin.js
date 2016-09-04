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
      notifyBarMessage: ''
    }
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  static defaultProps = {
    notifyBarMessage: ''
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
        <NotifyBar message={ this.state.notifyBarMessage } />
      </div>
    )
  }
}


MainApp.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  notifyBarMessage: React.PropTypes.string,
  logoutUser: React.PropTypes.func.isRequired
}




function mapStateToProps(state, ownProps) {
  return {
    notifyBarMessage: ownProps.notifyBarMessage
  }
}

export default connect(mapStateToProps, {
  logoutUser
})(MainApp)
