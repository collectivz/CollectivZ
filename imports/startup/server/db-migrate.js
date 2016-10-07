import { Meteor } from 'meteor/meteor';

import { Channels } from '../../api/channels/collection';
import { Repertory } from '../../api/repertory/collection';

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

  const repertories = Repertory.find().fetch();

  repertories.forEach(repertory => {
    if (repertory.invitationReceved) {
      repertory.invitationReceived = repertory.invitationReceved;
      delete repertory.invitationReceved;
    }
    if (repertory.invitationSend) {
      repertory.invitationSent = repertory.invitationSend;
      delete repertory.invitationSend;
    }
    if (repertory.teams) {
      repertory.circles = repertory.teams;
      delete repertory.teams;
    }
    Repertory.update(repertory._id, repertory);
  });
});
