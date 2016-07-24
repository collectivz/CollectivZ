import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgItem.css';
console.log(Meteor.userId());

export default class MsgItem extends Component {

  isMine () {

    if (Meteor.userId() === this.props.msg.userId) {
      console.log(Meteor.userId() === this.props.msg._id);
      console.log('meteor:  ' + Meteor.userId());
      console.log(this.props.msg.userId);      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  render() {
    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">Zorro</span>
            <span className="message-timestamp">hier</span>
          </div>
          <div className="text">
            {this.props.msg.text}
          </div>
          <span className="picture">
            <img src="/img/zorro.jpg" alt="" />
          </span>
        </div>
      </div>
    );
  }
}

MsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
}
