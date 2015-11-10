'use strict';

import React from 'react';
import Reflux from 'reflux';
import FeedStore from '../../stores/knettFeed';
import Actions from '../../actions/mainActions';
import Loader from '../components/loader';
import Service from '../../services/mainService';
import {Input, Button} from 'react-bootstrap';
import KnettFeed from '../components/knett-feed';
import KnettPhoneList from '../components/knett-phone-list';

export default React.createClass({

    displayName: 'app/pages/knett-feed/index.js',

    mixins: [
        Reflux.listenTo(FeedStore, 'onFeedStoreUpdated')
    ],

    getInitialState(){
        return {
            serverResult: [],
            cookieName: 'JSESSIONID_WEBIKBWEBAPP',
            cookieValue: ''
        };
    },

    onFeedStoreUpdated(payload){
        let _state = this.state;
        _state.serverResult = JSON.parse(payload.text).objects;
        this.setState(_state)
    },

    getKnettFeed(){
        this.setState({
            serverResult: [],
            requestType: 'feed'
        });
        const cookieName = this.state.cookieName;
        const cookieValue = this.state.cookieValue;
        const body = {'cookie': cookieName + '=' + cookieValue};

        Actions.GetKnettFeedWithCookie(body, 'feedUrl');
    },

    getPhoneList(){
        this.setState({
            serverResult: [],
            requestType: 'phone'
        });
        const cookieName = this.state.cookieName;
        const cookieValue = this.state.cookieValue;
        const body = {'cookie': cookieName + '=' + cookieValue};

        Actions.GetKnettFeedWithCookie(body, 'phoneListUrl');
    },

    handleCookieNameChange() {
        this.setState({
            cookieName: this.refs.cookie_name.getValue()
        });
    },

    handleCookieValueChange() {
        this.setState({
            cookieValue: this.refs.cookie_value.getValue()
        });
    },

    disableButton(){
        return '' === this.state.cookieName || '' === this.state.cookieValue;
    },

    render() {
        return (
            <div>
                <h3>Login for å lese Feed eller telefonliste fra https://knett.evita.no</h3>

                <p>Tjenesten er hostet på en gratis Heroku-instans, så den kan være i dvale når du tester, og trenger da
                    noen sekunder på å starte opp igjen</p>
                <Input
                    type="text"
                    value={this.state.cookieName}
                    placeholder="Cookie-navn"
                    label="Cookie-navn"
                    help="Cookie-navn for knett.evita.no er JSESSIONID_WEBIKBWEBAPP"
                    hasFeedback
                    ref="cookie_name"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleCookieNameChange}/>

                <Input
                    type="text"
                    value={this.state.cookieValue}
                    placeholder="Cookie-verdi"
                    label="Cookie-verdi"
                    help="Du kan finne Cookie'en ved å bruke dev-tools, Chrome under Resources. Se etter en Cookie fra knett.evita.no; JSESSIONID_WEBIKBWEBAPP"
                    hasFeedback
                    ref="cookie_value"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleCookieValueChange}/>

                <Button disabled={this.disableButton()} bsStyle="primary" onClick={this.getKnettFeed}>Hent
                    nyhetsfeed</Button>

                <span>&nbsp;</span>

                <Button disabled={this.disableButton()} bsStyle="primary" onClick={this.getPhoneList}>Hent
                    telefonliste</Button>


                <div className="knett-result">
                    {(this.state.requestType === 'feed') ? <KnettFeed feed={this.state.serverResult}/> :
                        <KnettPhoneList list={this.state.serverResult}/>}
                </div>

            </div>
        )
    }
});