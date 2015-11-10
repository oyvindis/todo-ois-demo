'use strict';

import React from 'react';
import Linkify from 'react-linkify';
import {Glyphicon} from 'react-bootstrap';

export default React.createClass({

    displayName: 'app/pages/components/knett-phone-list.js',

    getDefaultProps(){
        return {
            list: []
        };
    },

    renderPhoneListImage(itm){
        if (itm) {
            let img = itm.image;
            img = img.replace('&lt;img border=&quot;0&quot; src=&quot;', '');
            let urlEnd = img.indexOf('.jpg');
            img = img.substring(0, urlEnd + 4);
            if ('' === img || urlEnd === -1) {
                return <Glyphicon glyph="glyphicon glyphicon-user" className="placeholder"/>
            } else {
                return <img src={img} width="100"/>
            }
        } else {
            return <span></span>
        }
    },

    renderPhoneListItem(itm, idx){

        return (
            <li key={idx}>
                <Linkify>
                    <div className="phone-card">
                        <div className="img">{this.renderPhoneListImage(itm)}</div>
                        <div className="details">
                            <div className="full-name">{itm.fullName}</div>
                            <div className="phone">{itm.mobilePhone}</div>
                            <div className="email">{itm.email}</div>
                            <div className="role">{itm.role}</div>
                            <div className="organization">{itm.organization}</div>
                            <div className="linkedin">{itm.linkedin}</div>
                        </div>
                    </div>
                </Linkify>
            </li>
        )
    },

    render() {
        return (
            <div className="knett-result">
                <ul>{this.props.list.map(this.renderPhoneListItem)}</ul>
            </div>
        )
    }
});