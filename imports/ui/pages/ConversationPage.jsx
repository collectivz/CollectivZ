import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import ConversationPageHeader from '../components/ConversationPageHeader.jsx';
import Loader from '../components/Loader.jsx';
import ChatContainer from '../containers/ChatContainer.jsx';

import './ConversationPage.css';

export default class ConversationPage extends React.Component {
  render() {
    const {
      loading,
      channel,
    } = this.props;

    return (
      <div>
      {loading ?
        <Loader />
        : <div>
            <ConversationPageHeader channel={channel}/>
            <ChatContainer channel={channel}/>
          </div>
      }
      </div>
    );
  }
}

ConversationPage.propTypes = {
  channel: PropTypes.object,
};
