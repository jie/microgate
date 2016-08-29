import React from 'react';


import muiTheme from '../theme/theme';

// export default class BaseReactComponent extends React.Component {
//     getChildContext() {
//       return {muiTheme: getMuiTheme(baseTheme)};
//     }
// }

export default class BaseReactComponent extends React.Component {
    getChildContext() {
      return {muiTheme: muiTheme};
    }
}


BaseReactComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
