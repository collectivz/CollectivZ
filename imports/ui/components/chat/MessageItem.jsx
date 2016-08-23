import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './MessageItem.css';

export default class MessageItem extends Component {

  constructor(props) {
    super(props);

    this.isMine = this.isMine.bind(this);
  }

  isMine () {
    const {
      message
    } = this.props;

    if (Meteor.userId() === message.author) {
      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  userAvatar(userId) {
    let user;
    if (userId === Meteor.userId) {
      user = Meteor.user();
    } else {
      user = Meteor.users.findOne(userId);
    }
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/no-user.png'
    }

  }

  render() {
    const {
      message,
      user,
    } = this.props;

    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">
              { message.type
                ? 'Zorro'
                : Meteor.users.findOne(message.author).username }
            </span>
          </div>
          <div className="text">
            <p>{message.text}</p>
          </div>
          <span className="picture">
            <img src={this.userAvatar(message.author)} alt="" />
          </span>
        </div>
      </div>
    );
  }
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
}
