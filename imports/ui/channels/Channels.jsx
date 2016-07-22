import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels.js';
import Channel from '../channel/Channel.jsx';
import './Channels.css';

class ChannelsList extends Component {
  renderChannels() {
    return this.props.channels.map((channel) => (
      <Channel key={channel._id} channel={channel} />
    ));
  }

  render() {
    return (
      <div>
      <div className="view-container">
        <div className="top-nav">
          <div className="title">
            <h2>Chats</h2>
          </div>
        </div>
      </div>
      <div className="view-container">
        <div className="page-wrapper">
          <div className="scroll-content has-top-nav has-tabs-nav">
            <div className="disable-user-behavior">
              <div className="list">
                {this.renderChannels()}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

}

ChannelsList.propTypes = {
  channels: PropTypes.array.isRequired,
}

export default createContainer(() => {
  Meteor.subscribe('channels');

  console.log(Channels.find({}).fetch());
  return {
    channels: Channels.find({}).fetch(),
  };
}, ChannelsList);
