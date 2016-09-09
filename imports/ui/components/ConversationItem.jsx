import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                            from 'meteor/underscore';

import TouchEvent                       from './TouchEvent';
import classNames                       from 'classnames';

export default class ConversationItem extends React.Component {
 
  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }
  
  render() {
    const { channel } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/conversation/${channel._id}`) } }>
          <img src="/img/zorro.jpg" alt="" />
          <div className="list-item-content">
              <p className="title">{channel.name}</p>
              <p className="text">
                {channel.lastMessage ?
                  channel.lastMessage.author ?
                    `${channel.lastMessage.author} : ${channel.lastMessage.text}`
                    : `${channel.lastMessage.text}`
                  : ''
                }
              </p>
          </div>
          <i className="icon icon-3x icon-chevron-right"/>
      </TouchEvent>
    );
  }
}

ConversationItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
