'use strict';

import Reflux from 'reflux';
import {GetUserName} from '../actions/mainActions.js';
import Service from '../services/mainService.js';

export default Reflux.createStore({

    init() {
        this.listenTo(GetUserName, this.onGetUserName);
    },

    onGetUserName() {
        const url = 'http://apigram.herokuapp.com/artifex/new';
        new Service()
            .getRequest(url)
            .then((payload) => {
                let userName = payload.body;
                this.trigger(userName)
            })
    }
});
