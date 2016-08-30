import React from 'react';
import AppHeaderBar from '../components/header';
import SideList from '../components/sidebar';
import BaseReactComponent from '../components/base';


export default class MainApp extends BaseReactComponent {

    static propTypes = {
        children: React.PropTypes.node,
        location: React.PropTypes.object,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            navDrawerOpen: false,
        });
    };

    render() {
        const {
          location,
          children,
        } = this.props;

        return (
           <div>
               <AppHeaderBar appTitle="Microgate" />
               <div className="admin-body">
                   <div className="sidebar">
                       <SideList location={location} onChangeList={this.handleChangeList} />
                   </div>
                   <div className="mainbar">
                       {children}
                   </div>
               </div>
           </div>
       )
    }
}
