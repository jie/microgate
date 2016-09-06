import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import BaseReactComponent from '../../../components/base'
import { viewAllApi } from '../../../actions'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';



class ApisListApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    entities: React.PropTypes.array
  }
  static defaultProps = {
    entities: []
  }

  constructor(props) {
    super(props);
    this.state = {
      entities: props.entities
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
    this.props.viewAllApi(query)
  };


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
            { item.path }
          </TableRowColumn>
          <TableRowColumn>
            { item.timeout }
          </TableRowColumn>
          <TableRowColumn>
            <FlatButton label="View" primary={ true } href={ `/portal/admin/apis/create?name=${item.name}` } />
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
                  Path
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Timeout
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
  viewAllApi
})(ApisListApp)