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
    const { data } = this.props;
    let dest = '';

    if (data.type === 'conversation') {
      dest = `/conversation/${data._id}`;
    } else {
      dest = `/group/${data._id}`;
    }

    setTimeout( () => {
      browserHistory.push(dest);
      Meteor.call('users.updateLastRead', data._id);
    }, 350 );

  }

  renderLastMessage(message) {
    if (message.length > 70) {
      return message.slice(0, 69) + '...';
    }
    return message;
  }

  render() {

    const { data, renderUnread, count } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={this.onClick}>
        <img src={data.imageUrl} alt="" />
        <div className="list-item-content">
          <p className="title">{data.name}</p>
          <p className="text">
            {data.lastMessage ?
              data.lastMessage.author ?
                `${data.lastMessage.author} : ${this.renderLastMessage(data.lastMessage.text)}`
                : `${this.renderLastMessage(data.lastMessage.text)}`
              : ''
            }
          </p>
          {data.connections ?
            <ActionList actions={data.connections} />
            : ''
          }
          {
            renderUnread && count ?
              <div className="list-item-notif">{count}</div>
              : ''
          }
        </div>
      </TouchEvent>
    );
  }
}

// ChannelItem.propTypes = {
//   data: PropTypes.object.isRequired,
// };
