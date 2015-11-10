'use strict';

import React from 'react';
import Reflux from 'reflux';
import MainStore from '../../stores/username';
import Actions from '../../actions/mainActions';
import Loader from '../components/loader';
import Service from '../../services/mainService';
import {Button, Jumbotron} from 'react-bootstrap';

let Page = React.createClass({

    displayName: 'app/pages/simple-get/index.js',

    mixins: [
        Reflux.listenTo(MainStore, 'onMainStoreUpdated')
    ],

    getInitialState(){
        return {
            userName: ''
        };
    },

    componentWillMount(){
        this.getNewUserName();
    },

    onMainStoreUpdated(payload){
        let _state = this.state;
        _state.userName = payload.data;
        this.setState(_state)
    },

    getNewUserName(){
        Actions.GetUserName();
    },

    renderContent(){
        if ('' === this.state.userName) {
            return (
                <Loader/>
            )
        } else {
            return (
                <span>

                <Jumbotron className="jumbo-name"><h2>{this.state.userName}</h2></Jumbotron>
                        <h3>Eksempel på en enkel «GET-request» fra <a href="http://apigram.herokuapp.com/artifex/new"
                                                                      target="_blank">apigram.herokuapp.com/artifex/new</a>
                        </h3>
                        <h5>Denne tjenesten oppretter brukernavn basert på en liste med adjektiver og substantiver.</h5>
                        <p>Tjenesten er hostet på en gratis Heroku-instans, så den kan være i dvale når du tester, og
                            trenger da noen sekunder på å starte opp igjen</p>

                        <h3>
                            <Button bsStyle="primary"
                                    onClick={this.getNewUserName}>Hent nytt!
                            </Button>
                        </h3>
               </span>
            )
        }
    },

    render() {
        return (
            <span>{this.renderContent()}</span>
        )
    }
});

export default Page;