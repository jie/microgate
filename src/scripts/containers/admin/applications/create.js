import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import GroupTextField from '../../../components/groupTextField'
import MenuItem from 'material-ui/MenuItem'
import BaseReactComponent from '../../../components/base'
import { createApp, viewApp, generateAppKeyPairs } from '../../../actions'
import { connect } from 'react-redux'
import axios from 'axios'

class ApplicationsCreateApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    entity: {
      name: '',
      remark: '',
      signType: 'rsa',
      appKey: '',
      appSecret: '',
      sysKey: '',
      sysSecret: '',
      isEnable: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      entity: props.entity
    };
  };

  handleAppendHeaderItem = (e) => {
    let entity = this.state.entity;
    if (!this.state.entity.header) {
      entity.header = [];
    }
    entity.header.push({})
    this.setState({
      entity: entity
    })
  };

  handleAppendBodyItem = (e) => {
    let entity = this.state.entity;
    if (!this.state.entity.body) {
      entity.body = [];
    }
    entity.body.push({})
    this.setState({
      entity: entity
    })
  };

  handleSubmitForm = (e) => {
    this.props.createApp(this.state.entity)
  };

  handleGenerateKeyPair = (e) => {
    console.log('generateAppKeyPairs: ', this.props)
    this.props.generateAppKeyPairs(this.state.entity)
  }

  handleTextFieldChange = (e) => {
    let entity = this.state.entity;
    entity[e.target.name] = e.target.value
    this.setState({
      entity: entity
    })
  }

  handleCheckboxChange = (e) => {
    let entity = this.state.entity;
    entity[e.target.name] = e.target.checked
    this.setState({
      entity: entity
    })
  };

  handleSelectChange = (e, index, value) => {
    let entity = this.state.entity;
    entity.signType = value;
    this.setState({
      entity: entity
    })
  }

  handlLoadData(query) {
    if (query.id) {
      this.props.viewApp(query)
    }
  };

  componentWillMount() {
    console.log('this.props.location: ', this.props.location)
    if (this.props.location.search) {
      this.handlLoadData(this.props.location.query)
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.entity:', nextProps.entity)
    this.setState({
      entity: nextProps.entity
    })
  }

  render() {
    return (
      <div className="formPaper">
        <Paper className="flatPaper">
          <TextField name="name"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.name }
            fullWidth={ true }
            floatingLabelText="Name" />
          <br />
          <SelectField value={ this.state.entity.signType }
            onChange={ this.handleSelectChange }
            fullWidth={ true }
            floatingLabelText="Signature Type">
            <MenuItem value={ "rsa" } primaryText="RSA" />
            <MenuItem value={ "ecdsa" } primaryText="ECDSA" />
            <MenuItem value={ "hmac" } primaryText="HMAC" />
          </SelectField>
          <br/>
          <TextField name="appKey"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.appKey }
            fullWidth={ true }
            disabled={ true }
            floatingLabelText="App Key" />
          <br />
          <TextField name="appSecret"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.appSecret }
            fullWidth={ true }
            disabled={ true }
            floatingLabelText="App Secret" />
          <br />
          <TextField name="remark"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.remark }
            floatingLabelText="Remarks"
            multiLine={ true }
            fullWidth={ true }
            rows={ 4 } />
          <br />
          <br />
          <Checkbox name="isEnable"
            onCheck={ this.handleCheckboxChange }
            label="enabled"
            checked={ this.state.entity.isEnable } />
          <br />
          <Divider />
          <br />
          <div className="controller">
            <FlatButton label="Generate Key Pairs" primary={ true } onTouchTap={ this.handleGenerateKeyPair } />
            <RaisedButton label="Submit" primary={ true } onTouchTap={ this.handleSubmitForm } />
          </div>
        </Paper>
      </div>
      );
  }
}


ApplicationsCreateApp.propTypes = {
  entity: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  let {detailViewReducer} = state
  return {
    entity: detailViewReducer.entity
  }
}
console.log('1111generateAppKeyPair:', generateAppKeyPairs)
export default connect(mapStateToProps, {
  createApp,
  viewApp,
  generateAppKeyPairs
})(ApplicationsCreateApp)
