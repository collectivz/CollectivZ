import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { Messages } from '../../api/messages/collection.js';

import ChanPage from '../pages/ChanPage.jsx';


export default createContainer(({ params }) => {
  Meteor.subscribe('chanPage', params.chatId);
  const id = params.chatId;
  return {
    msgs: Messages.find({channelId: id}).fetch(),
    channel: Channels.findOne(id) || {},
  };
}, ChanPage);
