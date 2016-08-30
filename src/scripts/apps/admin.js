import React from 'react';
import AppHeaderBar from '../components/header';
import SidebarMenu from '../components/sidebar';
import SideList from '../components/sidebar2';
import MyTable from '../components/table';
import muiTheme from '../theme/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import BaseReactComponent from '../components/base';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// const AdminApp = ({ children }) => {
//     const title = "AdminApp"
//     const path = "/portal/admin"
//      return (
//         <div>
//             <AppHeaderBar appTitle="Microgate" />
//             <div className="admin-body">
//                 <div className="sidebar">
//                     <SideList />
//                 </div>
//                 <div className="mainbar">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     )
// }

class AdminApp extends BaseReactComponent {

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  render() {
    const {location, children, } = this.props;

    return (
      <div>
        <AppHeaderBar appTitle="Microgate" />
        <div className="admin-body">
          <div className="sidebar">
            <SideList location={ location } onChangeList={ this.handleChangeList } />
          </div>
          <div className="mainbar">
            { children }
          </div>
        </div>
      </div>
    )
  }
}


class AdminDashboardApp extends BaseReactComponent {

  render() {
    return (
      <div>
        <MyTable />
      </div>
      );
  }
}

AdminDashboardApp.title = 'AdminDashboardApp';
AdminDashboardApp.path = '/portal/admin/dashboard';

class AdminApisApp extends BaseReactComponent {

  state = {
    apiDialogStatus: false,
  };

  handleOpen = () => {
    this.setState({
      apiDialogStatus: true
    });
  };

  handleClose = () => {
    console.log('apiDialogStatus:', this.state.apiDialogStatus);
    this.setState({
      apiDialogStatus: false
    });
  };


  render() {

    const actions = [
      <FlatButton label="Cancel" primary={ true } onTouchTap={ this.handleClose } />,
      <FlatButton label="Submit" primary={ true } disabled={ true } onTouchTap={ this.handleClose } />,
    ];

    return (
      <div>
        <Paper>
          <div>
            <FlatButton label="Create API" onTouchTap={ this.handleOpen } />
            <FlatButton label="Primary" primary={ true } />
            <FlatButton label="Secondary" secondary={ true } />
            <FlatButton label="Disabled" disabled={ true } />
          </div>
        </Paper>
        <Dialog actions={ actions } modal={ false } open={ this.state.apiDialogStatus } onRequestClose={ this.handleClose }>
          <div>
            <TextField fullWidth={ true } floatingLabelText="API Method Name" />
            <br />
            <TextField fullWidth={ true } floatingLabelText="API Path" />
            <br />
            <TextField fullWidth={ true } floatingLabelText="Request Timeout" />
            <br />
            <TextField floatingLabelText="API Remarks" multiLine={ true } fullWidth={ true } rows={ 4 } />
            <br />
            <Checkbox label="Enabled" />
            <br />
            <Checkbox label="Verify Signature" />
          </div>
        </Dialog>
      </div>
      );
  }
}

AdminApisApp.title = 'AdminApisApp';
AdminApisApp.path = '/portal/admin/apis';

class AdminAddressApp extends BaseReactComponent {

  render() {
    return (
      <div>
      </div>
      );
  }
}
AdminAddressApp.title = 'AdminAddressApp';
AdminAddressApp.path = '/portal/admin/address';

class AdminApplicationApp extends BaseReactComponent {

  render() {
    return (
      <div>
      </div>
      );
  }
}
AdminApplicationApp.title = 'AdminApplicationApp';
AdminApplicationApp.path = '/portal/admin/applications';

module.exports = {
  AdminApp: AdminApp,
  AdminDashboardApp: AdminDashboardApp,
  AdminApisApp: AdminApisApp,
  AdminAddressApp: AdminAddressApp,
  AdminApplicationApp: AdminApplicationApp
}
