import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import GroupTextField from '../../../components/groupTextField'
import BaseReactComponent from '../../../components/base'
import { createAnAPI, viewAnApi } from '../../../actions'
import { connect } from 'react-redux'
import axios from 'axios'

const HeaderKeyDataSource = [
  'Accept',
  'Accept-Charset',
  'Accept-Encoding',
  'Accept-Language',
  'Authorization',
  'Cache-Control',
  'Cookie',
  'Content-Type',
  'User-Agent'
]

const HeaderValDataSource = [
  'application/x-www-form-urlencoded',
  'application/json',
  'application/xml',
  'multipart/form-data',
]

class ApiCreateApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    entity: {
      header: [],
      body: [],
      name: '',
      path: '',
      timeout: '',
      remark: '',
      isInner: false,
      isSign: false,
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
    this.props.createAnAPI(this.state.entity)
  };

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

  handlLoadData(query) {
    if (query.name) {
      this.props.viewAnApi(query)
    }
  };

  componentWillMount() {
    if (this.props.location.search) {
      this.handlLoadData(this.props.location.query)
    }
  };

  componentWillReceiveProps(nextProps) {
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
            floatingLabelText="API Method Name" />
          <br />
          <TextField name="path"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.path }
            fullWidth={ true }
            floatingLabelText="API Path" />
          <br />
          <TextField name="timeout"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.timeout }
            fullWidth={ true }
            floatingLabelText="Request Timeout" />
          <br />
          <TextField name="remark"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.remark }
            floatingLabelText="API Remarks"
            multiLine={ true }
            fullWidth={ true }
            rows={ 4 } />
          <br />
          <GroupTextField groupType="HeaderItems"
            key="custom-header"
            title="Custom Headers"
            fieldsList={ this.state.entity.header }
            dataKeySource={ HeaderKeyDataSource }
            dataValSource={ HeaderValDataSource } />
          <GroupTextField groupType="BodyItems"
            key="custom-body"
            title="Custom Body"
            fieldsList={ this.state.entity.body } />
          <br />
          <Checkbox name="isInner"
            onCheck={ this.handleCheckboxChange }
            label="Inner API"
            checked={ this.state.entity.isInner } />
          <br />
          <Checkbox name="isSign"
            onCheck={ this.handleCheckboxChange }
            label="Verify Signature"
            checked={ this.state.entity.isSign } />
          <br />
          <Checkbox name="isEnable"
            onCheck={ this.handleCheckboxChange }
            label="Enabled"
            checked={ this.state.entity.isEnable } />
          <br />
          <Divider />
          <br />
          <div className="controller">
            <FlatButton label="Add Header" primary={ true } onTouchTap={ this.handleAppendHeaderItem } />
            <FlatButton label="Add Body" primary={ true } onTouchTap={ this.handleAppendBodyItem } />
            <RaisedButton label="Submit" primary={ true } onTouchTap={ this.handleSubmitForm } />
          </div>
        </Paper>
      </div>
      );
  }
}


ApiCreateApp.propTypes = {
  entity: PropTypes.object
}



function mapStateToProps(state, ownProps) {
  let {detailViewReducer} = state
  return {
    entity: detailViewReducer.entity
  }
}

export default connect(mapStateToProps, {
  createAnAPI,
  viewAnApi
})(ApiCreateApp)
