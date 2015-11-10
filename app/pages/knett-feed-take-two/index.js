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

    displayName: 'app/pages/knett-feed-take-two/index.js',

    mixins: [
        Reflux.listenTo(FeedStore, 'onFeedStoreUpdated')
    ],

    getInitialState(){
        return {
            serverResult: [],
            requestType: 'feed',
            userName: '',
            password: ''
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
        const userName = this.state.userName;
        const password = this.state.password;
        const body = {'userName': userName, 'password': password};

        Actions.GetKnettFeedWithBasicAuth(body, 'feedUrl');
    },

    getPhoneList(){
        this.setState({
            serverResult: [],
            requestType: 'phone'
        });
        const userName = this.state.userName;
        const password = this.state.password;
        const body = {'userName': userName, 'password': password};

        Actions.GetKnettFeedWithBasicAuth(body, 'phoneListUrl');
    },

    handleUserNameChange() {
        this.setState({
            userName: this.refs.user_name.getValue()
        });
    },

    handlePasswordChange() {
        this.setState({
            password: this.refs.password.getValue()
        });
    },

    disableButton(){
        return '' === this.state.userName || '' === this.state.password;
    },

    render() {
        return (
            <div>


                <h3>Login for å lese Feed eller telefonliste fra https://knett.evita.no</h3>

                <p>Tjenesten er hostet på en gratis Heroku-instans, så den kan være i dvale når du tester, og trenger da
                    noen sekunder på å starte opp igjen</p>
                <Input
                    className="user-name"
                    type="text"
                    value={this.state.userName}
                    placeholder="Brukernavn"
                    label="Brukernavn"
                    help="Skriv inn brukernavn"
                    hasFeedback
                    ref="user_name"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleUserNameChange}/>

                <Input
                    type="password"
                    value={this.state.password}
                    placeholder="Passord"
                    label="Passord"
                    help="Skriv inn passord"
                    hasFeedback
                    ref="password"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handlePasswordChange}/>

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