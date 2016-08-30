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
        keyPrefix: 'group-textfield',

    };

    static propTypes = {
        title: React.PropTypes.string,
        keyPrefix: React.PropTypes.string,
        fieldsList: React.PropTypes.array,
        dataKeySource: React.PropTypes.array,
        dataValSource: React.PropTypes.array,
        handleRemoveItem: React.PropTypes.func
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

    render() {
        let textFields = [];



        for(let i=0; i < this.props.fieldsList.length; i++) {
            let item = this.props.fieldsList[i];
            let key = `${this.props.keyPrefix}-${i}`;
            if(this.props.dataKeySource.length !=0 && this.props.dataValSource.length != 0) {
                textFields.push(
                    (
                        <div key={key} >
                            <AutoComplete
                              hintText={item.keyLabel || 'key'}
                              filter={AutoComplete.fuzzyFilter}
                              dataSource={this.props.dataKeySource}
                            />
                            <AutoComplete
                              hintText={item.valLabel || 'val'}
                              filter={AutoComplete.fuzzyFilter}
                              dataSource={this.props.dataValSource}
                            />
                            <IconButton onTouchTap={this.handleRemoveItem.bind(null, i)}><CloseIcon /></IconButton>
                        </div>
                    )
                )
            } else {
                textFields.push(
                    (
                        <div key={key} >
                            <TextField
                              hintText={item.keyLabel || 'key'}
                            />
                            <TextField
                              hintText={item.valLabel || 'val'}
                            />
                            <IconButton onTouchTap={this.handleRemoveItem.bind(null, i)}><CloseIcon /></IconButton>
                        </div>
                    )
                )
            }
        }

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
