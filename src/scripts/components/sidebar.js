import React from 'react';
import Paper from 'material-ui/Paper';
import MobileTearSheet from './sheet';
import Divider from 'material-ui/Divider';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import BaseReactComponent from './base';
import { Link } from 'react-router'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import HttpIcon from 'material-ui/svg-icons/action/http';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import DeveloperModeIcon from 'material-ui/svg-icons/device/developer-mode';
import SupervisorIcon from 'material-ui/svg-icons/action/supervisor-account';


const SelectableList = MakeSelectable(List);
const style = {
  paper: {
    display: 'inline-block',
    width: '100%'
  }

};
export default class SideList extends BaseReactComponent {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    onChangeList: React.PropTypes.func.isRequired
  };

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {

    const {location, onChangeList, } = this.props;
    let APIS_LIST = (<ListItem key={ 'apis' }
                       primaryText="APIs List"
                       href="/portal/admin/apis"
                       value="/portal/admin/apis" />)
    let APIS_CREATE = (<ListItem key={ 'apiCreate' }
                         primaryText="Create API"
                         href="/portal/admin/apis/create"
                         value="/portal/admin/apis/create" />)
    let SERVICES_LIST = (<ListItem key={ 'services' }
                           primaryText="Services List"
                           href="/portal/admin/services"
                           value="/portal/admin/services" />)
    let SERVICES_CREATE = (<ListItem key={ 'services' }
                             primaryText="Create Service"
                             href="/portal/admin/services/create"
                             value="/portal/admin/services/create" />)
    let APPICATIONS_LIST = (<ListItem key={ 'applications' }
                              primaryText="Appications List"
                              href="/portal/admin/applications"
                              value="/portal/admin/applications" />)
    let APPICATIONS_CREATE = (<ListItem key={ 'applications' }
                                primaryText="Create Application"
                                href="/portal/admin/applications/create"
                                value="/portal/admin/applications/create" />)

    return (
      <Paper style={ style.paper }>
        <SelectableList value={ location.pathname } onChange={ onChangeList }>
          <ListItem primaryText="Dashboard"
            leftIcon={ <DashboardIcon /> }
            value="/portal/admin/dashboard"
            href="/portal/admin/dashboard" />
          <Divider />
          <ListItem primaryText="APIs"
            leftIcon={ <HttpIcon /> }
            primaryTogglesNestedList={ true }
            nestedItems={ [APIS_LIST, APIS_CREATE] } />
          <ListItem primaryText="Services"
            leftIcon={ <StorageIcon /> }
            primaryTogglesNestedList={ true }
            nestedItems={ [SERVICES_LIST, SERVICES_CREATE] } />
          <ListItem primaryText="Applications"
            leftIcon={ <DeveloperModeIcon /> }
            primaryTogglesNestedList={ true }
            nestedItems={ [APPICATIONS_LIST, APPICATIONS_CREATE] } />
          <Divider />
        </SelectableList>
      </Paper>
      );
  }
}
