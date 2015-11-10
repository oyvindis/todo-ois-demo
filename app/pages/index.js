'use strict';

import React from 'react';
import RouteHandler from 'react-router';
import Reflux from 'reflux';
import Menu from './menu';
import {Grid, Row, Col} from 'react-bootstrap';
import todoListStore from '../stores/store';
import TodoHeader from './components/todoheader';
import TodoMain from   './components/todomain';
import TodoModal from './components/TodoModal';

export default React.createClass({

    displayName: 'app/pages/index.js',
    propTypes: {
        params: React.PropTypes.object
    },    
    
    mixins: [Reflux.connect(todoListStore,"todoData")],

    getInitialState: function() {
        return {
            todoData: todoListStore.getDefaultData(),
        };
    },

    render() {
        const { pathname } = this.props.location
        const {children} = this.props;
        const {location} = this.props;
        var todoMain = this.props.children.content;
        var todoMainClone = React.cloneElement(todoMain, {list: this.state.todoData});
        return (
            <div className="main-content">
                <div className="top-menu">
                    <Menu location={location.pathname}/>
                </div>
                <div className="spacer loaderx"></div>

                <div className="sidebar">
                    
                </div>

                <div className="content-area">
                    
                    <TodoHeader list={this.state.todoData} />
                    
                    {children ? children.content : <span/>}
                </div>
                <div className="sidebar">
                    {children ? children.sidebar : <span/>}
                </div>

            </div>
        )
    }
});