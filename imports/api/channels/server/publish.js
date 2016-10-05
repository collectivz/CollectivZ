import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Channels } from '../collection.js';
import { Messages } from '../../messages/collection.js';
import { Archives } from '../../archives/archives.js';
import { Beers } from '../../beers/collection.js';
import { Coins } from '../../coins/collection.js';
import { Feedbacks } from '../../feedbacks/collection.js';
import { Polls, Propositions } from '../../polls/collection.js';

Meteor.publish('groupList', function() {
  if (this.userId) {
    return Channels.find({ type: 'group' });
  } else {
    this.ready();
  }
});

Meteor.publish('chanPage', function(id) {
  check(id, String);
  if (this.userId) {
    const channel = Channels.findOne(id);
    if (channel) {
      return [
        Channels.find({$or :[
          {_id: { $in: [id, channel.rootId] }},
          {parentId: id},
        ]}),
        Messages.find({channelId: id}),
        Feedbacks.find({channelId: id}),
        Beers.find({channelId: id}),
        Polls.find({channelId: id}),
        Coins.find({channelId: id}),
        Meteor.users.find({subscribedChannels: {$in: [id]}}),
        Archives.find({ channelId: id })
      ];
    } else {
      this.ready();
    }
  } else {
    this.ready();
  }
});

Meteor.publish('conversationPage', function(id) {
  check(id, String);
  const channel = Channels.findOne(id);
  return [
    Messages.find({channelId: id}),
    Channels.find(id),
    Meteor.users.find({subscribedConversations: {$in: [id]}})
  ];
});

Meteor.publish('chanList', function(channelsIds, conversationsIds) {
  check(channelsIds, [String]);
  let allChan;
  if (conversationsIds) {
    allChan = channelsIds.concat(conversationsIds);
  } else {
    allChan = channelsIds;
  }
  if (this.userId) {
    return Channels.find({_id: {$in: allChan}}, {sort: { lastActivity: 1 }});
  }
  return [];
});
