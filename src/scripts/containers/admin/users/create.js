import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import GroupTextField from '../../../components/groupTextField'
import SelectableChip from '../../../components/selectable_chip'
import BaseReactComponent from '../../../components/base'
import { createUser, viewUser } from '../../../actions'
import { connect } from 'react-redux'



const chipWrapperStyle = {
  marginLeft: '20px',
  display: 'inline-block'
}

const labelStyle = {
  marginTop: '10px',
  float: 'left'
}

class UsersCreateApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    entity: {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      remark: '',
      permissions: [],
      isEnable: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      entity: props.entity,
      permissions: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Service',
          value: 'service',
        },
        {
          label: 'API',
          value: 'api',
        },
        {
          label: 'Applications',
          value: 'application',
        }
      ]
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
    let permissions = []
    for (let permission of this.state.permissions) {
      if (permission.selected == true) {
        permissions.push(permission.value)
      }
    }
    this.props.createUser(this.state.entity)
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
    if (query.id) {
      this.props.viewUser(query)
    }
  };

  componentWillMount() {
    if (this.props.location.search) {
      this.handlLoadData(this.props.location.query)
    }
  };

  componentWillReceiveProps(nextProps) {

    for (let p = 0; p <= this.state.permissions.length - 1; p++) {
      if (nextProps.entity.permissions.includes(this.state.permissions[p].value)) {
        this.state.permissions[p].selected = true;
      } else {
        this.state.permissions[p].selected = false;
      }
    }

    this.setState({
      entity: nextProps.entity
    })
  }

  handlePermissionTap = (data, e) => {
    let permissions = this.state.permissions
    let entity = this.state.entity
    let entity_permission = []
    for (let i in permissions) {
      if (permissions[i].value == data.value) {
        if (permissions[i].selected) {
          permissions[i].selected = false
        } else {
          permissions[i].selected = true
        }
        break;
      }
    }

    for (let p of permissions) {
      if (p.selected) {
        entity_permission.push(p.value)
      }
    }

    entity.permissions = entity_permission

    this.setState({
      entity: entity,
      permissions: permissions
    })
  }

  renderChip(data) {
    return (
      <SelectableChip key={ data.value }
        label={ data.label }
        value={ data.value }
        selected={ data.selected }
        handleTouchTap={ this.handlePermissionTap.bind(null, data) }></SelectableChip>
      );
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
          <TextField name="username"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.username }
            fullWidth={ true }
            floatingLabelText="Username" />
          <br />
          <TextField name="password"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.password }
            fullWidth={ true }
            floatingLabelText="Password" />
          <br />
          <TextField name="repeatPassword"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.repeatPassword }
            fullWidth={ true }
            floatingLabelText="Repeat Password" />
          <br />
          <TextField name="remark"
            onChange={ this.handleTextFieldChange }
            value={ this.state.entity.remark }
            floatingLabelText="Remarks"
            multiLine={ true }
            fullWidth={ true }
            rows={ 4 } />
          <br />
          <div>
            <div style={ labelStyle }>
              Permissions
            </div>
            <div style={ chipWrapperStyle }>
              { this.state.permissions.map(this.renderChip, this) }
            </div>
          </div>
          <br />
          <br />
          <Divider />
          <br />
          <Checkbox name="isEnable"
            onCheck={ this.handleCheckboxChange }
            label="enabled"
            checked={ this.state.entity.isEnable } />
          <br />
          <br />
          <div className="controller">
            <RaisedButton label="Submit" primary={ true } onTouchTap={ this.handleSubmitForm } />
          </div>
        </Paper>
      </div>
      );
  }
}


UsersCreateApp.propTypes = {
  entity: PropTypes.object
}



function mapStateToProps(state, ownProps) {
  let {detailViewReducer} = state
  return {
    entity: detailViewReducer.entity
  }
}

export default connect(mapStateToProps, {
  createUser,
  viewUser
})(UsersCreateApp)
