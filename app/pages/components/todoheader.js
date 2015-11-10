'use strict';

import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import TodoActions from '../../actions/mainActions.js';

export default React.createClass({    

    handleValueChange: function(evt) {

        var text = evt.target.value;
        if (evt.which === 13 && text) {
            TodoActions.AddItem(text);
            evt.target.value = '';
        } else if (evt.which === 27) {
            evt.target.value = '';
        }
        
    },
    propTypes: {
        list: React.PropTypes.any.isRequired,
    },
       
    render: function() {
        var filteredList = this.props.list;
        return (
            <div>

                <h1>Todo</h1>
                <input id="new-todo" placeholder="Legg til element..." autoFocus onKeyUp={this.handleValueChange}/>

            </div>            
        );
    }
});