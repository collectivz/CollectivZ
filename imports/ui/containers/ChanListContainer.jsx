import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { Messages } from '../../api/messages/collection.js';

import ChanList from '../pages/ChanList.jsx';

export default createContainer(() => {
  Meteor.subscribe('chanList');
  if (Meteor.user()) {
    return {
      channels: Channels.find({_id: {$in: Meteor.user().subscribedChannels}}, {$sort: {createadAt: 1}}).fetch(),
    }
  }
}, ChanList);
