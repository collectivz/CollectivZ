import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

import ActionList from './ActionList.jsx';

import './ChannelItem.css';

export default class ChannelItem extends React.Component {
  render() {
    const {
      channel
    } = this.props;

    return (
      <div className="item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={`/group/${channel._id}`}>
          <img src="/img/zorro.jpg" alt="" />
          <h2>{channel.name}</h2>
          <div>
            {channel.lastMessage ?
              channel.lastMessage.author ?
                `${channel.lastMessage.author} : ${channel.lastMessage.text}`
                : `${channel.lastMessage.text}`
              : ''
            }
          </div>
          {channel.connections ?
            <ActionList actions={channel.connections} />
            : ''
          }
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
