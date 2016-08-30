import React from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import GroupTextField from '../../components/groupTextField'
import BaseReactComponent from '../../components/base'
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

export default class ApiCreateApp extends BaseReactComponent {

    constructor(props){
        super(props);
        this.state = {
            headerItems: [],
            bodyItems: [],
            formData: {}
        };
    };

    handleAppendHeaderItem = (e) => {
        let headerItems = this.state.headerItems;
        headerItems.push({})
        this.setState({ headerItems: headerItems})
    };

    handleAppendBodyItem = (e) => {
        let bodyItems = this.state.bodyItems;
        bodyItems.push({});
        this.setState({ bodyItems: bodyItems})
    };

    handleSubmitForm = (e) => {
        let data = this.state.formData;
        console.log('data:', data)
        data.headerItems = this.state.headerItems;
        data.bodyItems = this.state.bodyItems;
        axios.post('/portal/rest/apis/create', data).then(function (response) {
             console.log(response);
        }).catch(function (error) {
             console.log(error);
        });

    };

    handleTextFieldChange = (event) => {
        this.
    }

    render() {
        return (
            <div className="formPaper">
                <Paper className="flatPaper">
                    <TextField
                        name="name"
                        onChange={this.handleTextFieldChange}
                        value={this.state.formData.method_name}
                        fullWidth={true}
                        floatingLabelText="API Method Name" />
                    <br />
                    <TextField
                        onChange={this.handleTextFieldChange}
                        value={this.state.formData.path}
                        fullWidth={true}
                        floatingLabelText="API Path" />
                    <br />
                    <TextField
                        onChange={this.handleTextFieldChange}
                        value={this.state.formData.timeout}
                        fullWidth={true}
                        floatingLabelText="Request Timeout" />
                    <br />
                    <TextField
                        onChange={this.handleTextFieldChange}
                        value={this.state.formData.remark}
                        floatingLabelText="API Remarks"
                        multiLine={true}
                        fullWidth={true}
                        rows={4} />
                    <br />
                    <GroupTextField
                        key="custom-header"
                        title="Custom Headers"
                        fieldsList={this.state.headerItems}
                        dataKeySource={HeaderKeyDataSource}
                        dataValSource={HeaderValDataSource}
                    />
                    <GroupTextField
                        key="custom-body"
                        title="Custom Body"
                        fieldsList={this.state.bodyItems}
                    />
                    <br />
                    <Checkbox label="Inner API" checked={this.state.formData.isInner} />
                    <br />
                    <Checkbox label="Verify Signature" checked={this.state.formData.isSign} />
                    <br />
                    <Divider />
                    <br />
                    <div className="controller">
                        <FlatButton
                          label="Add Header"
                          primary={true}
                          onTouchTap={this.handleAppendHeaderItem}
                        />
                        <FlatButton
                          label="Add Body"
                          primary={true}
                          onTouchTap={this.handleAppendBodyItem}
                        />
                        <RaisedButton
                          label="Submit"
                          primary={true}
                          onTouchTap={this.handleSubmitForm}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}
