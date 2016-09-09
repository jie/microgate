import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import BaseReactComponent from '../../../components/base'
import Paginate from '../../../components/paginate'
import { viewAllApi } from '../../../actions'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';



class ApisListApp extends BaseReactComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    entities: React.PropTypes.array,
    total: React.PropTypes.number
  }
  static defaultProps = {
    entities: [],
    total: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      entities: props.entities,
      total: props.total
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
            <a href={ `/portal/admin/apis/create?name=${item.name}` }>
              { item.id }
            </a>
          </TableRowColumn>
          <TableRowColumn>
            { item.name }
          </TableRowColumn>
          <TableRowColumn>
            { item.path }
          </TableRowColumn>
          <TableRowColumn>
            { item.timeout }
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
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Path
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Timeout
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { tabRows }
            </TableBody>
          </Table>
        </Paper>
        <Paginate total={ this.props.total } page={ this.getCurrentPage() } perPage={ 20 } />
      </div>
      );
  }
}




function mapStateToProps(state, ownProps) {
  let {listViewReducer} = state
  return {
    entities: listViewReducer.entities,
    total: listViewReducer.total
  }
}

export default connect(mapStateToProps, {
  viewAllApi
})(ApisListApp)
