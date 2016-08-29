import React from 'react';
import Paper from 'material-ui/Paper';
import MobileTearSheet from './sheet';
import Divider from 'material-ui/Divider';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
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
const style = {
    paper: {
      display: 'inline-block',
      width: '100%'
    },
};

const SelectableList = MakeSelectable(List);

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

    const {
        location,
        onChangeList,
    } = this.props;

    return (
      <Paper style={style.paper}>
          <SelectableList
            value={location.pathname}
            onChange={onChangeList}>
            <ListItem
                primaryText="Dashboard"
                leftIcon={<DashboardIcon />}
                value="/portal/admin/dashboard"
                href="/portal/admin/dashboard"
            />
            <Divider />
            <ListItem
                primaryText="APIs"
                leftIcon={<HttpIcon />}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                      key={'api1'}
                      primaryText="APIs List"
                      href="/portal/admin/apis"
                      value="/portal/admin/apis"
                    />
                ]}
            />
            <ListItem
                primaryText="Address"
                leftIcon={<StorageIcon />}
                value="/portal/admin/address"
                href="/portal/admin/address"
            />
            <ListItem
                primaryText="Applications"
                leftIcon={<DeveloperModeIcon />}
                value="/portal/admin/applications"
                href="/portal/admin/applications"
            />
            <ListItem
              primaryText="Supervisor"
              leftIcon={<SupervisorIcon />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Starred"
                    leftIcon={<ActionGrade />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Starred"
                    leftIcon={<ActionGrade />}
                  />
              ]}
            />
            <Divider />
          </SelectableList>
      </Paper>
    );
  }
}
