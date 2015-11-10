'use strict';

//more info here: https://developers.google.com/identity/sign-in/web/

import React from 'react';
import Linkify from 'react-linkify';

export default React.createClass({

    displayName: 'app/pages/google-login/index.js',

    getInitialState(){
        return {
            gapiSignedIn: false,
            gapiId: '',
            gapiName: '',
            gapiImageUrl: '',
            gapiEmail: ''
        }
    },

    componentDidMount() {
        if ('undefined' !== typeof gapi) {
            gapi.signin2.render(this.refs.g_sign_in.getDOMNode(), {
                scope: 'profile email',
                'width': 200,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.onSignIn
            });
        }
    },

    onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        const gapiId = profile.getId(); // READ!!! https://developers.google.com/identity/sign-in/web/backend-auth
        const id_token = googleUser.getAuthResponse().id_token;
        const gapiName = profile.getName();
        const gapiImageUrl = profile.getImageUrl();
        const gapiEmail = profile.getEmail();
        this.setState(
            {
                gapiSignedIn: true,
                gapiId: gapiId,
                gapiName: gapiName,
                gapiImageUrl: gapiImageUrl,
                gapiEmail: gapiEmail
            }
        )
    },

    onSignOut(){
        let _this = this;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {

            _this.setState(
                {
                    gapiSignedIn: false,
                    gapiId: '',
                    gapiName: '',
                    gapiImageUrl: '',
                    gapiEmail: ''
                }
            )
        });
    },

    renderProfileDetails(){
        if (this.state.gapiSignedIn) {
            return (
                <Linkify>
                    <div className="profile-card">

                        <img src={this.state.gapiImageUrl} alt={this.state.gapiName}/>

                    <span className="p-col">

                      <span className="p-row">
                        <span className="p-head">Id</span>
                        <span className="p-detail">{this.state.gapiId}</span>
                      </span>

                      <span className="p-row">
                        <span className="p-head">Navn</span>
                        <span className="p-detail">{this.state.gapiName}</span>
                      </span>

                      <span className="p-row">
                        <span className="p-head">Epost</span>
                        <span className="p-detail">{this.state.gapiEmail}</span>
                      </span>

                      <span className="p-row">
                        <span className="p-head"></span>
                        <span className="p-detail"><a
                            href='#' onClick={this.onSignOut}>Logg ut</a></span>
                      </span>

                    </span>

                    </div>
                </Linkify>
            )
        } else {
            return <span></span>
        }
    },

    render() {
        return (
            <div className="google-sign-in-container">

                <div className="google-sign-in-btn" ref="g_sign_in" data-onsuccess={this.onSignIn}/>

                <div className="google-sign-in-details">
                    {this.renderProfileDetails()}
                </div>
            </div>
        )
    }
});