import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                                    from 'meteor/underscore';
import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

import ActionList                               from './ActionList.jsx';

export default class ChannelItem extends React.Component {

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  renderLastMessage(message) {
    if (message.length > 70) {
      return message.slice(0, 69) + '...';
    }
    return message;
  }

  render() {

    const { channel } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/group/${channel._id}`) } }>
          <img src="/img/zorro.jpg" alt="" />
          <div className="list-item-content">
              <p className="title">{channel.name}</p>
              <p className="text">
                {channel.lastMessage ?
                  channel.lastMessage.author ?
                    `${channel.lastMessage.author} : ${this.renderLastMessage(channel.lastMessage.text)}`
                    : `${this.renderLastMessage(channel.lastMessage.text)}`
                  : ''
                }
              </p>
              {channel.connections ?
                <ActionList actions={channel.connections} />
                : ''
              }
          </div>
          <i className="icon icon-3x icon-chevron-right"/>
      </TouchEvent>
    );
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
