'use strict';

import React from 'react';
import {State, Link} from 'react-router';
import Reflux from 'reflux';
import {Jumbotron, Modal, Button, Input, Glyphicon} from 'react-bootstrap';
import todoListStore from '../../stores/store';
import commentStore from '../../stores/commentStore';
import TodoModal from './TodoModal';
import TodoItem from './TodoItem';
//import TodoActions from '../../actions/mainActions.js';

export default React.createClass({
    mixins: [State, Reflux.connect(todoListStore,"todoData")],
    propTypes: {
        //list: React.PropTypes.any.isRequired,
        list: React.PropTypes.arrayOf(React.PropTypes.arrayOf).isRequired,
        testprop: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },
    getInitialState: function() {
        return {
            todoData: todoListStore.getDefaultData(),
            commentData: commentStore.getDefaultData(),
            showModal: false,
        };
    },

    close: function() {
        this.setState({ showModal: false });
    },

  
    
    render: function() {
        var _ = require('lodash');   
        var pathname  = location.pathname;
        //var filteredList = this.state.todoData.todos;
        var filteredList = _.filter(this.state.todoData.todos,function(item){ return !item.isComplete; });
        var completedTodos = _.filter(this.state.todoData.todos,function(item){ return item.isComplete; });
        var testprop = this.props.route;
        return (
            <div>
                <ul className="todoList">

                    {filteredList.map(function(item, i){
                        //return <li className="todoItem"> <TodoModal item={item} /></li>
                        let url = '#/todo/'+ item.id;
                        return <TodoItem item={item} />
                    })}

                </ul>

                <hr />

                <ul className="completedTodoList">

                    {completedTodos.map(function(item, i){
                        //return <li className="todoItem"> <TodoModal item={item} /></li>
                        let url = '#/todo/'+ item.id;
                        return <TodoItem item={item} />
                    })}                    
                </ul>                            
            </div>            
            
        );
        
    }
});