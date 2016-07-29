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
  let chan = Channels.findOne(id);
  if (!chan) {
    chan = {
      title: 'no found',
      _id: 'not found',
    };
  }

  return {
    msgs: Messages.find({channelId: id}).fetch(),
    chan: Channels.findOne(id),
    chanName: chan.name,
    chanId: chan._id
  };
}, ChanPage);
