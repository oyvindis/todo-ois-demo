'use strict';

import React from 'react';
import {State} from 'react-router';
import Reflux from 'reflux';
import {Modal, Button, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Actions from '../../actions/mainActions.js';
import commentStore from '../../stores/commentStore';

export default React.createClass({
  mixins: [Reflux.connect(commentStore, "commentData")],

    propTypes: {
        item:  React.PropTypes.any.isRequired,
        params: React.PropTypes.object
    },

  getInitialState: function() {
    return { 
      commentData: commentStore.getDefaultData(),
      showModal: false,
    };
  },
  componentDidMount: function () {
        const todoId = this.props.item.id;
        Actions.watchComments(todoId);
    },
  componentWillReceiveProps: function(nextProps) {
    alert('her');
        const oldPostId = this.props.item.id;
        const newPostId = nextProps.item.id;
        alert(oldPostId + ' ' + newPostId);
        Actions.stopWatchingPost(oldPostId);
        Actions.watchPost(newPostId);
        
    },
  componentWillUnmount: function () {    
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


  handleValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) {
            Actions.AddItemDescription(text, this.props.item.id);
            evt.target.value = '';
        } else if (evt.which === 27) {
            evt.target.value = '';
        }   
  },
  handleCommentValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) {
            Actions.AddItemComment(text, this.props.item.id);
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

        <a onClick={this.open}>{this.props.item.label}</a>


        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.item.label} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>
            <input id="todoDescription" placeholder="Legg til / endre beskrivelse..." autoFocus onKeyUp={this.handleValueChange}/> 
            <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger>
            <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger>
            </p>
            <hr />
            <p>{this.props.item.description} {this.props.item.id}</p>

            <hr />

            <input id="todoComment" placeholder="Legg til kommentar..." autoFocus onKeyUp={this.handleCommentValueChange}/>

            <hr />

            <p>
                <ul className="todoList">
                    {filteredList.comments.map(function(item){
                        return {item}
                    })} 
                </ul>
            </p>

         </Modal.Body>

        </Modal>
      </div>
    );
  }
});
