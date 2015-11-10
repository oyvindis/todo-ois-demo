'use strict';

import React from 'react';
import {State} from 'react-router';
import Reflux from 'reflux';
import {Grid, Row, Col, Modal, Input, Button, Glyphicon, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Actions from '../../actions/mainActions.js';
import todoListStore from '../../stores/store';
import commentStore from '../../stores/commentStore';
import Moment from 'moment';

export default React.createClass({
  mixins: [State, Reflux.connect(todoListStore,"todoData"), Reflux.connect(commentStore, "commentData")],

    propTypes: {
        item:  React.PropTypes.any.isRequired,
        params: React.PropTypes.object
    },

  getInitialState: function() {

    return {
      commentData: commentStore.getDefaultData(),
      showModal: false,
      enableDisableDescription: 'disabled',
    };
  },
  componentWillMount: function() {
    Moment.locale('nb');
  },
  componentDidMount: function () {
  },
  componentWillReceiveProps: function(nextProps) {
    
    },
  componentWillUnmount: function () {

    },

  onUpdate: function (postData) {  
      const { comments } = postData;
        this.setState({
            commentData: comments
        });      
  },        

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  enableDisableDescription: function() {

  }, 

  handleValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) {
            Actions.AddItemDescription(text, this.props.params.todoId);
            evt.target.value = '';
            this.setState( {enableDisableDescription: 'disabled'} );
        } else if (evt.which === 27) {
            evt.target.value = '';
        }   
  },
  handleCommentValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) {
            Actions.AddItemComment(text, this.props.params.todoId);
            evt.target.value = '';
        } else if (evt.which === 27) {
            evt.target.value = '';
        }   
  },

  confirmTodo: function() {
        Actions.ConfirmTodo(this.props.item.id, this.props.item.isComplete);
  },

  render: function() {
    let popover = <Popover title="popover">very</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;
    var filteredList = this.state.commentData;
    let url = '#/todo/'+this.props.item.id;
    let buttonClass;
    if (this.props.item.isComplete) {
      buttonClass ='pull-right buttonConfirmed';
    } else { buttonClass ='pull-right'; }
    
    let todoTime = Moment(this.props.item.created).fromNow();
    
    return (
      <li className="todoItem">
          <Button className={buttonClass} onClick={this.confirmTodo}><Glyphicon glyph="ok-circle" /></Button>
          <div><a href={ url }>{this.props.item.label} (Lagt til {todoTime}) {this.state.showConfirmed}</a></div>
      </li>
    );
  }
});
