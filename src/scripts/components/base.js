import React from 'react';
import muiTheme from './theme/theme';


export default class BaseReactComponent extends React.Component {
  getChildContext() {
    return {
      muiTheme: muiTheme
    };
  }
  getCurrentPage() {
    if (this.props.location.query.page) {
      return parseInt(this.props.location.query.page)
    } else {
      return 1
    }
  }
}


BaseReactComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
