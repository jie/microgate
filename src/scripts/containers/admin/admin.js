import React from 'react';
import { connect } from 'react-redux'
import AppHeaderBar from '../../components/header';
import SideList from '../../components/sidebar';
import BaseReactComponent from '../../components/base';
import NotifyBar from '../../components/NotifyBar'
import { loginUser } from '../../actions'
import { logoutUser } from '../../actions'
import cookie from '../../utils/cookie'

export default class MainApp extends BaseReactComponent {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            notifyBarState: false,
            notifyBarMessage: ''
        }
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    static defaultProps = {
        authenticated: false,
        notifyBarState: false,
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
        let sessionId = cookie('microgate');
        console.log('sessionId: ', sessionId)
        console.log('props: ', this.props)
        this.props.logoutUser({
            sessionId: cookie('microgate'),
            router: this.context.router
        })
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    };

    render() {
        // const {
        //   location,
        //   children,
        // } = this.props;

        return (
           <div>
               <AppHeaderBar appTitle="Microgate" onSignOut={this.handleSignOut}/>
               <div className="admin-body">
                   <div className="sidebar">
                       <SideList location={this.props.location} onChangeList={this.handleChangeList} />
                   </div>
                   <div className="mainbar">
                       {this.props.children}
                   </div>
               </div>
               <NotifyBar open={this.state.notifyBarState} message={this.state.notifyBarMessage}/>
           </div>
       )
    }
}


MainApp.propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    authenticated: React.PropTypes.bool,
    notifyBarState: React.PropTypes.bool,
    notifyBarMessage: React.PropTypes.string,
    logoutUser: React.PropTypes.func.isRequired
}




function mapStateToProps(state, ownProps) {
    // console.log('mapStateToProps:', state, ownProps)
    return {
        authenticated: ownProps.authenticated,
        notifyBarState: ownProps.notifyBarState,
        notifyBarMessage: ownProps.notifyBarMessage
    }
}

export default connect(mapStateToProps, {
    logoutUser
})(MainApp)
