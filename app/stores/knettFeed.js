'use strict';

import Reflux from 'reflux';
import {GetKnettFeedWithCookie, GetKnettFeedWithBasicAuth} from '../actions/mainActions.js';
import Service from '../services/mainService.js';

export default Reflux.createStore({

    init() {
        this.listenTo(GetKnettFeedWithCookie, this.onGetKnettFeedWithCookie);
        this.listenTo(GetKnettFeedWithBasicAuth, this.onGetKnettFeedWithBasicAuth);
    },

    onGetKnettFeedWithCookie(cookie, page) {
        const url = 'https://knett-api.herokuapp.com/get/cookie/' + page;
        new Service()
            .postRequest(url, cookie)
            .then((response) => {
                let feed = response.body;
                this.trigger(feed)
            })
    },

    onGetKnettFeedWithBasicAuth(user, page) {
        const url = 'https://knett-api.herokuapp.com/get/basic/' + page;
        new Service()
            .postRequest(url, user)
            .then((response) => {
                let feed = response.body;
                this.trigger(feed)
            })
    }
});
