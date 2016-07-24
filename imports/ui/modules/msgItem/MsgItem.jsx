import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgItem.css';

export default class MsgItem extends Component {
  // renderChannels() {
  //   return this.props.channels.map((channel) => (
  //     <Channel key={channel._id} channel={channel} />
  //   ));
  // }

  render() {
    return (
      <div className="message-wrapper">
        <div className="message message-other">
          <div className="message-header">
            <span className="message-user">Zorro</span>
            <span className="message-timestamp">hier</span>
          </div>
          <div className="text">
            Très bien merci, et toi quoi de neuf ?
          </div>
          <span className="picture">
            <img src="/img/zorro.jpg" alt="" />
          </span>
        </div>
      </div>
    );
  }
}
