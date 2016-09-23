import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                                    from 'meteor/underscore';
import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

import ActionList                               from './ActionList.jsx';

export default class ChannelItem extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { channel } = this.props;
    let dest = '';

    if (channel.type === 'conversation') {
      dest = `/conversation/${channel._id}`;
    } else {
      dest = `/group/${channel._id}`;
    }

    setTimeout( () => {
      browserHistory.push(dest);
      Meteor.call('users.updateLastRead', channel._id);
    }, 350 );

  }

  renderLastMessage(message) {
    if (message.length > 70) {
      return message.slice(0, 69) + '...';
    }
    return message;
  }

  render() {

    const { channel, unreadCount } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={this.onClick}>
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
          {
            unreadCount ?
              <div className="list-item-notif">{unreadCount}</div>
              : ''
          }
        </div>
      </TouchEvent>
    );
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
