'use strict';

import Reflux from 'reflux';

const actions = {
    GetUserName: Reflux.createAction('GetUserName'),
    GetKnettFeedWithCookie: Reflux.createAction('GetKnettFeedWithCookie'),
    GetKnettFeedWithBasicAuth: Reflux.createAction('GetKnettFeedWithBasicAuth'),
    AddItem: Reflux.createAction('AddItem'),
    AddItemDescription: Reflux.createAction('AddItemDescription'),
    AddItemComment: Reflux.createAction('AddItemComment'),
    ConfirmTodo: Reflux.createAction('ConfirmTodo'),
    watchComments: Reflux.createAction('watchComments'),
    stopWatchingComments: Reflux.createAction('stopWatchingComments'),
	deleteTodo: Reflux.createAction('deleteTodo')
    
};

export default actions;
