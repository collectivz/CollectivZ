import { Meteor } from 'meteor/meteor';

import { Channels } from '../../api/channels/collection';

Meteor.startup(() => {
  const users = Meteor.users.find().fetch();

  users.forEach(user => {
    if (user.profile.avatar) {
      user.imageUrl = user.profile.avatar;
      delete user.profile.avatar;
      Meteor.users.update(user._id, user);
    }
  });

  const channels = Channels.find().fetch();

  channels.forEach(channel => {
    if (!channel.isTyping) {
      channel.isTyping = [];
      Channels.update(channel._id, channel);
    }
  });
});
