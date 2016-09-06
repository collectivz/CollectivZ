import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';
import { Channels } from '../../api/channels/collection.js';
import { History } from '../../api/history/collection.js';

import MyProfile from '../pages/MyProfile.jsx';

export default createContainer(({ user }) => {
  const userSub = Meteor.subscribe('userProfile', user._id);
  const guilds = Guilds.find({_id: { $in: user.subscribedGuilds }}).fetch();
  const channels = Channels.find({_id: { $in: user.subscribedChannels }}).fetch();
  const history = History.findOne({userId: user._id});

  return {
    guilds,
    channels,
    history
  };
}, MyProfile);
