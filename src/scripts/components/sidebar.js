import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import HttpIcon from 'material-ui/svg-icons/action/http';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import DeveloperModeIcon from 'material-ui/svg-icons/device/developer-mode';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import BaseReactComponent from './base';
import { Link } from 'react-router'
const style = {
  paper: {
    display: 'inline-block',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  activeItem: {
    background: 'red'
  }
};

export default class SidebarMenu extends BaseReactComponent {
  render() {
    return (
      <Paper style={ style.paper }>
        <Menu>
          <MenuItem primaryText="Dashboard" containerElement={ <Link to="/portal/admin/dashboard" activeStyle={ style.activeItem } /> } leftIcon={ <DashboardIcon /> } />
          <Divider />
          <MenuItem primaryText="APIs" containerElement={ <Link to="/portal/admin/apis" activeStyle={ style.activeItem } /> } leftIcon={ <HttpIcon /> } />
          <MenuItem primaryText="Address" containerElement={ <Link to="/portal/admin/address" activeStyle={ style.activeItem } /> } leftIcon={ <StorageIcon /> } />
          <MenuItem primaryText="Applications" containerElement={ <Link to="/portal/admin/application" activeStyle={ style.activeItem } /> } leftIcon={ <DeveloperModeIcon /> } />
        </Menu>
      </Paper>
    )
  }
}
