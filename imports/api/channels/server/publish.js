import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Channels } from '../collection.js';
import { Messages } from '../../messages/collection.js';
import { Archives } from '../../archives/archives.js';
import { Beers } from '../../beers/collection.js';
import { Coins } from '../../coins/collection.js';
import { Feedbacks } from '../../feedbacks/collection.js';
import { Polls, Propositions } from '../../polls/collection.js';

Meteor.publish('groupList', function () {
  if (this.userId) {
    const user = Meteor.users.findOne(this.userId);
    return Channels.find({ type: 'group', author: { $nin: user.blockedUsers }, objectionable: false  });
  }
  this.ready();
});

Meteor.publish('chanPage', function (id) {
  check(id, String);
  if (this.userId) {
    const channel = Channels.findOne(id);
    if (channel) {
      const user = Meteor.users.findOne(this.userId);
      return [
        Channels.find({ $or: [
          { _id: { $in: [id, channel.rootId] }, author: { $nin: user.blockedUsers }, objectionable: false },
          { parentId: id, author: { $nin: user.blockedUsers }, objectionable: false   },
        ] }),
        Messages.find({ channelId: id, author: { $nin: user.blockedUsers } , objectionable: false }),
        Feedbacks.find({ channelId: id, author: { $nin: user.blockedUsers } , objectionable: false }),
        Beers.find({ channelId: id, author: { $nin: user.blockedUsers } , objectionable: false }),
        Polls.find({ channelId: id, author: { $nin: user.blockedUsers } , objectionable: false }),
        Coins.find({ channelId: id, author: { $nin: user.blockedUsers } , objectionable: false }),
        Meteor.users.find({ subscribedChannels: { $in: [id] }, _id: { $nin: user.blockedUsers } }),
        // Archives.find({ channelId: id }),
      ];
    }
    this.ready();
  } else {
    this.ready();
  }
});

Meteor.publish('conversationPage', function(id) {
  check(id, String);
  const channel = Channels.findOne(id);
  const user = Meteor.users.findOne(this.userId);
  return [
    Messages.find({ channelId: id, author: { $nin: user.blockedUsers }, objectionable: false  }),
    Channels.find(id),
    Meteor.users.find({ subscribedConversations: { $in: [id] }, _id: { $nin: user.blockedUsers } }),
  ];
});

Meteor.publish('chanList', function (channelsIds, conversationsIds) {
  check(channelsIds, [String]);
  let allChan;
  if (conversationsIds) {
    allChan = channelsIds.concat(conversationsIds);
  } else {
    allChan = channelsIds;
  }
  if (this.userId) {
    const user = Meteor.users.findOne(this.userId);
    return Channels.find({ _id: { $in: allChan }, author: { $nin: user.blockedUsers } }, { sort: { lastActivity: 1 } });
  }
  return [];
});
