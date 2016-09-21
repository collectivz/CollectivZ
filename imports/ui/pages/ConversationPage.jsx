import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Breadcrumb from '../components/Breadcrumb.jsx';
import Loader from '../components/Loader.jsx';
import MessageList from '../components/chat/MessageList.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';

export default class ConversationPage extends React.Component {

  render() {

    const { loading, channel, messages, user } = this.props;

    return (
      loading ?
        <Loader />
      :
        <div>
          <Breadcrumb title="Conversation" hasBack={true} />
          <div className="chat-sub-container">
            <div ref='scroll'>
              <div className="chat">
                <div className="message-list">
                  <MessageList messages={messages}/>
                </div>
              </div>
            </div>
          </div>
          <MessageInput hasActionPicker={false} channelId={channel._id}/>
        </div>
    );
  }
}

ConversationPage.propTypes = {
  channel: PropTypes.object,
};
