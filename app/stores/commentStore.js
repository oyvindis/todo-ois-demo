'use strict';

import Reflux from 'reflux';
import Firebase from 'Firebase';
import ReactFireMixin from 'reactfire';
import {AddItemComment, watchComments} from '../actions/mainActions.js';

var todoCounter = 0,
    localStorageKey = "todos";

function getItemByKey(list,itemKey){
    return _.find(list, function(item) {
        return item.key === itemKey;
    });
}

let commentListener;

const ref = new Firebase("https://todo-ois.firebaseio.com");
const todoRef = ref.child('todos');
const commentRef = ref.child('comments');

let data = {
    todo: {},
    comments: []
};

export default Reflux.createStore({
    mixins: [ReactFireMixin],    
    init() {
        commentListener = commentRef        
            .on('value', this.updateComment.bind(this));
        this.listenTo(AddItemComment, this.onAddItemComment.bind(this));
        this.listenTo(watchComments, this.watchComments.bind(this));
    },

    watchComments: function(todoKey) {
        todoRef
            .child(todoKey)
            .on('value', this.updateTodo.bind(this));
        commentRef
            .orderByChild('todoKey')
            .equalTo(todoKey)        
            .on('value', this.updateComment.bind(this));
    },
    stopWatchingComments: function (todoKey) {
        todoRef.child(todoKey).off();
        commentRef.orderByChild('todoKey').equalTo(todoKey).off();
    },
    updateTodo: function(todoDataObj){
        let todo = todoDataObj.val();
        data.todo = todo;
        this.trigger(data);
    },
    updateComment: function(commentDataObj){    
        let newComments = [];
        commentDataObj.forEach(commentData => {
            let comment = commentData.val();
            comment.id = commentData.key();
            newComments.unshift(comment);
        });
        data.comments = newComments;
        this.trigger(data);
    },    
    onAddItemComment: function(label, todoKey) {
        if ('' !== label && ''!== todoKey) {
            var comment = {
                todoKey: todoKey,
                created: new Date().toString(),
                label: label
            }
            commentRef.push(comment, function() {});
        }
    },        
    onRemoveItem: function(itemKey) {
        this.updateList(_.filter(this.list,function(item){
            return item.key!==itemKey;
        }));
    },
    onToggleItem: function(itemKey) {
        var foundItem = getItemByKey(this.list,itemKey);
        if (foundItem) {
            foundItem.isComplete = !foundItem.isComplete;
            this.updateList(this.list);
        }
    },
    onToggleAllItems: function(checked) {
        this.updateList(_.map(this.list, function(item) {
            item.isComplete = checked;
            return item;
        }));
    },
    onClearCompleted: function() {
        this.updateList(_.filter(this.list, function(item) {
            return !item.isComplete;
        }));
    },
    updateList: function(list){
        localStorage.setItem(localStorageKey, JSON.stringify(list));
        this.list = list;
        this.trigger(list);
    },
    getDefaultData: function() {
        return data;
    }
});