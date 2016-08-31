import React from 'react';
import BaseReactComponent from './base';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class GroupTextField extends BaseReactComponent {

    static defaultProps = {
        title: 'form field title',
        fieldsList: [],
        dataKeySource: [],
        dataValSource: [],
        keyPrefix: 'group-textfield'

    };

    static propTypes = {
        title: React.PropTypes.string,
        keyPrefix: React.PropTypes.string,
        fieldsList: React.PropTypes.array,
        dataKeySource: React.PropTypes.array,
        dataValSource: React.PropTypes.array
    };

    constructor(props){
        super(props);
        this.state = {
            fieldsList: this.props.fieldsList,
        };
    };

    handleRemoveItem = (index, e) => {
        this.props.fieldsList.splice(index, 1)
        this.setState({fieldsList: this.props.fieldsList})
    };

    handleUpdateInput = (item, text) => {
        let textMap = {}
        if(item.type == 'key') {
            this.props.fieldsList[item.index].key = text
        } else {
            this.props.fieldsList[item.index].val = text
        }
        this.setState({fieldsList: this.props.fieldsList})
    };

    render() {
        let textFields = [];

        this.props.fieldsList.map((item, i) => {
            let key = `${this.props.keyPrefix}-${i}`;
            textFields.push(
                (
                    <div key={key} >
                        <AutoComplete
                          name="key"
                          hintText={item.keyLabel || 'key'}
                          filter={AutoComplete.fuzzyFilter}
                          dataSource={this.props.dataKeySource}
                          onUpdateInput={this.handleUpdateInput.bind(null, {"index": i, "type": "key"})}
                        />
                        <AutoComplete
                          name="val"
                          hintText={item.valLabel || 'val'}
                          filter={AutoComplete.fuzzyFilter}
                          dataSource={this.props.dataValSource}
                          onUpdateInput={this.handleUpdateInput.bind(null, {"index": i, "type": "val"})}
                        />
                        <IconButton onTouchTap={this.handleRemoveItem.bind(null, i)}><CloseIcon /></IconButton>
                    </div>
                )
            )
        });


        let title;
        if(this.state.fieldsList.length && this.props.title) {
            title = <h4 className="formItemTitle">{this.props.title}</h4>
        }
        return (
            <div>
                {title}
                {textFields}
            </div>
        )
    }
}
