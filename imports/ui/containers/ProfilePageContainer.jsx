import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { History } from '../../api/history/collection.js';

import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params, user }) => {
  const userSub = Meteor.subscribe('userProfile', params.userId);
  const _user = Meteor.users.findOne(params.userId);
  if (_user) {
    var groups = Channels.find({
      _id: { $in: _user.subscribedChannels },
      type: 'group'
    }).fetch();
    var channels = Channels.find({
      _id: { $in: _user.subscribedChannels },
      type: 'channel'
    }).fetch();
    var history = History.findOne({userId: _user._id});
  }

  return {
    user: _user,
    currentUser: user,
    groups,
    channels,
    history
  };
}, ProfilePage);
