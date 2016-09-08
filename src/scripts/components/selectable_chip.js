import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { grey500, greenA400 } from 'material-ui/styles/colors';
import BaseReactComponent from './base';


const styles = {
  chip: {
    margin: 4,
    float: 'left'
  },
  selectedChip: {
    margin: 4,
    backgroundColor: grey500,
    float: 'left'
  }
};


export default class SelectableChip extends BaseReactComponent {

  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected,
      label: props.label,
      value: props.value
    }
  }

  static defaultProps = {
    selected: false,
    selectedBg: 'chip',
  };

  static propTypes = {
    selected: React.PropTypes.bool,
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    handleTouchTap: React.PropTypes.func
  };

  getSelectedBg() {
    if (this.state.selected) {
      return 'selectedChip'
    } else {
      return 'chip'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
    })
  }

  render() {
    let selectedElem;
    if (this.state.selected) {
      selectedElem = <Avatar icon={ <DoneIcon /> } />
    }
    return <Chip style={ styles[this.getSelectedBg()] } onTouchTap={ this.props.handleTouchTap || this.handleTouchTap }>
             { selectedElem }
             { this.props.label }
           </Chip>
  }

}
