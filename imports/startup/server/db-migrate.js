import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Channels } from '../../api/channels/collection';
import { Messages } from '../../api/messages/collection';
import { Repertory } from '../../api/repertory/collection';
import { Polls, Propositions } from '../../api/polls/collection';
import { Collections } from '../../api/collection-handler';

Meteor.startup(() => {
  const channels = Channels.find().fetch();

  channels.forEach(channel => {
    if (channel.imageUrl === "/img/icons/cog.svg") {
      channel.imageUrl = "/img/red_action.png";
    }
    const keys = _.keys(channel.connections);
    keys.forEach(key => {
      const type = key.slice(0, -5);
      if (Collections[type]) {
        channel.connections[key] = Collections[type].find({$or: [{parentId: channel._id}, {channelId: channel._id}]}).count();
      }
    });

    Channels.update(channel._id, channel);
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

  const polls = Polls.find().fetch();

  polls.forEach(poll => {
    if (!poll.members) {
      const propositions = Propositions.find({ pollId: poll._id }).fetch();
      let users = [];

      propositions.forEach(prop => {
        users.push(propositions.voteReceivedFrom);
      });
      Polls.update(poll._id, {
        $addToSet: { members: users }
      });
    }
  });

});
