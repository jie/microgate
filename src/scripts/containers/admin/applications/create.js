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

class ApplicationsCreateApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    apiService: {
      header: [],
      body: [],
      name: '',
      host: '',
      timeout: '',
      remark: '',
      isInner: false,
      isSign: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      apiService: props.apiService
    };
  };

  handleAppendHeaderItem = (e) => {
    let apiService = this.state.apiService;
    if (!this.state.apiService.header) {
      apiService.header = [];
    }
    apiService.header.push({})
    this.setState({
      apiService: apiService
    })
  };

  handleAppendBodyItem = (e) => {
    let apiService = this.state.apiService;
    if (!this.state.apiService.body) {
      apiService.body = [];
    }
    apiService.body.push({})
    this.setState({
      apiService: apiService
    })
  };

  handleSubmitForm = (e) => {
    console.log('handleSubmitForm:', this.state.apiService)
    this.props.createAnAPI(this.state.apiService)
  };

  handleTextFieldChange = (e) => {
    let apiService = this.state.apiService;
    apiService[e.target.name] = e.target.value
    this.setState({
      apiService: apiService
    })
  }

  handleCheckboxChange = (e) => {
    let apiService = this.state.apiService;
    apiService[e.target.name] = e.target.checked
    this.setState({
      apiService: apiService
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
    console.log('nextProps.apiService:', nextProps.apiService)
    this.setState({
      apiService: nextProps.apiService
    })
  }

  render() {
    return (
      <div className="formPaper">
        <Paper className="flatPaper">
          <TextField name="name"
            onChange={ this.handleTextFieldChange }
            value={ this.state.apiService.name }
            fullWidth={ true }
            floatingLabelText="Name" />
          <br />
          <TextField name="host"
            onChange={ this.handleTextFieldChange }
            value={ this.state.apiService.host }
            fullWidth={ true }
            floatingLabelText="Host" />
          <br />
          <TextField name="timeout"
            onChange={ this.handleTextFieldChange }
            value={ this.state.apiService.timeout }
            fullWidth={ true }
            floatingLabelText="Request Timeout" />
          <br />
          <TextField name="remark"
            onChange={ this.handleTextFieldChange }
            value={ this.state.apiService.remark }
            floatingLabelText="Remarks"
            multiLine={ true }
            fullWidth={ true }
            rows={ 4 } />
          <br />
          <GroupTextField groupType="HeaderItems"
            key="custom-header"
            title="Custom Headers"
            fieldsList={ this.state.apiService.header }
            dataKeySource={ HeaderKeyDataSource }
            dataValSource={ HeaderValDataSource } />
          <GroupTextField groupType="BodyItems"
            key="custom-body"
            title="Custom Body"
            fieldsList={ this.state.apiService.body } />
          <br />
          <Checkbox name="isInner"
            onCheck={ this.handleCheckboxChange }
            label="Inner Service"
            checked={ this.state.apiService.isInner } />
          <br />
          <Checkbox name="isSign"
            onCheck={ this.handleCheckboxChange }
            label="Verify Signature"
            checked={ this.state.apiService.isSign } />
          <br />
          <Checkbox name="isForwarding"
            onCheck={ this.handleCheckboxChange }
            label="Just forwarding request"
            checked={ this.state.apiService.isForwarding } />
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


ApplicationsCreateApp.propTypes = {
  apiService: PropTypes.object
}



function mapStateToProps(state, ownProps) {
  let {viewAnApiReducer} = state
  return {
    apiService: viewAnApiReducer.apiService
  }
}

export default connect(mapStateToProps, {
  createAnAPI,
  viewAnApi
})(ApplicationsCreateApp)
