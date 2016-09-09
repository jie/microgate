import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import BaseReactComponent from '../../../components/base'
import Paginate from '../../../components/paginate'
import { connect } from 'react-redux'
import { viewAllApp } from '../../../actions'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ApplicationsApp extends BaseReactComponent {

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
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.entities,
      total: nextProps.total
    })
  }

  componentWillMount() {
    this.handlLoadData(this.props.location.query)
  };

  handlLoadData(query) {
    this.props.viewAllApp(query)
  };

  render() {
    let tabRows = [];
    for (let i in this.state.entities) {
      let item = this.state.entities[i]
      tabRows.push(
        <TableRow key={ i }>
          <TableRowColumn>
            <a href={ `/portal/admin/applications/create?id=${item.id}` }>
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

    let currentPage = this.getCurrentPage();
    console.log('currentpage: ', currentPage)
    let total = this.props.total;
    console.log('total:', total)
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
        <Paginate total={ this.props.total } page={ currentPage } perPage={ 20 } />
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
  viewAllApp
})(ApplicationsApp)
