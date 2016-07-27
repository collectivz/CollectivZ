import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans } from '../../api/collections.js';

import ChanList from '../pages/ChanList.jsx';

export default createContainer(() => {
  Meteor.subscribe('chanList');
  let user = Meteor.user();
  if (user) {
    return {
      channels: Chans.find({_id: {$in: user.subscribedChannels}}).fetch(),
    }
  }
  return {
    channels: []
  };
}, ChanList);
