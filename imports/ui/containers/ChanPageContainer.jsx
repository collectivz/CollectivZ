import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { Messages } from '../../api/messages/collection.js';
import { Beers } from '../../api/beers/collection.js';
import { Polls, Propositions } from '../../api/polls/collection.js';

import ChanPage from '../pages/ChanPage.jsx';


export default createContainer(({ params }) => {
  const sub = Meteor.subscribe('chanPage', params.chatId);
  const id = params.chatId;
  const polls = Polls.find({channelId: id}).fetch();
  const pollsIds = [];

  polls.forEach((poll) => {
    pollsIds.push(poll._id);
  });
  return {
    loading: !sub.ready(),
    msgs: Messages.find({channelId: id}, {$sort: {createadAt: 1}}).fetch(),
    beers: Beers.find({channelId: id}).fetch(),
    channels: Channels.find({channelId: id}).fetch(),
    polls: Polls.find({channelId: id}).fetch(),
    propositions: Propositions.find({pollId: { $in: pollsIds }}).fetch(),
    channel: Channels.findOne(id) || {},
  };
}, ChanPage);
