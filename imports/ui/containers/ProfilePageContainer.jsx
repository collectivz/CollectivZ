import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';
import { Channels } from '../../api/channels/collection.js';

import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params, user }) => {
  const userSub = Meteor.subscribe('userProfile', params.userId);
  const _user = Meteor.users.findOne(params.userId);
  if (_user) {
    var guilds = Guilds.find({_id: { $in: _user.subscribedGuilds }}).fetch();
    var channels = Channels.find({_id: { $in: _user.subscribedChannels }}).fetch();
  }
  return {
    user: _user,
    currentUser: user,
    guilds,
    channels
  };
}, ProfilePage);
