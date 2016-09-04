import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BaseReactComponent from './base';

export default class NotifyBar extends React.Component {

  static defaultProps = {
    message: ''
  };

  static propTypes = {
    message: React.PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: this.props.message,
    };
  }

  handleActionTouchTap = () => {
    this.setState({
      message: '',
    });
  };

  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    });
  };

  handleRequestClose = () => {
    this.setState({
      message: '',
    });
  };

  render() {
    let status;
    if (this.state.message) {
      status = true;
    } else {
      status = false;
    }
    return (
      <div>
        <Snackbar open={ status } message={ this.state.message } action="confirm" autoHideDuration={ this.state.autoHideDuration } onActionTouchTap={ this.handleActionTouchTap } onRequestClose={ this.handleRequestClose } />
      </div>
      );
  }
}
