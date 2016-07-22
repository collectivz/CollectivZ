import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './Chat.css';

export default class Chat extends Component {
  // renderChannels() {
  //   return this.props.channels.map((channel) => (
  //     <Channel key={channel._id} channel={channel} />
  //   ));
  // }

  render() {
    return (
      <div>
        <div className="view-container">
          <div className="top-nav">
            <div className="title">
              <h2>{this.props.params.id}</h2>
            </div>
          </div>
        </div>
        <div className="pane">
          <div className="scroll-content has-chanbar has-tabs has-footer chat ">
            <div className="scroll">
              <div className="message-list">
                <div className="message-wrapper">
                  <div className="message message-mine">
                    <div className="message-header">
                      <span className="message-user">Cfe-cgc</span>
                      <span className="message-timestamp">hier</span>
                    </div>
                    <div className="text">
                      Salut Zorro, comment ça va aujourd'hui ?
                    </div>
                    <span className="picture">
                      <img src="/img/cfecgc.png" alt="" />
                    </span>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
          <div className="bar-stable bar bar-footer has-tabs item-input-inset">
            <button type="button" name="button">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            <label className="item-input-wrapper">
              <input type="text" name="name" defaultValue="hello"/>
            </label>
            <button type="button" name="button">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
