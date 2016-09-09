import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import ConversationPageHeader from '../components/ConversationPageHeader.jsx';
import Loader from '../components/Loader.jsx';
import MessageItem from '../components/chat/MessageItem.jsx';
import ConversationInput from '../components/ConversationInput.jsx';

export default class ConversationPage extends React.Component {

  render() {
    
    const { loading, channel, messages, user } = this.props;

    return (
      <div>
        <ConversationPageHeader channel={channel}/>
        <div className="chat-sub-container">
          <div ref='scroll'>
            <div className="chat">
              <div className="message-list">
                {messages.map(message => {
                  return (<MessageItem message={message} user={user} key={message._id} />);
                })}
              </div>
            </div>
          </div>
        </div>
        <ConversationInput
          channelId={channel._id}
        />
      </div>
    );
  }
}

ConversationPage.propTypes = {
  channel: PropTypes.object,
};
