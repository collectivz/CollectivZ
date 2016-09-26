import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Breadcrumb from '../components/Breadcrumb.jsx';
import Loader from '../components/Loader.jsx';
import MessageList from '../components/chat/MessageList.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';
import { Toast }         from '../helpers/Toast';

export default class ConversationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messageCount: this.props.messages.length
    };
  }

  componentDidUpdate() {
    const {
      channel,
      messages
    } = this.props;
    const {
      messageCount
    } = this.state;

    if (channel && messageCount !== messages.length) {
      Meteor.call('users.updateLastRead', channel._id, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        }
      });
      this.setState({
        messageCount: messages.length
      });
    }
  }

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
                  <MessageList messages={messages} user={user}/>
                </div>
              </div>
            </div>
          </div>
          <MessageInput hasActionPicker={false} channel={channel} user={user} />
        </div>
    );
  }
}

ConversationPage.propTypes = {
  channel: PropTypes.object,
};
