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
  mixins: [Reflux.connect(todoListStore,"todoData"), Reflux.connect(commentStore, "commentData")],

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
        const {todoId} = this.props.params
        Actions.watchComments(todoId);
    },
  componentWillReceiveProps: function(nextProps) {
        const oldTodoId = this.props.params.todoId;
        const newTodoId = nextProps.params.todoId;
        Actions.stopWatchingComments(oldTodoId);
        Actions.watchComments(newTodoId);
    },
  componentWillUnmount: function () {
    alert('componentWillUnmount');
        const todoId = this.props.item.id;
        Actions.stopWatchingComments(todoId);
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
    if (this.state.enableDisableDescription == 'disabled') {
      this.setState({enableDisableDescription: ''});
    } else  {
      this.setState({enableDisableDescription: 'disabled'})
    }
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


  render: function() {
    let popover = <Popover title="popover">very</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;
    var filteredList = this.state.commentData;
    
    return (
      <div>
        {filteredList.todo.label}

        <hr />

       <Row>
          <Col sm={10}>
          <input ref="description" id="todoDescription" placeholder={filteredList.todo.description} autoFocus onKeyUp={this.handleValueChange} disabled={this.state.enableDisableDescription} />
          </Col>
          <Col sm={2}>
          <Button className="pull-right" onClick={this.enableDisableDescription}><Glyphicon glyph="pencil" /></Button>
          </Col>
       </Row>
        <Row>
        <Col sm={12}>
        <ul className="commentList">
          {filteredList.comments.map(function(comment){
            let commentTime = Moment(comment.created).fromNow();
            return <li className="commentItem"> {comment.label} {commentTime} </li>
          })}
        </ul>
        </Col>
        </Row>
        <hr />

        <input id="todoComment" placeholder="Legg til kommentar..." autoFocus onKeyUp={this.handleCommentValueChange}/>

      </div>
    );
  }
});
