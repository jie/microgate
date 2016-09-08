import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import BaseReactComponent from '../../../components/base'
import { connect } from 'react-redux'
import { viewAllUser } from '../../../actions'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paginate from '../../../components/paginate'


class UsersApp extends BaseReactComponent {

  constructor(props) {
    super(props);
    this.state = {
      entities: []
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.entities
    })
  }

  componentWillMount() {
    this.handlLoadData(this.props.location.query)
  };

  handlLoadData(query) {
    this.props.viewAllUser(query)
  };

  displayPermissions(permissions) {
    return permissions.join(',')
  }

  render() {
    let tabRows = [];
    for (let i in this.state.entities) {
      let item = this.state.entities[i]
      tabRows.push(
        <TableRow key={ i }>
          <TableRowColumn>
            { item.name }
          </TableRowColumn>
          <TableRowColumn>
            { item.username }
          </TableRowColumn>
          <TableRowColumn>
            { this.displayPermissions(item.permissions) }
          </TableRowColumn>
          <TableRowColumn>
            { item.isEnable }
          </TableRowColumn>
          <TableRowColumn>
            <FlatButton label="View" primary={ true } href={ `/portal/admin/users/create?id=${item.id}` } />
          </TableRowColumn>
        </TableRow>
      )
    }
    return (
      <div className="formPaper">
        <Paper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Username
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Permissions
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Operation
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { tabRows }
            </TableBody>
          </Table>
        </Paper>
      </div>
      );
  }
}


function mapStateToProps(state, ownProps) {
  let {listViewReducer} = state
  return {
    entities: listViewReducer.entities
  }
}

export default connect(mapStateToProps, {
  viewAllUser
})(UsersApp)
