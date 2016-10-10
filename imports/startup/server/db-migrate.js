import { Meteor } from 'meteor/meteor';

import { Channels } from '../../api/channels/collection';
import { Messages } from '../../api/messages/collection';
import { Repertory } from '../../api/repertory/collection';
import { Propositions } from '../../api/polls/collection';

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

  const propositions = Propositions.find().fetch();
  propositions.forEach(proposition => {
    if (proposition.voteRecevedFrom) {
      proposition.voteReceivedFrom = proposition.voteRecevedFrom;
      delete proposition.voteRecevedFrom;
      Propositions.update(proposition._id, proposition);
    }
  });

  const messages = Messages.find().fetch();

  messages.forEach(message => {
    if (!message.authorImage) {
      const user = Meteor.users.findOne(message.author);
      message.authorImage = user.imageUrl;
      Messages.update(message._id, message);
    }
  });
});
