import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgItem.css';
console.log(Meteor.userId());

export default class MsgItem extends Component {

  render() {
    return (
      <div className="message-wrapper">
        <div className={Meteor.userId() ? 'message message-mine' : 'message message-other'}>
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
