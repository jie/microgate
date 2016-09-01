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
    };
  render() {
      return (
          <AppBar
                title={ this.props.appTitle }
                iconElementRight={
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                                </IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                    </IconMenu>
                }
            />
        )
    }
}
