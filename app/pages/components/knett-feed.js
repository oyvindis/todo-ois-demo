'use strict';

import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default React.createClass({

    displayName: 'app/pages/components/knett-feed.js',

    getDefaultProps(){
        return ({
            feed: []
        })
    },

    renderTypeImg(itm){
        if (itm) {
            switch (itm.type) {
                case 'BIRTHDAY':
                    return <Glyphicon glyph="glyphicon glyphicon-glass"/>;
                    break;
                case 'CHECKIN':
                    return <Glyphicon glyph="glyphicon glyphicon-map-marker"/>;
                    break;
                default:
                    return <span>xxx</span>;
            }
        } else {
            return <span></span>
        }
    },

    renderFeedItem(itm, idx){
        const glyph = <Glyphicon glyph="glyphicon glyphicon-thumbs-up"/>;
        return (
            <li key={idx}>
                <div className="news-card">
                    <div className="img"><img src={'https://knett.evita.no' + itm.personImageUrl} alt=""/></div>
                    <div className="details">
                        <div className="type">{this.renderTypeImg(itm)}</div>
                        <div
                            className="content">{itm.type === 'CHECKIN' ? itm.owner + ' ' + itm.content : itm.content}</div>
                        <div className="dateFormatted">{itm.dateFormatted}</div>
                        <div className="likes">
                            <span>{itm.hasLike ? itm.total : null}</span>
                            &nbsp;
                            <span>{itm.hasLike ? glyph : null}</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    },

    render() {
        return (
            <div className="knett-result">
                <ul>{this.props.feed.map(this.renderFeedItem)}</ul>
            </div>
        )
    }
});