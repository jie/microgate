import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BaseReactComponent from './base';

export default class NotifyBar extends React.Component {

    static defaultProps = {
        open: false,
        message: ''
    };

    static propTypes = {
        open: React.PropTypes.bool,
        message: React.PropTypes.string
    };

    componentWillReceiveProps(nextProps) {
        this.setState({message: nextProps.message, open: nextProps.open});
    }

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: this.props.message,
      open: this.props.open,
    };
  }

  handleActionTouchTap = () => {
    this.setState({
      open: false,
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
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="confirm"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
