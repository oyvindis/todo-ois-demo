'use strict';

import Reflux from 'reflux';
import Firebase from 'Firebase';
import ReactFireMixin from 'reactfire';
import {AddItem, AddItemDescription, ConfirmTodo} from '../actions/mainActions.js';


// some variables and helpers for our fake database stuff
var todoCounter = 0,
    localStorageKey = "todos";

function getItemByKey(list,itemKey){
    return _.find(list, function(item) {
        return item.key === itemKey;
    });
}

let todoListener;
let commentListener;

const ref = new Firebase("https://todo-ois.firebaseio.com");
const todoRef = ref.child('todos');

let data = {
    todos: []
}

export default Reflux.createStore({
    mixins: [ReactFireMixin],
    init() {
        todoListener = todoRef
            .on('value', this.updateTodo.bind(this));

        this.listenTo(AddItem, this.onAddItem.bind(this));
        this.listenTo(AddItemDescription, this.onAddItemDescription.bind(this));
        this.listenTo(ConfirmTodo, this.onConfirmTodo.bind(this));
    },

    updateTodo: function(todoDataObj){
        let newTodos = [];
        todoDataObj.forEach(todoData => {

            let todo = todoData.val();
            todo.id = todoData.key();
            newTodos.unshift(todo);
        });

        data.todos = newTodos;
        this.trigger(data);
    },        
      
    onEditItem: function(itemKey, newLabel) {
        var foundItem = getItemByKey(this.list,itemKey);
        if (!foundItem) {
            return;
        }
        foundItem.label = newLabel;
        this.updateList(this.list);
    },
    onAddItemDescription: function(label, todoKey) {
        todoRef.child(todoKey).update({description: label});
    }, 
    
    onAddItemComment: function(label, todoKey) {
        if ('' !== label && ''!== todoKey) {
            var comment = {
                todoKey: todoKey,
                label: label
            }
            commentRef.push(domment, function() {});
        }
    },        
    onAddItem: function(label) {

        
        if ('' !== label) {
            var todo = {
                key: todoCounter++,
                created: new Date().toString(),
                isComplete: false,
                label: label
            }
            //this.updateList(todo);
            todoRef.push(todo, function() {});
        }

    },
    onConfirmTodo: function(itemKey, isComplete) {
        if (!isComplete) {
            todoRef.child(itemKey).update({isComplete: true});
        }
        else {
            todoRef.child(itemKey).update({isComplete: false});
        }

    },
    deleteTodo: function(todoKey) {
        todoRef.child(todoKey).remove();
    },

    getDefaultData: function() {
        return data;
    }
});