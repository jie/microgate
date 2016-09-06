import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import BaseReactComponent from '../../../components/base'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';



export default class ApplicationsApp extends BaseReactComponent {

  constructor(props) {
    super(props);
    this.state = {
      notifyBarState: false,
      notifyBarMessage: '',
      name: props.location.query.name,
      methodsMap: {}
    };
    let self = this;
    axios.get('/portal/rest/apis/query').then(function(response) {
      self.setState({
        'methodsMap': response.data.methodsMap
      })
    }).catch(function(error) {
      console.log('error', error);
      self.setState({
        notifyBarState: true,
        notifyBarMessage: error.message
      })
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  };

  render() {
    let tabRows = [];
    for (let i in this.state.methodsMap) {
      let item = this.state.methodsMap[i]
      tabRows.push(
        <TableRow key={ i }>
          <TableRowColumn>
            { i }
          </TableRowColumn>
          <TableRowColumn>
            { item.path }
          </TableRowColumn>
          <TableRowColumn>
            { item.timeout }
          </TableRowColumn>
          <TableRowColumn>
            <FlatButton label="View" primary={ true } href={ `/portal/admin/apis/create?name=${item.name || item.method_name}` } />
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
