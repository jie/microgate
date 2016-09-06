import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import BaseReactComponent from './base';
import { green500, orange500, deepOrange900 } from 'material-ui/styles/colors';
const styles = {
  info: {
    backgroundColor: green500
  },
  warn: {
    backgroundColor: orange500
  },
  error: {
    backgroundColor: deepOrange900
  }
}

export default class NotifyBar extends React.Component {

  static propTypes = {
    status: React.PropTypes.object,
    handleActionTouchTap: React.PropTypes.func
  };

  static defaultProps = {
    status: {
      open: false,
      message: '',
      type: 'info'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      status: props.status
    };
  }

  handleActionTouchTap = () => {
    console.log('handleActionTouchTap::::')
    this.setState({
      status: {
        open: false,
        message: '',
      }
    });
  };

  handleRequestClose = () => {
    console.log('handleRequestClose::::')
    this.setState({
      status: {
        open: false,
        message: '',
      }
    });
  };


  componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps)
    this.setState({
      status: nextProps.status
    })
  }

  render() {
    return (
      <div>
        <Snackbar bodyStyle={ styles[this.state.status.type] } open={ this.state.status.open } message={ this.state.status.message } action={ 'close' } onRequestClose={ this.handleRequestClose } onActionTouchTap={ this.props.handleActionTouchTap } />
      </div>
      );
  }
}
