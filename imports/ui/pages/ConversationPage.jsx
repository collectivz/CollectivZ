import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import ConversationPageHeader from '../components/ConversationPageHeader.jsx';
import Loader from '../components/Loader.jsx';
import MessageItem from '../components/chat/MessageItem.jsx';
import ConversationInput from '../components/ConversationInput.jsx';

import './ConversationPage.css';

export default class ConversationPage extends React.Component {
  render() {
    const {
      loading,
      channel,
      messages,
      user
    } = this.props;

    return (
      <div>
      {loading ?
        <Loader />
        : <div>
            <ConversationPageHeader channel={channel}/>
            <div className="pane">
              <div ref='scroll' className="scroll-content has-chanbar has-tabs has-footer chat">

                <div className="scroll">
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
      }
      </div>
    );
  }
}

ConversationPage.propTypes = {
  channel: PropTypes.object,
};
