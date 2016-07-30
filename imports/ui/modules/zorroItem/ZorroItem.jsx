import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './ZorroItem.css';

export default class ZorroItem extends Component {

  isMine () {
    if (this.props.msg.author === 'self') {
      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  userAvatar() {
    if (this.props.msg.author === 'self') {
      const user = Meteor.user();
      return user.profile.avatar;
    } else {
      return '/img/zorro.jpg'
    }
  }

  getName() {
    if (this.props.msg.author === 'self') {
      const user = Meteor.user();
      return user.username;
    } else {
      return 'Zorro';
    }
  }

  render() {
    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">{this.getName()}</span>
          </div>
          <div className="text">
            {this.props.msg.text}
          </div>
          <span className="picture">
            <img src={this.userAvatar(this.props.msg.author)} alt="" />
          </span>
        </div>
      </div>
    );
  }
}

ZorroItem.propTypes = {
  msg: PropTypes.object.isRequired,
}
