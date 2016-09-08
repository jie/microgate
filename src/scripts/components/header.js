import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import muiTheme from './theme/theme';
import BaseReactComponent from './base';

export default class AppHeaderBar extends BaseReactComponent {
  static propTypes = {
    appTitle: React.PropTypes.string.isRequired,
    onSignOut: React.PropTypes.func
  };
  render() {
    let icon_button = <IconButton>
                        <MoreVertIcon />
                      </IconButton>
    let targetOrigin = {
      horizontal: 'right',
      vertical: 'top'
    }
    let anchorOrigin = {
      horizontal: 'right',
      vertical: 'top'
    }
    let help_item = <MenuItem primaryText="Help" />
    let logout_item = <MenuItem primaryText="Signout" onTouchTap={ this.props.onSignOut } />
    let icon_menu = <IconMenu iconButtonElement={ icon_button } targetOrigin={ targetOrigin } anchorOrigin={ anchorOrigin }>
                      { help_item }
                      { logout_item }
                    </IconMenu>
    return (
      <AppBar title={ this.props.appTitle } iconElementRight={ icon_menu } />
    )
  }
}
